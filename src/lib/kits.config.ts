// Import functions from kits.client for use in this file
import {
  PRIORITY_SLUGS,
  ISO3_TO_2,
  ISO2_NAMES,
  slugToIso3Pair,
  iso3PairToIso2Pair,
  toCanonicalPairKey,
  expandPairTitle,
  generateFRAXXXTitle,
  slugToPairKey,
  isValidPrioritySlug
} from './kits.client'

export type Kit = {
  title: string
  description: string
  ogImage: string
  sku: string
  price: string
  currency: 'EUR'
  url: string
  validFrom: string
  brand: string
}

export const KITS: Record<string, Kit> = {
  'fra-usa': {
    title: 'France ⇄ United States Marriage Guide (2025) | Lex Atlas',
    description: "Documents, CCAM/recognition, étapes légales pour un mariage France–USA. Kit PDF prêt à l'emploi, téléchargement instantané.",
    ogImage: '/images/kits/fra-usa-cover.jpg',
    sku: 'KIT-FRA-USA-2025',
    price: '29.00',
    currency: 'EUR',
    url: 'https://lex-atlas.com/kits/fra-usa',
    validFrom: '2025-09-17',
    brand: 'Lex Atlas'
  },
  'fra-gbr': {
    title: 'France ⇄ United Kingdom Marriage Guide (2025) | Lex Atlas',
    description: "Documents, CNI/recognition, étapes légales pour un mariage France–UK. Kit PDF prêt à l'emploi, téléchargement instantané.",
    ogImage: '/images/kits/fra-gbr-cover.jpg',
    sku: 'KIT-FRA-GBR-2025',
    price: '29.00',
    currency: 'EUR',
    url: 'https://lex-atlas.com/kits/fra-gbr',
    validFrom: '2025-09-17',
    brand: 'Lex Atlas'
  },
  'fra-can': {
    title: 'France ⇄ Canada Marriage Guide (2025) | Lex Atlas',
    description: "Étapes officielles, traductions et reconnaissance d'un mariage France–Canada. Kit PDF complet + mises à jour incluses.",
    ogImage: '/images/kits/fra-can-cover.jpg',
    sku: 'KIT-FRA-CAN-2025',
    price: '29.00',
    currency: 'EUR',
    url: 'https://lex-atlas.com/kits/fra-can',
    validFrom: '2025-09-17',
    brand: 'Lex Atlas'
  },
  'fra-mar': {
    title: 'France ⇄ Morocco Marriage Guide (2025) | Lex Atlas',
    description: "Publication des bans, CCAM, transcription Maroc → France. Guide PDF étape par étape, téléchargement instantané.",
    ogImage: '/images/kits/fra-mar-cover.jpg',
    sku: 'KIT-FRA-MAR-2025',
    price: '29.00',
    currency: 'EUR',
    url: 'https://lex-atlas.com/kits/fra-mar',
    validFrom: '2025-09-17',
    brand: 'Lex Atlas'
  },
  'fra-deu': {
    title: 'France ⇄ Germany Marriage Guide (2025) | Lex Atlas',
    description: "Documents requis, délais, reconnaissance France–Allemagne. Kit PDF prêt à l'emploi.",
    ogImage: '/images/kits/fra-deu-cover.jpg',
    sku: 'KIT-FRA-DEU-2025',
    price: '29.00',
    currency: 'EUR',
    url: 'https://lex-atlas.com/kits/fra-deu',
    validFrom: '2025-09-17',
    brand: 'Lex Atlas'
  },
  'fra-che': {
    title: 'France ⇄ Switzerland Marriage Guide (2025) | Lex Atlas',
    description: "Processus de mariage France–Suisse: démarches, documents, reconnaissance. PDF clair et prêt à utiliser.",
    ogImage: '/images/kits/fra-che-cover.jpg',
    sku: 'KIT-FRA-CHE-2025',
    price: '29.00',
    currency: 'EUR',
    url: 'https://lex-atlas.com/kits/fra-che',
    validFrom: '2025-09-17',
    brand: 'Lex Atlas'
  },
  'fra-bel': {
    title: 'France ⇄ Belgium Marriage Guide (2025) | Lex Atlas',
    description: "CCAM, publication des bans, reconnaissance France–Belgique. Téléchargement instantané.",
    ogImage: '/images/kits/fra-bel-cover.jpg',
    sku: 'KIT-FRA-BEL-2025',
    price: '29.00',
    currency: 'EUR',
    url: 'https://lex-atlas.com/kits/fra-bel',
    validFrom: '2025-09-17',
    brand: 'Lex Atlas'
  },
  'fra-esp': {
    title: 'France ⇄ Spain Marriage Guide (2025) | Lex Atlas',
    description: "Mariage France–Espagne : actes, traductions, transcription. Kit expert + accès immédiat.",
    ogImage: '/images/kits/fra-esp-cover.jpg',
    sku: 'KIT-FRA-ESP-2025',
    price: '29.00',
    currency: 'EUR',
    url: 'https://lex-atlas.com/kits/fra-esp',
    validFrom: '2025-09-17',
    brand: 'Lex Atlas'
  },
  'fra-ita': {
    title: 'France ⇄ Italy Marriage Guide (2025) | Lex Atlas',
    description: "Se marier en Italie (Comune), traductions, reconnaissance en France. Kit complet PDF.",
    ogImage: '/images/kits/fra-ita-cover.jpg',
    sku: 'KIT-FRA-ITA-2025',
    price: '29.00',
    currency: 'EUR',
    url: 'https://lex-atlas.com/kits/fra-ita',
    validFrom: '2025-09-17',
    brand: 'Lex Atlas'
  },
  'fra-prt': {
    title: 'France ⇄ Portugal Marriage Guide (2025) | Lex Atlas',
    description: "Mariage transfrontalier France–Portugal : démarches, documents, reconnaissance. PDF facile & sécurisé.",
    ogImage: '/images/kits/fra-prt-cover.jpg',
    sku: 'KIT-FRA-PRT-2025',
    price: '29.00',
    currency: 'EUR',
    url: 'https://lex-atlas.com/kits/fra-prt',
    validFrom: '2025-09-17',
    brand: 'Lex Atlas'
  }
}

