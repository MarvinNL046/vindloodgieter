import { promises as fs } from 'fs';
import path from 'path';
import { db, loodgieters } from './db';
import { eq, ilike, or, desc, asc, sql, and, count } from 'drizzle-orm';

// Nederlandse Loodgieter Interface
export interface Loodgieter {
  // Core identifiers
  id: string;
  name: string;
  slug: string;

  // Location - Nederlandse geografie
  address?: string;
  city: string;                    // Plaats
  gemeente?: string;               // Gemeente
  provincie: string;               // Provincie
  provincie_code: string;          // Afkorting (NH, ZH, etc.)
  postcode?: string;               // Nederlandse postcode (1234 AB)
  country: string;
  gps_coordinates?: string;
  latitude?: number;
  longitude?: number;

  // Classification
  type: string;
  type_slug: string;
  service_types: string[];         // Diensten (lekkage, cv, etc.)
  specialisaties: string[];        // Specialisaties

  // Werkgebied
  werkgebied: string[];            // Lijst van plaatsen/regio's
  werkgebied_radius?: number;      // Radius in km

  // Spoed service
  spoed_service: boolean;          // 24/7 spoed beschikbaar
  spoed_toeslag?: string;          // Bijv. "€50 toeslag"

  // Prijsindicatie
  prijs_indicatie?: string;        // Bijv. "€45-€65/uur"
  voorrijkosten?: string;          // Bijv. "€25" of "Gratis"
  gratis_offerte: boolean;

  // Contact
  phone?: string;
  email?: string;
  website?: string;
  whatsapp?: string;

  // Details
  description?: string;
  opening_hours?: string;
  kvk_nummer?: string;             // KvK nummer
  year_established?: string;
  number_of_employees?: string;

  // Certificeringen
  certificeringen: string[];
  keurmerken: string[];

  // Google data
  rating?: number;
  review_count?: number;
  photo?: string;
  photo_url?: string;
  photos?: string[];

  // Reviews
  reviews?: Array<{
    reviewer_name: string;
    rating: number;
    review_text: string;
    review_date: string;
    reviewer_image?: string;
  }>;

  // Metadata
  status?: string;
  source?: string;
  premium?: boolean;
  discovered_at?: string;
  updated_at?: string;
}

// Generated content for SEO
export interface GeneratedContent {
  summary: string;
  about: string;
  services: string[];
  usps: string[];                  // Unique Selling Points
  tips: string[];
  local_context?: string;
  provincie_info?: string;
  service_info?: string;
  practical_info?: string;
}

// Enriched loodgieter with generated content
export interface EnrichedLoodgieterData {
  website_url?: string;
  website_content?: string;
  website_scraped_at?: string;

  google_rating?: number;
  google_review_count?: number;
  google_reviews?: Array<{
    reviewer_name: string;
    rating: number;
    review_text: string;
    review_date: string;
  }>;
  google_photo?: string;
  google_photos?: string[];

  generated?: GeneratedContent;
  generated_at?: string;

  enriched: boolean;
  enriched_at?: string;
  last_updated?: string;

  seoTitle?: string;
  seoDescription?: string;
  enrichedContent?: string;
}

export interface LoodgieterWithContent extends Loodgieter, EnrichedLoodgieterData {}

// Provincie interface
export interface Provincie {
  name: string;
  code: string;
  slug: string;
  gemeentes?: number;
  hoofdstad?: string;
  grote_steden?: string[];
  inwoners?: number;
}

// Service type interface (replaces TreatmentType)
export interface ServiceType {
  slug: string;
  name: string;
  description?: string;
  search_terms?: string[];
  icon?: string;
}

// Business type interface (replaces FacilityType)
export interface BusinessType {
  slug: string;
  name: string;
  description?: string;
  search_terms?: string[];
}

// Cache for static data
let provinciesCache: Provincie[] | null = null;
let serviceTypesCache: ServiceType[] | null = null;
let businessTypesCache: BusinessType[] | null = null;

// ===== HELPER: Map database row to Loodgieter interface =====

