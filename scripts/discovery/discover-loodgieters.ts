#!/usr/bin/env npx tsx
/**
 * Dutch Loodgieter Discovery Script with Bright Data SERP API
 *
 * Searches for plumbers (loodgieters) across all Dutch provinces via Google Maps.
 * Covers all 12 provinces with comprehensive search queries.
 *
 * REAL-TIME DATABASE WRITES:
 * Each discovered loodgieter is immediately written to Neon PostgreSQL
 * to prevent data loss on PC crash. JSON files serve as backup.
 *
 * Usage:
 *   npx tsx scripts/discovery/discover-loodgieters.ts                       # All pending locations
 *   npx tsx scripts/discovery/discover-loodgieters.ts --provincie Limburg
 *   npx tsx scripts/discovery/discover-loodgieters.ts --batch 50
 *   npx tsx scripts/discovery/discover-loodgieters.ts --dry-run
 *   npx tsx scripts/discovery/discover-loodgieters.ts --resume
 *   npx tsx scripts/discovery/discover-loodgieters.ts --test                # Test with 3 cities
 *   npx tsx scripts/discovery/discover-loodgieters.ts --no-db               # Skip database writes
 */

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import * as fs from 'fs';
import * as path from 'path';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { loodgieters } from '../../drizzle/schema';
import { sql } from 'drizzle-orm';

// ============================================================================
// Configuration
// ============================================================================

const API_KEY = process.env.BRIGHTDATA_SERP_API_KEY || process.env.BRIGHTDATA_API_KEY;
const SERP_ZONE = process.env.BRIGHTDATA_DISCOVERY_ZONE || process.env.BRIGHTDATA_SERP_ZONE || 'mcp_unlocker';

const SERP_API_URL = 'https://api.brightdata.com/request';

const DATA_DIR = path.join(process.cwd(), 'data', 'discovery');
const LOCATIONS_FILE = path.join(DATA_DIR, 'locations.json');
const PROGRESS_FILE = path.join(DATA_DIR, 'progress.json');
const RESULTS_FILE = path.join(DATA_DIR, 'discovered-loodgieters.json');
const RATE_LIMIT_FILE = path.join(DATA_DIR, 'rate-limits.json');

// Rate limiting
const RATE_LIMIT = {
  requestsPerMinute: 999999,
  requestsPerHour: 999999,
  requestsPerDay: 999999,
  retryDelayMs: 5000,
  maxRetries: 3,
  delayBetweenQueries: 500,
  delayBetweenLocations: 2000,
};

// Dutch-specific search queries for plumbers
const SEARCH_QUERIES = [
  'loodgieter',
  'loodgietersbedrijf',
  'sanitair installateur',
  'cv installateur',
  'spoed loodgieter',
  'lekkage reparatie',
  'riool ontstopping',
  'rioolservice',
  'cv monteur',
  'cv ketel installatie',
  'badkamer installateur',
  'waterleiding reparatie',
  'gasinstallateur',
  'warmtepomp installateur',
  'vloerverwarming installateur',
];

// Dutch provinces with codes
const PROVINCIES: Record<string, string> = {
  'Drenthe': 'DR',
  'Flevoland': 'FL',
  'Friesland': 'FR',
  'Gelderland': 'GE',
  'Groningen': 'GR',
  'Limburg': 'LI',
  'Noord-Brabant': 'NB',
  'Noord-Holland': 'NH',
  'Overijssel': 'OV',
  'Utrecht': 'UT',
  'Zeeland': 'ZE',
  'Zuid-Holland': 'ZH',
};

// ============================================================================
// Database Connection
// ============================================================================

const DATABASE_URL = process.env.DATABASE_URL;
let db: ReturnType<typeof drizzle> | null = null;
let dbEnabled = true;

function initDatabase(): boolean {
  if (!DATABASE_URL) {
    console.log('⚠️  DATABASE_URL not set - will only save to JSON files');
    dbEnabled = false;
    return false;
  }

  try {
    const client = neon(DATABASE_URL);
    db = drizzle(client);
    console.log('✅ Database connection initialized');
    return true;
  } catch (error: any) {
    console.error('❌ Failed to initialize database:', error.message);
    dbEnabled = false;
    return false;
  }
}

