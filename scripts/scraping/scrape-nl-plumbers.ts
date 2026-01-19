/**
 * Script voor het verzamelen van loodgieterdata uit Nederlandse bronnen
 *
 * Dit script haalt loodgietersinformatie op via de Google Places API
 * voor alle provincies en grote gemeenten in Nederland.
 */

import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';

config({ path: '.env.local' });

// Nederlandse provincies
const DUTCH_PROVINCES = [
  'Noord-Holland',
  'Zuid-Holland',
  'Noord-Brabant',
  'Gelderland',
  'Utrecht',
  'Overijssel',
  'Limburg',
  'Friesland',
  'Groningen',
  'Drenthe',
  'Flevoland',
  'Zeeland',
];

// Grote Nederlandse steden per provincie
const DUTCH_CITIES: Record<string, string[]> = {
  'Noord-Holland': ['Amsterdam', 'Haarlem', 'Zaandam', 'Alkmaar', 'Hilversum', 'Amstelveen', 'Purmerend', 'Hoorn'],
  'Zuid-Holland': ['Rotterdam', 'Den Haag', 'Leiden', 'Zoetermeer', 'Dordrecht', 'Delft', 'Schiedam', 'Gouda'],
  'Noord-Brabant': ['Eindhoven', 'Tilburg', 'Breda', 's-Hertogenbosch', 'Helmond', 'Oss', 'Bergen op Zoom', 'Roosendaal'],
  'Gelderland': ['Nijmegen', 'Arnhem', 'Apeldoorn', 'Ede', 'Doetinchem', 'Zutphen', 'Harderwijk', 'Tiel'],
  'Utrecht': ['Utrecht', 'Amersfoort', 'Zeist', 'Nieuwegein', 'Houten', 'Veenendaal', 'Woerden', 'IJsselstein'],
  'Overijssel': ['Zwolle', 'Enschede', 'Deventer', 'Hengelo', 'Almelo', 'Kampen', 'Oldenzaal'],
  'Limburg': ['Maastricht', 'Venlo', 'Roermond', 'Sittard', 'Heerlen', 'Weert', 'Kerkrade'],
  'Friesland': ['Leeuwarden', 'Drachten', 'Sneek', 'Heerenveen', 'Harlingen'],
  'Groningen': ['Groningen', 'Veendam', 'Stadskanaal', 'Winschoten'],
  'Drenthe': ['Assen', 'Emmen', 'Hoogeveen', 'Meppel'],
  'Flevoland': ['Almere', 'Lelystad', 'Dronten'],
  'Zeeland': ['Middelburg', 'Vlissingen', 'Goes', 'Terneuzen'],
};

// Zoektermen voor loodgieters
const SEARCH_TERMS = [
  'loodgieter',
  'installatiebedrijf',
  'cv installateur',
  'sanitair installateur',
  'rioolontstopping',
  'lekkage specialist',
];

interface PlumberData {
  name: string;
  slug: string;
  address: string;
  city: string;
  province: string;
  province_abbr: string;
  municipality?: string;
  postcode?: string;
  phone?: string;
  website?: string;
  lat?: number;
  lng?: number;
  rating?: number;
  review_count?: number;
  photo?: string;
  place_id?: string;
  service_types: string[];
  specializations: string[];
  availability: string[];
  certifications: string[];
  description?: string;
}