function mapRowToLoodgieter(row: typeof loodgieters.$inferSelect): Loodgieter {
  return {
    id: row.id.toString(),
    name: row.name,
    slug: row.slug,
    address: row.address || undefined,
    city: row.city,
    gemeente: row.gemeente || undefined,
    provincie: row.provincie,
    provincie_code: row.provincieCode,
    postcode: row.postcode || undefined,
    country: row.country,
    latitude: row.latitude ? parseFloat(row.latitude) : undefined,
    longitude: row.longitude ? parseFloat(row.longitude) : undefined,
    type: row.type,
    type_slug: row.typeSlug || row.type.toLowerCase().replace(/\s+/g, '-'),
    service_types: row.serviceTypes || [],
    specialisaties: row.specialisaties || [],
    werkgebied: row.werkgebied || [],
    werkgebied_radius: row.werkgebiedRadius || undefined,
    spoed_service: row.spoedService || false,
    spoed_toeslag: row.spoedToeslag || undefined,
    prijs_indicatie: row.prijsIndicatie || undefined,
    voorrijkosten: row.voorrijkosten || undefined,
    gratis_offerte: row.gratisOfferte || true,
    phone: row.phone || undefined,
    email: row.email || undefined,
    website: row.website || undefined,
    whatsapp: row.whatsapp || undefined,
    description: row.description || undefined,
    opening_hours: row.openingHours || undefined,
    kvk_nummer: row.kvkNummer || undefined,
    year_established: row.yearEstablished || undefined,
    number_of_employees: row.numberOfEmployees || undefined,
    certificeringen: row.certificeringen || [],
    keurmerken: row.keurmerken || [],
    rating: row.rating ? parseFloat(row.rating) : undefined,
    review_count: row.reviewCount || undefined,
    photo_url: row.photoUrl || undefined,
    photos: row.photos || undefined,
    status: row.status || undefined,
    source: row.source || undefined,
    premium: row.premium || false,
    discovered_at: row.discoveredAt?.toISOString() || undefined,
    updated_at: row.updatedAt?.toISOString() || undefined,
  };
}

function mapRowToLoodgieterWithContent(row: typeof loodgieters.$inferSelect): LoodgieterWithContent {
  const base = mapRowToLoodgieter(row);
  return {
    ...base,
    enriched: !!row.enrichedContent || !!row.generatedSummary,
    enriched_at: row.enrichedAt?.toISOString() || undefined,
    seoTitle: row.seoTitle || undefined,
    seoDescription: row.seoDescription || undefined,
    enrichedContent: row.enrichedContent || undefined,
    generated: row.generatedSummary ? {
      summary: row.generatedSummary || '',
      about: row.generatedAbout || '',
      services: row.generatedServices || [],
      usps: row.generatedUsps || [],
      tips: row.generatedTips || [],
      local_context: row.generatedLocalContext || undefined,
    } : undefined,
  };
}

// ===== CORE DATA FUNCTIONS =====

export async function getAllLoodgieters(): Promise<Loodgieter[]> {
  try {
    const results = await db.select().from(loodgieters);
    return results.map(mapRowToLoodgieter);
  } catch (error) {
    console.error('Error loading loodgieters from database:', error);
    return [];
  }
}

export async function getLoodgieterBySlug(slug: string): Promise<LoodgieterWithContent | null> {
  try {
    const results = await db.select()
      .from(loodgieters)
      .where(eq(loodgieters.slug, slug))
      .limit(1);

    if (results.length === 0) return null;

    return mapRowToLoodgieterWithContent(results[0]);
  } catch (error) {
    console.error('Error loading loodgieter:', error);
    return null;
  }
}

// ===== PROVINCIE FUNCTIONS =====

export async function getAllProvincies(): Promise<Provincie[]> {
  if (provinciesCache) return provinciesCache;

  try {
    const provinciesPath = path.join(process.cwd(), 'data', 'provincies.json');
    const content = await fs.readFile(provinciesPath, 'utf-8');
    const data = JSON.parse(content);
    provinciesCache = data.provincies as Provincie[];
    return provinciesCache;
  } catch (error) {
    console.error('Error loading provincies:', error);
    return [];
  }
}