// Export the short slugs for static generation
export const KIT_SLUGS = Object.keys(KITS)

// Mapping from old long slugs to new short slugs for 301 redirects
export const SLUG_MAPPING: Record<string, string> = {
  'france-usa-marriage-guide': 'fra-usa',
  'france-uk-marriage-guide': 'fra-gbr',
  'france-canada-marriage-guide': 'fra-can',
  'france-morocco-marriage-guide': 'fra-mar',
  'france-germany-marriage-guide': 'fra-deu',
  'france-switzerland-marriage-guide': 'fra-che',
  'france-belgium-marriage-guide': 'fra-bel',
  'france-spain-marriage-guide': 'fra-esp',
  'france-italy-marriage-guide': 'fra-ita',
  'france-portugal-marriage-guide': 'fra-prt'
}

// Helper function to get the short slug from old long slug (for redirects)
export function getShortSlugFromLongSlug(longSlug: string): string | null {
  return SLUG_MAPPING[longSlug] || null
}

// Helper function to get kit data by slug (now using short slugs)
export function getKitBySlug(slug: string): Kit | null {
  return KITS[slug] || null
}

// Re-export functions from kits.client for backward compatibility
export {
  PRIORITY_SLUGS,
  ISO3_TO_2,
  ISO2_NAMES,
  slugToIso3Pair,
  iso3PairToIso2Pair,
  toCanonicalPairKey,
  expandPairTitle,
  generateFRAXXXTitle,
  slugToPairKey,
  isValidPrioritySlug
} from './kits.client'

// Re-export functions from kits-slug for backward compatibility
export {
  normalizeSlug,
  titleFromSlug
} from './kits-slug'

// Add missing functions that are needed
export const SUPPORTED_FRA_SLUGS = PRIORITY_SLUGS
export const priorityKits = PRIORITY_SLUGS.map((slug: string) => ({ slug }))

