import { getAllFacilities, getAllFacilityTypes, createStateSlug, createTypeSlug } from './data';

// Interfaces for footer data
export interface FooterState {
  name: string;
  slug: string;
  count: number;
}

export interface FooterType {
  name: string;
  slug: string;
  count: number;
}

export interface FooterGuide {
  href: string;
  label: string;
  description?: string;
}

// Dienst types sectie
export const serviceTypes: FooterGuide[] = [
  {
    href: '/dienst/spoed-lekkage',
    label: 'Spoed Lekkage',
    description: '24/7 hulp bij lekkages'
  },
  {
    href: '/dienst/cv-installatie',
    label: 'CV-Installatie',
    description: 'Installatie en onderhoud CV-ketels'
  },
  {
    href: '/dienst/sanitair',
    label: 'Sanitair Installatie',
    description: 'Toilet, douche, wastafel installatie'
  },
  {
    href: '/dienst/riool-ontstopping',
    label: 'Riool Ontstopping',
    description: 'Verstopt riool of afvoer'
  },
  {
    href: '/dienst/waterleiding',
    label: 'Waterleiding',
    description: 'Aanleg en reparatie waterleidingen'
  },
  {
    href: '/dienst/badkamer-renovatie',
    label: 'Badkamer Renovatie',
    description: 'Complete badkamer verbouwing'
  }
];

// Loodgieter resources sectie
export const resources: FooterGuide[] = [
  {
    href: '/guide/what-to-expect',
    label: 'Wat te Verwachten',
    description: 'Bij het inhuren van een loodgieter'
  },
  {
    href: '/guide/prices',
    label: 'Prijzen & Tarieven',
    description: 'Overzicht loodgieter kosten'
  },
  {
    href: '/guide/emergency',
    label: 'Spoed Loodgieter',
    description: 'Wanneer spoed nodig is'
  },
  {
    href: '/guide/services',
    label: 'Diensten Overzicht',
    description: 'Alle loodgietersdiensten'
  },
  {
    href: '/guide/tips',
    label: 'Loodgieter Tips',
    description: 'Handige tips en advies'
  },
  {
    href: '/guide/checklist',
    label: 'Keuze Checklist',
    description: 'Waar op te letten'
  }
];

// Support resources sectie
export const support: FooterGuide[] = [
  {
    href: '/guide/lekkage-preventie',
    label: 'Lekkage Preventie',
    description: 'Voorkom waterschade'
  },
  {
    href: '/guide/cv-onderhoud',
    label: 'CV Onderhoud',
    description: 'Jaarlijks ketelonderhoud'
  },
  {
    href: '/guide/doe-het-zelf',
    label: 'Doe-het-zelf Tips',
    description: 'Kleine reparaties zelf doen'
  },
  {
    href: '/guide/verzekering',
    label: 'Verzekering',
    description: 'Waterschade en verzekering'
  },
  {
    href: '/guide/duurzaam',
    label: 'Duurzame Installaties',
    description: 'Warmtepompen en vloerverwarming'
  }
];

// Static guides content (pillar pages)
export const guides: FooterGuide[] = [
  {
    href: '/guide/what-to-expect',
    label: 'Wat te Verwachten',
    description: 'Complete gids loodgieter inhuren'
  },
  {
    href: '/guide/services',
    label: 'Diensten Overzicht',
    description: 'Alle loodgietersdiensten'
  },
  {
    href: '/guide/prices',
    label: 'Prijzen & Tarieven',
    description: 'Kostenindicaties'
  },
  {
    href: '/guide/emergency',
    label: 'Spoed Service',
    description: 'Wanneer 24/7 hulp nodig is'
  },
  {
    href: '/guide/tips',
    label: 'Tips & Advies',
    description: 'Handige loodgieter tips'
  }
];

// Cache for footer data
let statesCacheFooter: FooterState[] | null = null;
let typesCacheFooter: FooterType[] | null = null;