export async function getProvincieBySlug(slug: string): Promise<Provincie | null> {
  const provincies = await getAllProvincies();
  return provincies.find(p => p.slug === slug) || null;
}

export async function getProvincieByCode(code: string): Promise<Provincie | null> {
  const provincies = await getAllProvincies();
  return provincies.find(p => p.code.toLowerCase() === code.toLowerCase()) || null;
}

export async function getLoodgietersByProvincie(provincie: string): Promise<Loodgieter[]> {
  try {
    const results = await db.select()
      .from(loodgieters)
      .where(
        or(
          ilike(loodgieters.provincie, provincie),
          ilike(loodgieters.provincieCode, provincie)
        )
      );
    return results.map(mapRowToLoodgieter);
  } catch (error) {
    console.error('Error loading loodgieters by provincie:', error);
    return [];
  }
}

// ===== GEMEENTE FUNCTIONS =====

export async function getAllGemeentes(): Promise<string[]> {
  try {
    const results = await db.selectDistinct({ gemeente: loodgieters.gemeente })
      .from(loodgieters)
      .where(sql`${loodgieters.gemeente} IS NOT NULL AND ${loodgieters.gemeente} != ''`)
      .orderBy(asc(loodgieters.gemeente));

    return results.map(r => r.gemeente!).filter(Boolean);
  } catch (error) {
    console.error('Error loading gemeentes:', error);
    return [];
  }
}

export async function getGemeentesByProvincie(provincie: string): Promise<string[]> {
  try {
    const results = await db.selectDistinct({ gemeente: loodgieters.gemeente })
      .from(loodgieters)
      .where(
        and(
          sql`${loodgieters.gemeente} IS NOT NULL AND ${loodgieters.gemeente} != ''`,
          or(
            ilike(loodgieters.provincie, provincie),
            ilike(loodgieters.provincieCode, provincie)
          )
        )
      )
      .orderBy(asc(loodgieters.gemeente));

    return results.map(r => r.gemeente!).filter(Boolean);
  } catch (error) {
    console.error('Error loading gemeentes by provincie:', error);
    return [];
  }
}

export async function getLoodgietersByGemeente(gemeente: string, provincie?: string): Promise<Loodgieter[]> {
  try {
    let whereClause = ilike(loodgieters.gemeente, gemeente);

    if (provincie) {
      whereClause = and(
        whereClause,
        or(
          ilike(loodgieters.provincie, provincie),
          ilike(loodgieters.provincieCode, provincie)
        )
      )!;
    }

    const results = await db.select()
      .from(loodgieters)
      .where(whereClause);

    return results.map(mapRowToLoodgieter);
  } catch (error) {
    console.error('Error loading loodgieters by gemeente:', error);
    return [];
  }
}

// ===== CITY (PLAATS) FUNCTIONS =====

export async function getAllCities(): Promise<string[]> {
  try {
    const results = await db.selectDistinct({ city: loodgieters.city })
      .from(loodgieters)
      .where(sql`${loodgieters.city} IS NOT NULL AND ${loodgieters.city} != ''`)
      .orderBy(asc(loodgieters.city));

    return results.map(r => r.city).filter(Boolean);
  } catch (error) {
    console.error('Error loading cities:', error);
    return [];
  }
}

export async function getCitiesByProvincie(provincie: string): Promise<string[]> {
  try {
    const results = await db.selectDistinct({ city: loodgieters.city })
      .from(loodgieters)
      .where(
        and(
          sql`${loodgieters.city} IS NOT NULL AND ${loodgieters.city} != ''`,
          or(
            ilike(loodgieters.provincie, provincie),
            ilike(loodgieters.provincieCode, provincie)
          )
        )
      )
      .orderBy(asc(loodgieters.city));

    return results.map(r => r.city).filter(Boolean);
  } catch (error) {
    console.error('Error loading cities by provincie:', error);
    return [];
  }
}

