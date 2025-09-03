// ISO3 to full English country name mapping
const ISO3_TO_NAME: Record<string, string> = {
  FRA: 'France',
  USA: 'United States',
  GBR: 'United Kingdom',
  CAN: 'Canada',
  MAR: 'Morocco',
  DEU: 'Germany',
  CHE: 'Switzerland',
  BEL: 'Belgium',
  ESP: 'Spain',
  ITA: 'Italy',
  PRT: 'Portugal'
}

/**
 * Convert ISO3 code to full English country name
 */
export function iso3ToName(iso3: string): string {
  return ISO3_TO_NAME[iso3.toUpperCase()] || iso3
}

/**
 * Parse slug to ISO3 pair
 * Example: 'fra-can' → { a: 'FRA', b: 'CAN' }
 */
export function parseSlugToIso3Pair(slug: string): { a: string; b: string } | null {
  const parts = slug.toLowerCase().split('-')
  if (parts.length !== 2) return null
  
  const [a, b] = parts.map(part => part.toUpperCase())
  
  // Validate that both parts are valid ISO3 codes
  if (!Object.keys(ISO3_TO_NAME).includes(a) || !Object.keys(ISO3_TO_NAME).includes(b)) {
    return null
  }
  
  return { a, b }
}

/**
 * Order France first in a pair
 * If either country is France, put France first
 * Otherwise leave the pair as-is
 */
export function orderFranceFirst(a: string, b: string): [string, string] {
  if (a === 'FRA') {
    return [a, b]
  } else if (b === 'FRA') {
    return [b, a]
  }
  // For non-FRA pairs, keep original order
  return [a, b]
}

/**
 * Get display pair from slug with full country names
 * Always puts France first if present
 */
export function getDisplayPairFromSlug(slug: string): { left: string; right: string } | null {
  const iso3Pair = parseSlugToIso3Pair(slug)
  if (!iso3Pair) return null
  
  const [first, second] = orderFranceFirst(iso3Pair.a, iso3Pair.b)
  
  return {
    left: iso3ToName(first),
    right: iso3ToName(second)
  }
}

/**
 * Get display title for a kit
 * Returns "France – Canada Marriage Kit" format
 */
export function getDisplayTitle(slug: string): string {
  const displayPair = getDisplayPairFromSlug(slug)
  if (!displayPair) return 'Invalid Kit'
  
  return `${displayPair.left} – ${displayPair.right} Marriage Kit`
}

/**
 * Get display subtitle/description for a kit
 * Returns "Complete step-by-step guide for international marriage with France – Canada"
 */
export function getDisplayDescription(slug: string): string {
  const displayPair = getDisplayPairFromSlug(slug)
  if (!displayPair) return 'Invalid Kit'
  
  return `Complete step-by-step guide for international marriage with ${displayPair.left} – ${displayPair.right}`
}

/**
 * Get display pair for metadata (SEO)
 * Returns the same as getDisplayPairFromSlug but with fallback
 */
export function getDisplayPairForMetadata(slug: string): { left: string; right: string } {
  return getDisplayPairFromSlug(slug) || { left: 'Invalid', right: 'Kit' }
}