// Helper functions for PDF paths
export function getKitPdfPath(slug: string): string {
  const iso3 = slug.toUpperCase();
  const file = `${iso3}.pdf`;
  return `/kits/${file}`;
}

export function getSamplePdfPath(slug: string): string {
  return `/kits/samples/LEXATLAS-global-sample.pdf`;
}

// Helper function to convert country name or ISO2 code to ISO3 code
export function toISO3(codeOrName: string): string | null {
  const input = codeOrName.trim().toLowerCase();
  
  // Check if it's already an ISO3 code
  if (Object.keys(ISO3_TO_2).includes(input.toUpperCase())) {
    return input.toUpperCase();
  }
  
  // Check if it's an ISO2 code
  const iso2ToIso3: Record<string, string> = {};
  Object.entries(ISO3_TO_2).forEach(([iso3, iso2]) => {
    iso2ToIso3[iso2] = iso3;
  });
  
  if (iso2ToIso3[input.toUpperCase()]) {
    return iso2ToIso3[input.toUpperCase()];
  }
  
  // Check if it's a country name
  const nameToIso3: Record<string, string> = {};
  Object.entries(ISO2_NAMES).forEach(([iso2, name]) => {
    nameToIso3[name.toLowerCase()] = iso2ToIso3[iso2];
  });
  
  if (nameToIso3[input]) {
    return nameToIso3[input];
  }
  
  return null;
}

// Helper function to get canonical FRA slug
export function canonicalFraSlug(aISO3: string, bISO3: string): string | null {
  const A = aISO3?.toUpperCase();
  const B = bISO3?.toUpperCase();
  
  if (!A || !B) return null;
  
  // If one is France (FRA), put it first; otherwise return null (we only support FRA-X today)
  let left = A, right = B;
  if (A === 'FRA' && B !== 'FRA') {
    left = 'FRA';
    right = B;
  } else if (B === 'FRA' && A !== 'FRA') {
    left = 'FRA';
    right = A;
  } else {
    return null; // not a FRA-X pair (for now)
  }
  
  const slug = `${left}-${right}`.toLowerCase();
  return SUPPORTED_FRA_SLUGS.includes(slug as any) ? slug : null;
}

// Helper function to get full pair name from slug
export function getFullPairNameFromSlug(slug: string): { fullName: string; isValid: boolean } {
  const iso3Pair = slugToIso3Pair(slug);
  if (!iso3Pair) {
    // Best effort fallback for unknown slugs
    const parts = slug.toLowerCase().split('-');
    if (parts.length === 2) {
      const [first, second] = parts;
      const firstCountry = first === 'fra' ? 'France' : first.toUpperCase();
      const secondCountry = second === 'fra' ? 'France' : second.toUpperCase();
      return {
        fullName: `${firstCountry}–${secondCountry}`,
        isValid: false
      };
    }
    return {
      fullName: 'Unknown Pair',
      isValid: false
    };
  }

  // For FRA-X pairs, always show France first
  if (iso3Pair.a3 === 'FRA' || iso3Pair.b3 === 'FRA') {
    const otherCountry = iso3Pair.a3 === 'FRA' ? iso3Pair.b3 : iso3Pair.a3;
    const otherName = ISO2_NAMES[ISO3_TO_2[otherCountry]] || otherCountry;
    return {
      fullName: `France–${otherName}`,
      isValid: true
    };
  }

  // For non-FRA pairs, use alphabetical order
  const iso2Pair = iso3PairToIso2Pair(iso3Pair);
  if (!iso2Pair) {
    return {
      fullName: `${iso3Pair.a3}–${iso3Pair.b3}`,
      isValid: false
    };
  }

  const nameA = ISO2_NAMES[iso2Pair.a2] || iso2Pair.a2;
  const nameB = ISO2_NAMES[iso2Pair.b2] || iso2Pair.b2;
  
  return {
    fullName: `${nameA}–${nameB}`,
    isValid: true
  };
}