/**
 * Get top provincies by loodgieter count
 * @param limit - Maximum number of provincies to return (default 8)
 * @returns Array of provincies sorted by loodgieter count (descending)
 */
export async function getTopStatesByFacilityCount(limit: number = 8): Promise<FooterState[]> {
  if (statesCacheFooter && statesCacheFooter.length >= limit) {
    return statesCacheFooter.slice(0, limit);
  }

  try {
    const facilities = await getAllFacilities();

    // Count loodgieters per provincie
    const stateCounts = new Map<string, number>();

    for (const facility of facilities) {
      if (facility.state && facility.state.trim()) {
        const state = facility.state.trim();
        stateCounts.set(state, (stateCounts.get(state) || 0) + 1);
      }
    }

    // Convert to array and sort by count
    const sortedStates: FooterState[] = Array.from(stateCounts.entries())
      .map(([name, count]) => ({
        name,
        slug: createStateSlug(name),
        count
      }))
      .sort((a, b) => b.count - a.count);

    // Cache the full list
    statesCacheFooter = sortedStates;

    return sortedStates.slice(0, limit);
  } catch (error) {
    console.error('Error getting top provincies:', error);
    return [];
  }
}

/**
 * Get top loodgieter types by count
 * @param limit - Maximum number of types to return (default 8)
 * @returns Array of types sorted by loodgieter count (descending)
 */
export async function getTopTypesByFacilityCount(limit: number = 8): Promise<FooterType[]> {
  if (typesCacheFooter && typesCacheFooter.length >= limit) {
    return typesCacheFooter.slice(0, limit);
  }

  try {
    const facilities = await getAllFacilities();
    const allTypes = await getAllFacilityTypes();

    // Count loodgieters per type
    const typeCounts = new Map<string, number>();
    const typeNames = new Map<string, string>();

    // Build a lookup for type names
    for (const type of allTypes) {
      typeNames.set(type.slug, type.name);
    }

    for (const facility of facilities) {
      if (facility.type_slug && facility.type_slug.trim()) {
        const typeSlug = facility.type_slug.trim();
        typeCounts.set(typeSlug, (typeCounts.get(typeSlug) || 0) + 1);

        // Store display name if we have it
        if (facility.type && !typeNames.has(typeSlug)) {
          typeNames.set(typeSlug, facility.type);
        }
      } else if (facility.type && facility.type.trim()) {
        const typeSlug = createTypeSlug(facility.type.trim());
        typeCounts.set(typeSlug, (typeCounts.get(typeSlug) || 0) + 1);
        typeNames.set(typeSlug, facility.type.trim());
      }
    }

    // Convert to array and sort by count
    const sortedTypes: FooterType[] = Array.from(typeCounts.entries())
      .map(([slug, count]) => ({
        name: formatTypeName(typeNames.get(slug) || slug),
        slug,
        count
      }))
      .sort((a, b) => b.count - a.count);

    // Cache the full list
    typesCacheFooter = sortedTypes;

    return sortedTypes.slice(0, limit);
  } catch (error) {
    console.error('Error getting top types:', error);
    return [];
  }
}

/**
 * Format type name for display
 */
function formatTypeName(name: string): string {
  // Convert slug-style names to title case
  if (name.includes('-')) {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Capitalize first letter of each word
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Get all footer data in a single call (for server components)
 */
export async function getFooterData(stateLimit: number = 8, typeLimit: number = 8) {
  const [topStates, topTypes] = await Promise.all([
    getTopStatesByFacilityCount(stateLimit),
    getTopTypesByFacilityCount(typeLimit)
  ]);

  return {
    states: topStates,
    types: topTypes,
    serviceTypes,
    resources,
    support,
    guides
  };
}

/**
 * Clear cache (useful for development/testing)
 */
export function clearFooterCache() {
  statesCacheFooter = null;
  typesCacheFooter = null;
}