export async function getLoodgietersByCity(city: string, provincie?: string): Promise<Loodgieter[]> {
  try {
    let whereClause = ilike(loodgieters.city, city);

    if (provincie) {
      whereClause = and(
        whereClause,
        or(
          ilike(loodgieters.provincie, provincie),
          ilike(loodgieters.provincieCode, provincie)
        )
      )!;
    }

    const results = await db.select()
      .from(loodgieters)
      .where(whereClause);

    return results.map(mapRowToLoodgieter);
  } catch (error) {
    console.error('Error loading loodgieters by city:', error);
    return [];
  }
}

// ===== SERVICE TYPE FUNCTIONS =====

export async function getAllServiceTypes(): Promise<ServiceType[]> {
  if (serviceTypesCache) return serviceTypesCache;

  try {
    const typesPath = path.join(process.cwd(), 'data', 'service-types.json');
    const content = await fs.readFile(typesPath, 'utf-8');
    const data = JSON.parse(content);
    serviceTypesCache = data.types as ServiceType[];
    return serviceTypesCache;
  } catch (error) {
    console.error('Error loading service types:', error);
    return [];
  }
}

export async function getServiceTypeBySlug(slug: string): Promise<ServiceType | null> {
  const types = await getAllServiceTypes();
  return types.find(t => t.slug === slug) || null;
}

export async function getLoodgietersByServiceType(serviceType: string): Promise<Loodgieter[]> {
  try {
    const results = await db.select()
      .from(loodgieters)
      .where(
        sql`${serviceType} = ANY(${loodgieters.serviceTypes})`
      );

    return results.map(mapRowToLoodgieter);
  } catch (error) {
    console.error('Error loading loodgieters by service type:', error);
    return [];
  }
}

// ===== BUSINESS TYPE FUNCTIONS =====

export async function getAllBusinessTypes(): Promise<BusinessType[]> {
  if (businessTypesCache) return businessTypesCache;

  try {
    const typesPath = path.join(process.cwd(), 'data', 'business-types.json');
    const content = await fs.readFile(typesPath, 'utf-8');
    const data = JSON.parse(content);
    businessTypesCache = data.types as BusinessType[];
    return businessTypesCache;
  } catch (error) {
    console.error('Error loading business types:', error);
    return [];
  }
}

export async function getBusinessTypeBySlug(slug: string): Promise<BusinessType | null> {
  const types = await getAllBusinessTypes();
  return types.find(t => t.slug === slug) || null;
}

export async function getLoodgietersByBusinessType(businessType: string): Promise<Loodgieter[]> {
  try {
    const results = await db.select()
      .from(loodgieters)
      .where(
        or(
          ilike(loodgieters.type, businessType),
          ilike(loodgieters.typeSlug, businessType)
        )
      );

    return results.map(mapRowToLoodgieter);
  } catch (error) {
    console.error('Error loading loodgieters by business type:', error);
    return [];
  }
}

// ===== SPOED LOODGIETERS =====

export async function getSpoedLoodgieters(city?: string, provincie?: string): Promise<Loodgieter[]> {
  try {
    const conditions = [eq(loodgieters.spoedService, true)];

    if (city) {
      conditions.push(ilike(loodgieters.city, city));
    }

    if (provincie) {
      conditions.push(
        or(
          ilike(loodgieters.provincie, provincie),
          ilike(loodgieters.provincieCode, provincie)
        )!
      );
    }

    const results = await db.select()
      .from(loodgieters)
      .where(and(...conditions))
      .orderBy(desc(loodgieters.rating));

    return results.map(mapRowToLoodgieter);
  } catch (error) {
    console.error('Error loading spoed loodgieters:', error);
    return [];
  }
}

// ===== SLUG UTILITIES =====

