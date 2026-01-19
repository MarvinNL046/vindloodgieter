/**
 * Affiliate Partner Configuration
 *
 * Add affiliate partners here. Set 'active: true' when you have a partner.
 * Ads are only shown when there is at least one active partner.
 */

export interface AffiliatePartner {
  id: string;
  name: string;
  description: string;
  url: string;
  imageUrl?: string;
  buttonText: string;
  active: boolean;
  // Optional tracking parameters
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export const affiliatePartners: AffiliatePartner[] = [
  {
    id: 'cv-ketel-vergelijken',
    name: 'CV-Ketel Vergelijken',
    description: 'Vergelijk CV-ketels van verschillende merken en vind de beste prijs voor uw situatie.',
    url: 'https://example.com/cv-ketel-vergelijken',
    imageUrl: '/images/affiliates/cv-ketel.png',
    buttonText: 'Vergelijken',
    active: false, // Set to true when you have a partner
    utmSource: 'vindloodgieter',
    utmMedium: 'sidebar',
    utmCampaign: 'cv-ketel-vergelijken',
  },
  {
    id: 'installatiemateriaal',
    name: 'Installatiemateriaal Shop',
    description: 'Kwaliteits loodgietersmateriaal voor particulier en professional.',
    url: 'https://example.com/installatiemateriaal',
    imageUrl: '/images/affiliates/materiaal.png',
    buttonText: 'Bekijk shop',
    active: false,
    utmSource: 'vindloodgieter',
    utmMedium: 'sidebar',
    utmCampaign: 'installatiemateriaal',
  },
  {
    id: 'warmtepomp-adviseur',
    name: 'Warmtepomp Adviseur',
    description: 'Gratis advies over warmtepompen en duurzame verwarming voor uw woning.',
    url: 'https://example.com/warmtepomp',
    imageUrl: '/images/affiliates/warmtepomp.png',
    buttonText: 'Gratis advies',
    active: false,
    utmSource: 'vindloodgieter',
    utmMedium: 'sidebar',
    utmCampaign: 'warmtepomp-adviseur',
  },
  {
    id: 'badkamer-ontwerp',
    name: 'Badkamer Ontwerp Service',
    description: 'Laat uw droomtadkamer ontwerpen door professionals.',
    url: 'https://example.com/badkamer-ontwerp',
    imageUrl: '/images/affiliates/badkamer.png',
    buttonText: 'Ontwerp aanvragen',
    active: false,
    utmSource: 'vindloodgieter',
    utmMedium: 'sidebar',
    utmCampaign: 'badkamer-ontwerp',
  },
];

/**
 * Helper function to get active partners
 */
export function getActivePartners(): AffiliatePartner[] {
  return affiliatePartners.filter(partner => partner.active);
}

/**
 * Helper function to check if there are active partners
 */
export function hasActivePartners(): boolean {
  return affiliatePartners.some(partner => partner.active);
}

/**
 * Helper function to build affiliate URL with UTM parameters
 */
export function buildAffiliateUrl(partner: AffiliatePartner): string {
  const url = new URL(partner.url);

  if (partner.utmSource) {
    url.searchParams.set('utm_source', partner.utmSource);
  }
  if (partner.utmMedium) {
    url.searchParams.set('utm_medium', partner.utmMedium);
  }
  if (partner.utmCampaign) {
    url.searchParams.set('utm_campaign', partner.utmCampaign);
  }

  return url.toString();
}
