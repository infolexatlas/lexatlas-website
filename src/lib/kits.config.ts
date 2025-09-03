export const PRIORITY_SLUGS = [
  'fra-usa','fra-gbr','fra-can','fra-mar','fra-deu',
  'fra-che','fra-bel','fra-esp','fra-ita','fra-prt'
] as const;

export const ISO3_TO_2: Record<string,string> = {
  FRA:'FR', USA:'US', GBR:'GB', CAN:'CA', MAR:'MA', DEU:'DE', CHE:'CH',
  BEL:'BE', ESP:'ES', ITA:'IT', PRT:'PT'
};

export const ISO2_NAMES: Record<string,string> = {
  FR:'France', US:'United States', GB:'United Kingdom', CA:'Canada', MA:'Morocco',
  DE:'Germany', CH:'Switzerland', BE:'Belgium', ES:'Spain', IT:'Italy', PT:'Portugal'
};

// Supported FRA-X slugs (our current catalog)
export const SUPPORTED_FRA_SLUGS = [
  'fra-usa','fra-gbr','fra-can','fra-mar','fra-deu','fra-che','fra-bel','fra-esp','fra-ita','fra-prt'
] as const;

// Priority kits for sitemap generation
export const priorityKits = PRIORITY_SLUGS.map(slug => ({ slug }));

/**
 * Convert a slug like 'fra-usa' to ISO3 pair {a3: 'FRA', b3: 'USA'}
 */
export function slugToIso3Pair(slug: string): {a3: string, b3: string} | null {
  const parts = slug.toLowerCase().split('-');
  if (parts.length !== 2) return null;
  
  const [a3, b3] = parts.map(part => part.toUpperCase());
  
  // Validate that both parts are valid ISO3 codes
  if (!Object.keys(ISO3_TO_2).includes(a3) || !Object.keys(ISO3_TO_2).includes(b3)) {
    return null;
  }
  
  return { a3, b3 };
}

/**
 * Convert ISO3 pair to ISO2 pair
 */
export function iso3PairToIso2Pair({a3, b3}: {a3: string, b3: string}): {a2: string, b2: string} | null {
  const a2 = ISO3_TO_2[a3];
  const b2 = ISO3_TO_2[b3];
  
  if (!a2 || !b2) return null;
  
  return { a2, b2 };
}

/**
 * Convert ISO2 pair to canonical pair key (sorted ascending)
 */
export function toCanonicalPairKey({a2, b2}: {a2: string, b2: string}): string {
  const [first, second] = [a2, b2].sort();
  return `${first}-${second}`;
}

/**
 * Expand pair key to full title
 */
export function expandPairTitle(pairKey: string): string {
  const [a2, b2] = pairKey.split('-');
  const nameA = ISO2_NAMES[a2] || a2;
  const nameB = ISO2_NAMES[b2] || b2;
  return `${nameA} – ${nameB}`;
}

/**
 * Generate FRA-XXX format title from slug
 * Always shows FRA first, then the other country's ISO3 code
 */
export function generateFRAXXXTitle(slug: string): string {
  const iso3Pair = slugToIso3Pair(slug);
  if (!iso3Pair) return 'Invalid Kit';
  
  // For FRA-XXX kits, always show FRA first
  if (iso3Pair.a3 === 'FRA') {
    return `FRA – ${iso3Pair.b3}`;
  } else if (iso3Pair.b3 === 'FRA') {
    return `FRA – ${iso3Pair.a3}`;
  }
  
  // Fallback for non-FRA kits
  return `${iso3Pair.a3} – ${iso3Pair.b3}`;
}

/**
 * Convert slug to canonical pair key
 */
export function slugToPairKey(slug: string): string | null {
  const iso3Pair = slugToIso3Pair(slug);
  if (!iso3Pair) return null;
  
  const iso2Pair = iso3PairToIso2Pair(iso3Pair);
  if (!iso2Pair) return null;
  
  return toCanonicalPairKey(iso2Pair);
}

/**
 * Validate if a slug is in our priority list
 */
export function isValidPrioritySlug(slug: string): boolean {
  return PRIORITY_SLUGS.includes(slug as any);
}

/**
 * Get the production PDF path for a given slug
 */
export function getKitPdfPath(slug: string): string {
  // slug like "fra-usa"
  const iso3 = slug.toUpperCase();
  const file = `${iso3}.pdf`; // FRA-USA.pdf
  return `/kits/${file}`;
}

/**
 * Get the universal sample PDF path
 * Always returns the global sample for consistency
 */
export function getSamplePdfPath(slug: string): string {
  return `/kits/samples/LEXATLAS-global-sample.pdf`;
}

/**
 * Convert country name or ISO2 code to ISO3 code
 */
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

/**
 * Given two ISO3 codes, return canonical FRA-X slug if supported, else null
 */
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

/**
 * Get full pair name from slug with France-first ordering for FRA-X pairs
 * Returns France–United States format, France first where applicable
 */
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
