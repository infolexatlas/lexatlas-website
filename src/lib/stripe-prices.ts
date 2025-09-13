// Stripe price ID mapping for kit slugs
export const KIT_TO_PRICE_MAP: Record<string, string> = {
  'fra-usa': 'STRIPE_PRICE_FRA_USA',
  'fra-can': 'STRIPE_PRICE_FRA_CAN', 
  'fra-gbr': 'STRIPE_PRICE_FRA_GBR',
  'fra-deu': 'STRIPE_PRICE_FRA_DEU',
  'fra-esp': 'STRIPE_PRICE_FRA_ESP',
  'fra-ita': 'STRIPE_PRICE_FRA_ITA',
  'fra-prt': 'STRIPE_PRICE_FRA_PRT',
  'fra-che': 'STRIPE_PRICE_FRA_CHE',
  'fra-bel': 'STRIPE_PRICE_FRA_BEL',
  'fra-aus': 'STRIPE_PRICE_FRA_AUS',
} as const;

/**
 * Get the Stripe price ID for a given kit slug
 * @param kitSlug - The kit slug (e.g., 'fra-usa')
 * @returns The environment variable name for the price ID
 */
export function getPriceIdEnvVar(kitSlug: string): string | null {
  return KIT_TO_PRICE_MAP[kitSlug] || null;
}

/**
 * Get the actual Stripe price ID value from environment
 * @param kitSlug - The kit slug (e.g., 'fra-usa')
 * @returns The actual price ID value or null if not configured
 */
export function getStripePriceId(kitSlug: string): string | null {
  const envVar = getPriceIdEnvVar(kitSlug);
  if (!envVar) return null;
  
  return process.env[envVar] || null;
}

/**
 * Check if a kit has a configured price ID
 * @param kitSlug - The kit slug
 * @returns true if price ID is configured
 */
export function hasConfiguredPrice(kitSlug: string): boolean {
  return !!getStripePriceId(kitSlug);
}