function createSlug(name: string, city: string, provincieCode: string): string {
  const base = `${name}-${city}-${provincieCode}`;
  return base
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function createTypeSlug(type: string): string {
  return type.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function determineType(businessType: string, categories: string[]): string {
  const allTerms = [businessType, ...(categories || [])].map(t => t?.toLowerCase() || '');

  if (allTerms.some(t => t.includes('spoed') || t.includes('24 uur') || t.includes('nood'))) return 'spoed-loodgieter';
  if (allTerms.some(t => t.includes('cv') || t.includes('verwarming') || t.includes('ketel'))) return 'cv-installateur';
  if (allTerms.some(t => t.includes('sanitair') || t.includes('badkamer'))) return 'sanitair-specialist';
  if (allTerms.some(t => t.includes('riool') || t.includes('ontstop'))) return 'rioolservice';
  if (allTerms.some(t => t.includes('gas'))) return 'gasinstallateur';
  if (allTerms.some(t => t.includes('warmtepomp'))) return 'warmtepomp-specialist';
  if (allTerms.some(t => t.includes('vloerverwarming'))) return 'vloerverwarming-specialist';
  if (allTerms.some(t => t.includes('lekkage'))) return 'lekkage-specialist';

  return 'loodgieter';
}

function extractServiceTypes(businessType: string, categories: string[]): string[] {
  const allTerms = [businessType, ...(categories || [])].map(t => t?.toLowerCase() || '');
  const services: string[] = [];

  if (allTerms.some(t => t.includes('lekkage') || t.includes('lek'))) services.push('lekkage-reparatie');
  if (allTerms.some(t => t.includes('ontstop') || t.includes('riool'))) services.push('ontstopping');
  if (allTerms.some(t => t.includes('cv') || t.includes('ketel'))) {
    services.push('cv-ketel-installatie');
    services.push('cv-ketel-onderhoud');
  }
  if (allTerms.some(t => t.includes('badkamer') || t.includes('sanitair'))) services.push('badkamer-installatie');
  if (allTerms.some(t => t.includes('toilet') || t.includes('wc'))) services.push('toilet-installatie');
  if (allTerms.some(t => t.includes('kraan'))) services.push('kraan-reparatie');
  if (allTerms.some(t => t.includes('gas'))) services.push('gas-installatie');
  if (allTerms.some(t => t.includes('waterleiding'))) services.push('waterleiding-aanleg');
  if (allTerms.some(t => t.includes('warmtepomp'))) services.push('warmtepomp');
  if (allTerms.some(t => t.includes('vloerverwarming'))) services.push('vloerverwarming');
  if (allTerms.some(t => t.includes('boiler'))) services.push('boiler-installatie');
  if (allTerms.some(t => t.includes('spoed') || t.includes('24 uur') || t.includes('nood'))) services.push('spoed-loodgieter');

  // Default service if none found
  if (services.length === 0) {
    services.push('lekkage-reparatie');
    services.push('ontstopping');
  }

  return services;
}

/**
 * Insert a single loodgieter to database in real-time
 * Returns true if successful, false if failed
 */
async function insertLoodgieterToDatabase(loodgieter: DiscoveredLoodgieter): Promise<boolean> {
  if (!db || !dbEnabled) return false;

  const provincieCode = loodgieter.provincie_code || PROVINCIES[loodgieter.provincie || ''] || 'XX';
  const type = determineType(loodgieter.business_type || '', loodgieter.categories || []);
  const serviceTypes = extractServiceTypes(loodgieter.business_type || '', loodgieter.categories || []);

  // Check for spoed service
  const isSpoedService = serviceTypes.includes('spoed-loodgieter') ||
    loodgieter.name?.toLowerCase().includes('24') ||
    loodgieter.name?.toLowerCase().includes('spoed');

  const record = {
    slug: createSlug(loodgieter.name, loodgieter.city || '', provincieCode),
    name: loodgieter.name,
    type: type,
    typeSlug: createTypeSlug(type),
    address: loodgieter.address || null,
    city: loodgieter.city || '',
    gemeente: loodgieter.gemeente || null,
    provincie: loodgieter.provincie || '',
    provincieCode: provincieCode,
    postcode: loodgieter.postcode || null,
    country: loodgieter.country || 'Nederland',
    latitude: loodgieter.latitude?.toString() || null,
    longitude: loodgieter.longitude?.toString() || null,
    serviceTypes: serviceTypes,
    specialisaties: null,
    werkgebied: null,
    werkgebiedRadius: null,
    spoedService: isSpoedService,
    spoedToeslag: null,
    prijsIndicatie: null,
    voorrijkosten: null,
    gratisOfferte: true,
    phone: loodgieter.phone || null,
    email: null,
    website: loodgieter.website || null,
    whatsapp: null,
    kvkNummer: null,
    yearEstablished: null,
    numberOfEmployees: null,
    certificeringen: null,
    keurmerken: null,
    rating: loodgieter.rating?.toString() || null,
    reviewCount: loodgieter.review_count || 0,
    photoUrl: loodgieter.photo_url || null,
    photos: loodgieter.categories ? loodgieter.categories : null,
    openingHours: typeof loodgieter.opening_hours === 'string'
      ? loodgieter.opening_hours
      : JSON.stringify(loodgieter.opening_hours) || null,
    description: null,
    seoTitle: null,
    seoDescription: null,
    enrichedContent: null,
    generatedSummary: null,
    generatedAbout: null,
    generatedServices: null,
    generatedUsps: null,
    generatedTips: null,
    generatedLocalContext: null,
    enrichedAt: null,
    source: 'google_maps',
    status: 'active',
    premium: false,
    discoveredAt: loodgieter.discovered_at || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    await db.insert(loodgieters)
      .values(record)
      .onConflictDoUpdate({
        target: loodgieters.slug,
        set: {
          name: sql`COALESCE(EXCLUDED.name, ${loodgieters.name})`,
          address: sql`COALESCE(EXCLUDED.address, ${loodgieters.address})`,
          phone: sql`COALESCE(EXCLUDED.phone, ${loodgieters.phone})`,
          website: sql`COALESCE(EXCLUDED.website, ${loodgieters.website})`,
          rating: sql`COALESCE(EXCLUDED.rating, ${loodgieters.rating})`,
          reviewCount: sql`GREATEST(COALESCE(EXCLUDED.review_count, 0), COALESCE(${loodgieters.reviewCount}, 0))`,
          photoUrl: sql`COALESCE(EXCLUDED.photo_url, ${loodgieters.photoUrl})`,
          serviceTypes: sql`COALESCE(EXCLUDED.service_types, ${loodgieters.serviceTypes})`,
          spoedService: sql`COALESCE(EXCLUDED.spoed_service, ${loodgieters.spoedService})`,
          updatedAt: sql`EXCLUDED.updated_at`,
        },
      });
    return true;
  } catch (error: any) {
    // Log but don't fail - data is still in JSON backup
    console.error(`   ⚠️ DB insert failed for ${loodgieter.name}: ${error.message?.slice(0, 50)}`);
    return false;
  }
}

// ============================================================================
// Types
// ============================================================================

interface DiscoveryLocation {
  id: string;
  city: string;
  gemeente?: string;
  provincie: string;
  provincie_code: string;
  country: 'NL';
  population?: number;
  priority: number;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  results_count: number;
  last_searched_at: string | null;
  search_query: string | null;
  created_at: string;
  error_message?: string;
  retry_count?: number;
}

interface DiscoveredLoodgieter {
  // Identifiers
  google_cid: string;
  google_place_id?: string;

  // Basic info
  name: string;
  original_title?: string;
  address?: string;
  phone?: string;
  website?: string;

  // Location
  latitude?: number;
  longitude?: number;
  city?: string;
  gemeente?: string;
  provincie?: string;
  provincie_code?: string;
  country: 'NL';
  postcode?: string;

  // Google Maps data
  rating?: number;
  review_count?: number;
  business_type?: string;
  categories?: string[];

  // Opening hours
  opening_hours?: any;

  // Photo URL
  photo_url?: string;

  // Reviews
  reviews?: Array<{
    reviewer_name: string;
    rating: number;
    review_text: string;
    review_date?: string;
  }>;

  // Discovery metadata
  search_query: string;
  discovered_location_id: string;
  discovered_at: string;
}

interface RateLimitState {
  minute_count: number;
  minute_reset_at: string;
  hour_count: number;
  hour_reset_at: string;
  day_count: number;
  day_reset_at: string;
  total_requests: number;
  total_errors: number;
  last_request_at: string | null;
}

// ============================================================================
// Dutch Address Parsing
// ============================================================================

/**
 * Extract Dutch postcode from address
 * Dutch postcodes: 4 digits + 2 letters (1234 AB)
 */
function extractPostcode(address: string): string | null {
  const pattern = /\b(\d{4}\s?[A-Z]{2})\b/i;
  const match = address.match(pattern);
  if (match) {
    return match[1].toUpperCase().replace(/\s/g, ' ');
  }
  return null;
}

/**
 * Extract city from Dutch address
 */
function extractCityFromAddress(address: string): string | null {
  // Dutch format: "Straatnaam 123, 1234 AB Plaatsnaam"
  const pattern = /\d{4}\s?[A-Z]{2}\s+([A-Za-z\s'-]+)/i;
  const match = address.match(pattern);
  if (match) {
    return match[1].trim();
  }
  return null;
}

/**
 * Get provincie code from provincie name
 */
function getProvincieCode(provincie: string): string {
  return PROVINCIES[provincie] || 'XX';
}

// ============================================================================
// Rate Limiting
// ============================================================================

function loadRateLimits(): RateLimitState {
  const now = new Date();
  const defaults: RateLimitState = {
    minute_count: 0,
    minute_reset_at: new Date(now.getTime() + 60000).toISOString(),
    hour_count: 0,
    hour_reset_at: new Date(now.getTime() + 3600000).toISOString(),
    day_count: 0,
    day_reset_at: new Date(now.setHours(24, 0, 0, 0)).toISOString(),
    total_requests: 0,
    total_errors: 0,
    last_request_at: null,
  };

  if (!fs.existsSync(RATE_LIMIT_FILE)) {
    return defaults;
  }

  try {
    const state = JSON.parse(fs.readFileSync(RATE_LIMIT_FILE, 'utf-8'));

    if (new Date(state.minute_reset_at) < now) {
      state.minute_count = 0;
      state.minute_reset_at = new Date(now.getTime() + 60000).toISOString();
    }
    if (new Date(state.hour_reset_at) < now) {
      state.hour_count = 0;
      state.hour_reset_at = new Date(now.getTime() + 3600000).toISOString();
    }
    if (new Date(state.day_reset_at) < now) {
      state.day_count = 0;
      state.day_reset_at = new Date(now.setHours(24, 0, 0, 0)).toISOString();
    }

    return state;
  } catch {
    return defaults;
  }
}

function saveRateLimits(state: RateLimitState): void {
  fs.writeFileSync(RATE_LIMIT_FILE, JSON.stringify(state, null, 2));
}

// ============================================================================
// Bright Data SERP API
// ============================================================================

/**
 * Search Google Maps via SERP API for Dutch locations
 */
async function searchGoogleMapsSERP(
  query: string,
  location: string,
  provincie: string,
  retryCount = 0
): Promise<any> {
  // Build search query with Dutch context
  const searchQuery = `${query} ${location} ${provincie} Nederland`;
  const googleUrl = `https://www.google.nl/maps/search/${encodeURIComponent(searchQuery)}?hl=nl&brd_json=1`;

  try {
    const response = await fetch(SERP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        zone: SERP_ZONE,
        url: googleUrl,
        format: 'json',
        country: 'nl',  // Netherlands country code
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      if (response.status === 429) {
        throw new Error('RATE_LIMITED');
      }

      throw new Error(`API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return { data, searchQuery };

  } catch (error: any) {
    if (retryCount < RATE_LIMIT.maxRetries) {
      const delay = RATE_LIMIT.retryDelayMs * Math.pow(2, retryCount);
      console.log(`   ⟳ Retry ${retryCount + 1}/${RATE_LIMIT.maxRetries} in ${delay / 1000}s...`);
      await sleep(delay);
      return searchGoogleMapsSERP(query, location, provincie, retryCount + 1);
    }

    throw error;
  }
}

// ============================================================================
// Data Processing
// ============================================================================

/**
 * Process SERP JSON response and extract loodgieter data for NL
 */
async function processSerpResponse(
  response: { data: any; searchQuery: string },
  location: DiscoveryLocation,
  query: string
): Promise<DiscoveredLoodgieter[]> {
  const loodgietersFound: DiscoveredLoodgieter[] = [];
  let data = response.data;
  const seenCids = new Set<string>();

  // Parse body if it's a string
  if (data.body && typeof data.body === 'string') {
    try {
      data = JSON.parse(data.body);
    } catch {
      console.error('   ⚠️ Failed to parse body JSON');
      return loodgietersFound;
    }
  }

  // Handle different response structures
  const places = data.organic ||
                 data.local_results ||
                 data.places ||
                 data.organic_results ||
                 data.results ||
                 (Array.isArray(data) ? data : []);

  for (const place of places) {
    // Extract CID
    const cid = place.fid ||
                place.map_id ||
                place.cid ||
                place.data_cid ||
                place.place_id ||
                place.data_id ||
                extractCidFromUrl(place.link || place.url || place.map_link);

    if (!cid || seenCids.has(String(cid))) continue;
    seenCids.add(String(cid));

    // Check if this looks like a plumber/loodgieter
    const name = place.title || place.name || '';
    const nameLower = name.toLowerCase();

    const categories = Array.isArray(place.category) ? place.category : [];
    const categoryIds = categories.map((c: any) => {
      const id = c?.id ?? c;
      return typeof id === 'string' ? id.toLowerCase() : '';
    }).filter(Boolean);
    const categoryTitles = categories.map((c: any) => {
      const title = c?.title ?? '';
      return typeof title === 'string' ? title.toLowerCase() : '';
    }).filter(Boolean);

    // Loodgieter detection for Dutch plumbers
    const isLoodgieter =
      nameLower.includes('loodgieter') ||
      nameLower.includes('sanitair') ||
      nameLower.includes('cv') ||
      nameLower.includes('installatie') ||
      nameLower.includes('installateur') ||
      nameLower.includes('riool') ||
      nameLower.includes('lekkage') ||
      nameLower.includes('waterleiding') ||
      nameLower.includes('plumber') ||
      categoryIds.includes('loodgieter') ||
      categoryIds.includes('plumber') ||
      categoryIds.includes('installateur') ||
      categoryTitles.includes('loodgieter') ||
      categoryTitles.includes('loodgietersbedrijf') ||
      categoryTitles.includes('cv-installateur') ||
      categoryTitles.includes('installatiebedrijf');

    // For plumber searches, be more lenient
    const isRelevantQuery = query.toLowerCase().includes('loodgieter') ||
                           query.toLowerCase().includes('sanitair') ||
                           query.toLowerCase().includes('cv') ||
                           query.toLowerCase().includes('installateur') ||
                           query.toLowerCase().includes('riool');
    if (!isLoodgieter && !isRelevantQuery) continue;

    // Get primary category
    const primaryCategory = categories[0]?.title || categories[0]?.id || 'Loodgieter';

    // Extract address info
    const address = place.address || place.formatted_address || '';
    const postcode = extractPostcode(address);
    const cityFromAddress = extractCityFromAddress(address);

    // Use search location as fallback
    const city = cityFromAddress || location.city;

    // Extract photo URL
    const photoUrl = place.original_image ||
                     place.image ||
                     place.photo ||
                     place.thumbnail ||
                     place.main_image;

    // Extract all category titles
    const allCategories = categories.map((c: any) => {
      const val = c?.title ?? c?.id ?? c;
      return typeof val === 'string' ? val : null;
    }).filter(Boolean) as string[];

    const loodgieter: DiscoveredLoodgieter = {
      google_cid: String(cid),
      google_place_id: place.map_id_encoded || (String(cid).startsWith('ChIJ') ? String(cid) : undefined),
      name: name,
      original_title: place.original_title || undefined,
      address: address,
      phone: place.phone,
      website: place.website || place.link || place.display_link,
      latitude: place.latitude || place.lat,
      longitude: place.longitude || place.lng,
      city: city,
      gemeente: location.gemeente,
      provincie: location.provincie,
      provincie_code: location.provincie_code,
      country: 'NL',
      postcode: postcode || undefined,
      rating: place.rating ? parseFloat(String(place.rating)) : undefined,
      review_count: place.reviews_cnt || place.reviews_count || place.review_count,
      business_type: primaryCategory,
      categories: allCategories.length > 0 ? allCategories : undefined,
      opening_hours: place.work_status || place.hours || place.opening_hours,
      photo_url: photoUrl || undefined,
      search_query: query,
      discovered_location_id: location.id,
      discovered_at: new Date().toISOString(),
    };

    // Parse reviews if available
    if (place.top_reviews || place.reviews_data) {
      loodgieter.reviews = parseReviews(place);
    }

    loodgietersFound.push(loodgieter);
  }

  return loodgietersFound;
}

/**
 * Extract CID from Google Maps URL
 */
function extractCidFromUrl(url?: string): string | null {
  if (!url) return null;

  const cidMatch = url.match(/[?&]cid=(\d+)/);
  if (cidMatch) return cidMatch[1];

  const dataIdMatch = url.match(/data=.*?!1s(0x[a-f0-9]+:[a-f0-9]+)/);
  if (dataIdMatch) return dataIdMatch[1];

  const placeIdMatch = url.match(/(ChIJ[a-zA-Z0-9_-]+)/);
  if (placeIdMatch) return placeIdMatch[1];

  return null;
}

/**
 * Parse reviews from place data
 */
function parseReviews(place: any): DiscoveredLoodgieter['reviews'] {
  const reviews: DiscoveredLoodgieter['reviews'] = [];
  const rawReviews = place.top_reviews || place.reviews_data || [];

  for (const review of rawReviews.slice(0, 10)) {
    reviews.push({
      reviewer_name: review.author || review.reviewer_name || 'Anoniem',
      rating: review.rating || 0,
      review_text: review.text || review.content || review.snippet || '',
      review_date: review.date || review.review_date,
    });
  }

  return reviews;
}

// ============================================================================
// File Operations
// ============================================================================

function loadLocations(): DiscoveryLocation[] {
  if (!fs.existsSync(LOCATIONS_FILE)) {
    console.error('❌ Locations file not found. Create data/discovery/locations.json first.');
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(LOCATIONS_FILE, 'utf-8'));
  return data.locations || data;
}

function saveLocations(locations: DiscoveryLocation[]): void {
  const data = { locations, search_queries: SEARCH_QUERIES };
  fs.writeFileSync(LOCATIONS_FILE, JSON.stringify(data, null, 2));
}

function loadDiscoveredLoodgieters(): DiscoveredLoodgieter[] {
  if (!fs.existsSync(RESULTS_FILE)) {
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function saveDiscoveredLoodgieters(loodgietersData: DiscoveredLoodgieter[]): void {
  fs.writeFileSync(RESULTS_FILE, JSON.stringify(loodgietersData, null, 2));
}

function updateProgress(locations: DiscoveryLocation[], loodgietersData: DiscoveredLoodgieter[]): void {
  // Group by provincie
  const provincieStats: Record<string, { total: number; completed: number; loodgieters: number }> = {};

  for (const loc of locations) {
    if (!provincieStats[loc.provincie]) {
      provincieStats[loc.provincie] = { total: 0, completed: 0, loodgieters: 0 };
    }
    provincieStats[loc.provincie].total++;
    if (loc.status === 'completed') {
      provincieStats[loc.provincie].completed++;
    }
  }

  for (const lg of loodgietersData) {
    if (lg.provincie && provincieStats[lg.provincie]) {
      provincieStats[lg.provincie].loodgieters++;
    }
  }

  const progress = {
    total_locations: locations.length,
    pending: locations.filter(l => l.status === 'pending').length,
    in_progress: locations.filter(l => l.status === 'in_progress').length,
    completed: locations.filter(l => l.status === 'completed').length,
    failed: locations.filter(l => l.status === 'failed').length,
    total_loodgieters_found: loodgietersData.length,
    unique_cids: new Set(loodgietersData.map(c => c.google_cid)).size,
    per_provincie: provincieStats,
    last_run_at: new Date().toISOString(),
  };
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

// ============================================================================
// Utilities
// ============================================================================

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    provincie: null as string | null,
    batch: 0,
    dryRun: false,
    resume: false,
    test: false,
    noDb: false,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--provincie' && args[i + 1]) {
      options.provincie = args[i + 1];
      i++;
    } else if (args[i] === '--batch' && args[i + 1]) {
      options.batch = parseInt(args[i + 1]);
      i++;
    } else if (args[i] === '--dry-run') {
      options.dryRun = true;
    } else if (args[i] === '--resume') {
      options.resume = true;
    } else if (args[i] === '--test') {
      options.test = true;
      options.batch = 3;
    } else if (args[i] === '--no-db') {
      options.noDb = true;
    }
  }

  return options;
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  const options = parseArgs();

  console.log('🔧 Loodgieter Discovery Script - Nederland\n');
  console.log('━'.repeat(50));

  // Check API key
  if (!API_KEY) {
    console.error('❌ BRIGHTDATA_API_KEY not found in .env.local');
    process.exit(1);
  }

  // Initialize database connection (unless --no-db)
  if (options.noDb) {
    console.log('⚠️  Database writes disabled (--no-db flag)');
    dbEnabled = false;
  } else {
    initDatabase();
  }

  // Check if locations file exists
  if (!fs.existsSync(LOCATIONS_FILE)) {
    console.log('⚠️ Locations file not found.');
    console.log('   Create data/discovery/locations.json with Dutch cities first.');
    process.exit(1);
  }

  // Load data
  let locations = loadLocations();
  let discoveredLoodgieters = loadDiscoveredLoodgieters();
  const rateLimits = loadRateLimits();

  // Build set of existing CIDs to avoid duplicates
  const existingCids = new Set(discoveredLoodgieters.map(c => c.google_cid));

  // Filter locations to process
  let toProcess = locations.filter(l => {
    if (options.resume && l.status === 'in_progress') return true;
    if (l.status === 'pending') return true;
    if (l.status === 'failed' && (l.retry_count || 0) < RATE_LIMIT.maxRetries) return true;
    return false;
  });

  // Filter by provincie
  if (options.provincie) {
    toProcess = toProcess.filter(l =>
      l.provincie.toLowerCase() === options.provincie!.toLowerCase() ||
      l.provincie_code.toLowerCase() === options.provincie!.toLowerCase()
    );
  }

  // Sort by priority (higher first)
  toProcess.sort((a, b) => b.priority - a.priority);

  // Apply batch limit
  if (options.batch > 0) {
    toProcess = toProcess.slice(0, options.batch);
  }

  console.log(`📊 Status:`);
  console.log(`   Totaal locaties: ${locations.length}`);
  console.log(`   Te verwerken: ${toProcess.length}`);
  console.log(`   Al gevonden: ${discoveredLoodgieters.length} loodgieters`);
  console.log(`   Unieke CIDs: ${existingCids.size}`);
  console.log('');

  // Show provincie breakdown
  const provincieBreakdown = toProcess.reduce((acc, l) => {
    acc[l.provincie_code] = (acc[l.provincie_code] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (Object.keys(provincieBreakdown).length > 0 && Object.keys(provincieBreakdown).length <= 12) {
    console.log('   Per provincie:');
    for (const [prov, count] of Object.entries(provincieBreakdown)) {
      console.log(`   - ${prov}: ${count} plaatsen`);
    }
    console.log('');
  }

  if (toProcess.length === 0) {
    console.log('✅ Alle locaties zijn verwerkt!');
    return;
  }

  if (options.dryRun) {
    console.log('🧪 DRY RUN - Geen API calls worden gemaakt\n');
    console.log('Te verwerken locaties:');
    toProcess.slice(0, 10).forEach((loc, i) => {
      console.log(`   ${i + 1}. ${loc.city}, ${loc.provincie_code}`);
    });
    if (toProcess.length > 10) {
      console.log(`   ... en ${toProcess.length - 10} meer`);
    }
    return;
  }

  // Process locations
  console.log(`🚀 Starting discovery voor ${toProcess.length} locaties...\n`);
  if (dbEnabled) {
    console.log('💾 Real-time database writes ENABLED - data wordt direct opgeslagen\n');
  } else {
    console.log('📁 Database disabled - alleen opslaan naar JSON bestanden\n');
  }

  let processed = 0;
  let newLoodgieters = 0;
  let dbInserts = 0;
  let dbFailures = 0;

  for (const location of toProcess) {
    console.log(`\n🔧 ${location.city}, ${location.provincie_code}`);

    // Update status
    location.status = 'in_progress';
    saveLocations(locations);

    try {
      let locationResults: DiscoveredLoodgieter[] = [];

      // Search with each query
      for (const query of SEARCH_QUERIES) {
        console.log(`   🔎 Zoeken: "${query} ${location.city}"...`);

        const response = await searchGoogleMapsSERP(query, location.city, location.provincie);
        const foundLoodgieters = await processSerpResponse(response, location, query);

        // Filter duplicates and insert each to database in real-time
        for (const loodgieter of foundLoodgieters) {
          if (!existingCids.has(loodgieter.google_cid)) {
            existingCids.add(loodgieter.google_cid);
            locationResults.push(loodgieter);
            discoveredLoodgieters.push(loodgieter);
            newLoodgieters++;

            // Insert to database immediately (crash-safe)
            if (dbEnabled) {
              const success = await insertLoodgieterToDatabase(loodgieter);
              if (success) {
                dbInserts++;
              } else {
                dbFailures++;
              }
            }
          }
        }

        console.log(`   ✓ ${foundLoodgieters.length} CIDs gevonden (${locationResults.length} nieuw)`);

        // Small delay between queries
        await sleep(RATE_LIMIT.delayBetweenQueries);
      }

      // Update location
      location.status = 'completed';
      location.results_count = locationResults.length;
      location.last_searched_at = new Date().toISOString();
      location.search_query = SEARCH_QUERIES.join(', ');

      // Save progress to JSON files (backup)
      saveLocations(locations);
      saveDiscoveredLoodgieters(discoveredLoodgieters);
      updateProgress(locations, discoveredLoodgieters);
      saveRateLimits(rateLimits);

      processed++;
      const dbStatus = dbEnabled ? ` | DB: ${dbInserts}/${newLoodgieters}` : '';
      console.log(`   💾 Opgeslagen (${processed}/${toProcess.length}) - Totaal: ${newLoodgieters} nieuwe loodgieters${dbStatus}`);

    } catch (error: any) {
      console.error(`   ❌ Error: ${error.message}`);

      location.status = 'failed';
      location.error_message = error.message;
      location.retry_count = (location.retry_count || 0) + 1;

      saveLocations(locations);
      rateLimits.total_errors++;
      saveRateLimits(rateLimits);
    }

    // Delay between locations
    await sleep(RATE_LIMIT.delayBetweenLocations);
  }

  // Final summary
  console.log('\n' + '━'.repeat(50));
  console.log('📊 Discovery Voltooid!');
  console.log(`   Locaties verwerkt: ${processed}`);
  console.log(`   Nieuwe loodgieters gevonden: ${newLoodgieters}`);
  console.log(`   Totaal loodgieters: ${discoveredLoodgieters.length}`);
  console.log(`   Unieke CIDs: ${new Set(discoveredLoodgieters.map(c => c.google_cid)).size}`);
  if (dbEnabled) {
    console.log('');
    console.log('   💾 Database Status:');
    console.log(`      Succesvolle inserts: ${dbInserts}`);
    if (dbFailures > 0) {
      console.log(`      Mislukte inserts: ${dbFailures} (opgeslagen in JSON backup)`);
    }
    console.log(`      Success rate: ${((dbInserts / (dbInserts + dbFailures || 1)) * 100).toFixed(1)}%`);
  }
}

main().catch(console.error);
