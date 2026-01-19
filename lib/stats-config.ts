/**
 * Centrale Statistieken Configuratie voor VindLoodgieter.nl
 *
 * Update deze waarden op EEN plek wanneer data verandert.
 * Alle componenten en pagina's importeren hiervandaan.
 *
 * Laatste update: 2025-01-18
 * - Initiele setup voor loodgieters directory Nederland
 */

export const SITE_STATS = {
  // Display values (formatted for UI)
  totalFacilitiesDisplay: '5.000',  // Geschat aantal loodgieters in NL
  totalFacilitiesExact: 5000,

  // Geographic coverage - Nederlandse provincies
  totalProvinces: 12,
  totalMunicipalities: 342,  // Nederlandse gemeenten

  // Dynamic placeholder (when API hasn't loaded yet)
  facilitiesPlaceholder: '5.000+',

  // Site info
  siteName: 'VindLoodgieter.nl',
  siteUrl: 'https://www.vindloodgieter.nl',
  country: 'Nederland',
  countryShort: 'NL',

  // Loodgieter diensten stats
  spoedLoodgietersCount: 1200,
  sanitairInstallateursCount: 3500,
  cvInstallateursCount: 2800,
  rioolServiceCount: 1500,

  // Markt statistieken
  jaarlijkseWaterSchade: '1 miljard',
  huishoudensMet CVKetel: '7 miljoen',
  gemiddeldLoodgieterUurtarief: '50-75',

  // Top provincies by loodgieter count
  topProvinces: {
    zuidHolland: 950,
    noordHolland: 820,
    noordBrabant: 680,
    gelderland: 520,
    utrecht: 380,
  },

  // Dienst types
  serviceTypesCount: 8,
  spoedBereikbaar: '24/7',
  totalReviewsDisplay: '10.000+',
} as const;

/**
 * Get formatted stats description for SEO and meta tags
 */
export function getStatsDescription(variant: 'short' | 'long' | 'seo' = 'short'): string {
  switch (variant) {
    case 'short':
      return `Vind loodgieters in alle ${SITE_STATS.totalProvinces} provincies.`;
    case 'long':
      return `Doorzoek onze uitgebreide database van ${SITE_STATS.totalFacilitiesDisplay}+ loodgieters, installateurs en sanitair specialisten in alle ${SITE_STATS.totalProvinces} provincies van ${SITE_STATS.country}.`;
    case 'seo':
      return `Vind loodgieters, CV-installateurs en sanitair specialisten bij u in de buurt. Zoek op plaats, provincie of postcode. Bekijk reviews en vraag direct offertes aan.`;
    default:
      return `Vind loodgieters in alle ${SITE_STATS.totalProvinces} provincies.`;
  }
}

/**
 * Get CTA stats text for blog pages and promotional sections
 */
export function getCtaStatsText(): string {
  return `Doorzoek direct onze uitgebreide database met meer dan ${SITE_STATS.totalFacilitiesDisplay} loodgieters.`;
}

/**
 * Get FAQ answer about facility count
 */
export function getFaqFacilitiesAnswer(): string {
  return `${SITE_STATS.country} heeft ongeveer ${SITE_STATS.totalFacilitiesDisplay} loodgieters en installatiebedrijven, inclusief spoed loodgieters, sanitair installateurs, CV-monteurs en rioolspecialisten. Deze bedrijven zijn verspreid over alle ${SITE_STATS.totalProvinces} provincies.`;
}

/**
 * Get "why us" feature text
 */
export function getComprehensiveDataText(): string {
  return `Informatie over loodgieters in alle ${SITE_STATS.totalProvinces} provincies met geverifieerde gegevens, reviews en contactinformatie.`;
}

/**
 * Get provinces message for empty province pages
 */
export function getProvincesComingSoonText(): string {
  return `We voegen actief loodgieter data toe voor alle ${SITE_STATS.totalProvinces} provincies. Kom snel terug voor updates!`;
}

/**
 * Get market statistics text
 */
export function getMarketStatsText(): string {
  return `Jaarlijks is er voor ${SITE_STATS.jaarlijkseWaterSchade} euro aan waterschade in Nederland. ${SITE_STATS.huishoudensMet CVKetel} huishoudens hebben een CV-ketel die regelmatig onderhoud nodig heeft.`;
}
