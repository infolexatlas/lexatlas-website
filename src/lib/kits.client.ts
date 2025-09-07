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