export function createSlug(name: string, city: string, provincieCode?: string): string {
  const base = provincieCode
    ? `${name}-${city}-${provincieCode}`
    : `${name}-${city}`;

  return base
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function createProvincieSlug(provincie: string): string {
  return provincie
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function createGemeenteSlug(gemeente: string): string {
  return gemeente
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function createCitySlug(city: string): string {
  return city
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function createTypeSlug(type: string): string {
  return type
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// ===== STATISTICS =====

export async function getStats() {
  try {
    const provincies = await getAllProvincies();
    const serviceTypes = await getAllServiceTypes();
    const businessTypes = await getAllBusinessTypes();

    // Use SQL aggregations for efficiency
    const [statsResult] = await db.select({
      totalLoodgieters: count(),
      provinciesWithLoodgieters: sql<number>`COUNT(DISTINCT ${loodgieters.provincie})`,
      citiesWithLoodgieters: sql<number>`COUNT(DISTINCT ${loodgieters.city})`,
      gemeentesWithLoodgieters: sql<number>`COUNT(DISTINCT ${loodgieters.gemeente})`,
      withRatings: sql<number>`COUNT(*) FILTER (WHERE ${loodgieters.rating} IS NOT NULL)`,
      withPhotos: sql<number>`COUNT(*) FILTER (WHERE ${loodgieters.photoUrl} IS NOT NULL)`,
      withSpoed: sql<number>`COUNT(*) FILTER (WHERE ${loodgieters.spoedService} = true)`,
      premium: sql<number>`COUNT(*) FILTER (WHERE ${loodgieters.premium} = true)`,
    }).from(loodgieters);

    return {
      total_loodgieters: Number(statsResult.totalLoodgieters),
      total_provincies: provincies.length,
      provincies_with_loodgieters: Number(statsResult.provinciesWithLoodgieters),
      cities_with_loodgieters: Number(statsResult.citiesWithLoodgieters),
      gemeentes_with_loodgieters: Number(statsResult.gemeentesWithLoodgieters),
      total_service_types: serviceTypes.length,
      total_business_types: businessTypes.length,
      with_ratings: Number(statsResult.withRatings),
      with_photos: Number(statsResult.withPhotos),
      with_spoed: Number(statsResult.withSpoed),
      premium_listings: Number(statsResult.premium),
    };
  } catch (error) {
    console.error('Error loading stats:', error);
    return {
      total_loodgieters: 0,
      total_provincies: 0,
      provincies_with_loodgieters: 0,
      cities_with_loodgieters: 0,
      gemeentes_with_loodgieters: 0,
      total_service_types: 0,
      total_business_types: 0,
      with_ratings: 0,
      with_photos: 0,
      with_spoed: 0,
      premium_listings: 0,
    };
  }
}

// ===== SEARCH =====

export async function searchLoodgieters(query: string, filters?: {
  provincie?: string;
  type?: string;
  city?: string;
  gemeente?: string;
  serviceType?: string;
  spoedOnly?: boolean;
  premiumOnly?: boolean;
}): Promise<Loodgieter[]> {
  try {
    // Build dynamic where conditions
    const conditions = [];

    if (filters?.provincie) {
      conditions.push(
        or(
          ilike(loodgieters.provincie, filters.provincie),
          ilike(loodgieters.provincieCode, filters.provincie)
        )
      );
    }

    if (filters?.type) {
      conditions.push(
        or(
          ilike(loodgieters.type, `%${filters.type}%`),
          ilike(loodgieters.typeSlug, filters.type)
        )
      );
    }

    if (filters?.city) {
      conditions.push(ilike(loodgieters.city, filters.city));
    }

    if (filters?.gemeente) {
      conditions.push(ilike(loodgieters.gemeente, filters.gemeente));
    }

    if (filters?.serviceType) {
      conditions.push(
        sql`${filters.serviceType} = ANY(${loodgieters.serviceTypes})`
      );
    }

    if (filters?.spoedOnly) {
      conditions.push(eq(loodgieters.spoedService, true));
    }

    if (filters?.premiumOnly) {
      conditions.push(eq(loodgieters.premium, true));
    }

    // Add search query
    if (query && query.trim()) {
      const q = `%${query.trim()}%`;
      conditions.push(
        or(
          ilike(loodgieters.name, q),
          ilike(loodgieters.city, q),
          ilike(loodgieters.gemeente, q),
          ilike(loodgieters.provincie, q),
          ilike(loodgieters.address, q),
          ilike(loodgieters.postcode, q)
        )
      );
    }

    let dbQuery = db.select().from(loodgieters);

    if (conditions.length > 0) {
      dbQuery = dbQuery.where(and(...conditions)) as typeof dbQuery;
    }

    const results = await dbQuery
      .orderBy(desc(loodgieters.premium), desc(loodgieters.rating))
      .limit(100);

    return results.map(mapRowToLoodgieter);
  } catch (error) {
    console.error('Error searching loodgieters:', error);
    return [];
  }
}

// ===== NEARBY LOODGIETERS =====

// Haversine distance calculation
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export async function getNearbyLoodgieters(
  lat: number,
  lon: number,
  radiusKm: number = 25,
  limit: number = 20
): Promise<Array<Loodgieter & { distance: number }>> {
  try {
    const results = await db.select()
      .from(loodgieters)
      .where(
        sql`${loodgieters.latitude} IS NOT NULL AND ${loodgieters.longitude} IS NOT NULL`
      )
      .limit(1000);

    // Calculate distances and filter client-side
    const withDistance = results
      .map(row => ({
        ...mapRowToLoodgieter(row),
        distance: haversineDistance(
          lat, lon,
          parseFloat(row.latitude!),
          parseFloat(row.longitude!)
        )
      }))
      .filter(l => l.distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit);

    return withDistance;
  } catch (error) {
    console.error('Error loading nearby loodgieters:', error);
    return [];
  }
}

// ===== FEATURED/POPULAR =====

export async function getFeaturedLoodgieters(limit: number = 10): Promise<Loodgieter[]> {
  try {
    const results = await db.select()
      .from(loodgieters)
      .where(
        and(
          sql`${loodgieters.rating} IS NOT NULL`,
          sql`${loodgieters.reviewCount} > 0`
        )
      )
      .orderBy(
        desc(loodgieters.premium),
        desc(sql`${loodgieters.rating} * LOG(${loodgieters.reviewCount} + 1)`),
        desc(loodgieters.rating)
      )
      .limit(limit);

    return results.map(mapRowToLoodgieter);
  } catch (error) {
    console.error('Error loading featured loodgieters:', error);
    return [];
  }
}

export async function getRecentlyUpdated(limit: number = 10): Promise<Loodgieter[]> {
  try {
    const results = await db.select()
      .from(loodgieters)
      .where(sql`${loodgieters.updatedAt} IS NOT NULL`)
      .orderBy(desc(loodgieters.updatedAt))
      .limit(limit);

    return results.map(mapRowToLoodgieter);
  } catch (error) {
    console.error('Error loading recently updated loodgieters:', error);
    return [];
  }
}

// ===== BACKWARD COMPATIBILITY =====
// Aliases for old function names

export const getAllFacilities = getAllLoodgieters;
export const getFacilityBySlug = getLoodgieterBySlug;
export const getAllStates = getAllProvincies;
export const getStateBySlug = getProvincieBySlug;
export const getStateByAbbr = getProvincieByCode;
export const getFacilitiesByState = getLoodgietersByProvincie;
export const getAllCounties = getAllGemeentes;
export const getCountiesByState = getGemeentesByProvincie;
export const getFacilitiesByCounty = getLoodgietersByGemeente;
export const getCitiesByState = getCitiesByProvincie;
export const getFacilitiesByCity = getLoodgietersByCity;
export const getAllTreatmentTypes = getAllServiceTypes;
export const getTreatmentTypeBySlug = getServiceTypeBySlug;
export const getFacilitiesByTreatmentType = getLoodgietersByServiceType;
export const getAllFacilityTypes = getAllBusinessTypes;
export const getFacilityTypeBySlug = getBusinessTypeBySlug;
export const getFacilitiesByFacilityType = getLoodgietersByBusinessType;
export const searchFacilities = searchLoodgieters;
export const getNearbyFacilities = getNearbyLoodgieters;
export const getFeaturedFacilities = getFeaturedLoodgieters;

// Type aliases
export type Facility = Loodgieter;
export type FacilityWithContent = LoodgieterWithContent;
export type State = Provincie;
export type TreatmentType = ServiceType;
export type FacilityType = BusinessType;