// Utility: create URL-safe slug
function createSlug(name: string, city: string): string {
  const combined = `${name}-${city}`;
  return combined
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Utility: get province abbreviation
function getProvinceAbbr(province: string): string {
  const abbrs: Record<string, string> = {
    'Noord-Holland': 'NH',
    'Zuid-Holland': 'ZH',
    'Noord-Brabant': 'NB',
    'Gelderland': 'GE',
    'Utrecht': 'UT',
    'Overijssel': 'OV',
    'Limburg': 'LI',
    'Friesland': 'FR',
    'Groningen': 'GR',
    'Drenthe': 'DR',
    'Flevoland': 'FL',
    'Zeeland': 'ZE',
  };
  return abbrs[province] || '';
}

// Fetch plumbers from Google Places API
async function fetchPlumbersFromGoogle(city: string, province: string, searchTerm: string): Promise<PlumberData[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    console.error('GOOGLE_PLACES_API_KEY niet gevonden in .env.local');
    return [];
  }

  const query = encodeURIComponent(`${searchTerm} ${city} ${province} Nederland`);
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}&language=nl`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      console.log(`Google API response status: ${data.status} voor ${city}`);
      return [];
    }

    const plumbers: PlumberData[] = data.results.map((place: any) => ({
      name: place.name,
      slug: createSlug(place.name, city),
      address: place.formatted_address || '',
      city: city,
      province: province,
      province_abbr: getProvinceAbbr(province),
      lat: place.geometry?.location?.lat,
      lng: place.geometry?.location?.lng,
      rating: place.rating,
      review_count: place.user_ratings_total,
      place_id: place.place_id,
      service_types: determineServiceTypes(place.name, place.types || []),
      specializations: [],
      availability: [],
      certifications: [],
    }));

    return plumbers;
  } catch (error) {
    console.error(`Fout bij ophalen data voor ${city}:`, error);
    return [];
  }
}

// Determine service types based on name and types
function determineServiceTypes(name: string, types: string[]): string[] {
  const services: string[] = ['Loodgieter'];
  const nameLower = name.toLowerCase();

  if (nameLower.includes('spoed') || nameLower.includes('24')) {
    services.push('Spoed Loodgieter');
  }
  if (nameLower.includes('cv') || nameLower.includes('verwarming') || nameLower.includes('ketel')) {
    services.push('CV Installatie');
  }
  if (nameLower.includes('sanitair') || nameLower.includes('badkamer')) {
    services.push('Sanitair');
  }
  if (nameLower.includes('riool') || nameLower.includes('ontstopping')) {
    services.push('Riool Ontstopping');
  }
  if (nameLower.includes('lekkage')) {
    services.push('Lekkage Opsporing');
  }
  if (nameLower.includes('warmtepomp') || nameLower.includes('duurzaam')) {
    services.push('Duurzame Installaties');
  }

  return services;
}

// Main scraping function
async function scrapePlumbers(options: {
  province?: string;
  city?: string;
  limit?: number;
  dryRun?: boolean;
}) {
  console.log('Start met verzamelen van loodgieterdata...');
  console.log('Opties:', options);

  const allPlumbers: PlumberData[] = [];
  const provinces = options.province ? [options.province] : DUTCH_PROVINCES;

  for (const province of provinces) {
    const cities = options.city ? [options.city] : (DUTCH_CITIES[province] || []);

    for (const city of cities) {
      console.log(`\nVerwerken: ${city}, ${province}`);

      for (const searchTerm of SEARCH_TERMS.slice(0, 2)) { // Beperk zoektermen voor snelheid
        console.log(`  Zoeken op: "${searchTerm}"`);

        const plumbers = await fetchPlumbersFromGoogle(city, province, searchTerm);
        console.log(`  Gevonden: ${plumbers.length} resultaten`);

        // Add unique plumbers
        for (const plumber of plumbers) {
          const exists = allPlumbers.some(p => p.place_id === plumber.place_id);
          if (!exists) {
            allPlumbers.push(plumber);
          }
        }

        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));

        if (options.limit && allPlumbers.length >= options.limit) {
          console.log(`Limiet van ${options.limit} bereikt`);
          break;
        }
      }

      if (options.limit && allPlumbers.length >= options.limit) break;
    }

    if (options.limit && allPlumbers.length >= options.limit) break;
  }

  console.log(`\nTotaal unieke loodgieters gevonden: ${allPlumbers.length}`);

  if (!options.dryRun) {
    // Save to JSON file
    const outputDir = path.join(process.cwd(), 'data', 'plumbers');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputFile = path.join(outputDir, `plumbers-${Date.now()}.json`);
    fs.writeFileSync(outputFile, JSON.stringify(allPlumbers, null, 2));
    console.log(`Data opgeslagen in: ${outputFile}`);
  } else {
    console.log('\n[DRY RUN] Data niet opgeslagen');
    console.log('Voorbeeld resultaat:');
    console.log(JSON.stringify(allPlumbers.slice(0, 3), null, 2));
  }

  return allPlumbers;
}

// CLI interface
const args = process.argv.slice(2);
const options = {
  province: args.find(a => a.startsWith('--province='))?.split('=')[1],
  city: args.find(a => a.startsWith('--city='))?.split('=')[1],
  limit: parseInt(args.find(a => a.startsWith('--limit='))?.split('=')[1] || '0') || undefined,
  dryRun: args.includes('--dry-run'),
};

scrapePlumbers(options)
  .then(() => {
    console.log('\nKlaar!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fout:', error);
    process.exit(1);
  });

export { scrapePlumbers, PlumberData };
