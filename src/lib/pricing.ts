// src/lib/pricing.ts
export type PriceInfo = { price: number; currency: string; isDefault?: boolean };

// EUR pricing in cents
export const DEFAULT_EUR = { price: 29_00, currency: "EUR" };
export const PRICE_BUNDLE_3 = { price: 75_00, currency: "EUR" };
export const PRICE_BUNDLE_10 = { price: 200_00, currency: "EUR" };

// Legacy USD pricing (keeping for backward compatibility)
export const DEFAULT_PRICE: PriceInfo = { price: 249, currency: "USD" };

/**
 * Keep keys UPPERCASE and sorted alphabetically as AA-BB.
 * Add/override specific pair pricing here.
 */
export const PRICE_MAP: Record<string, PriceInfo> = {
  "FR-US": { price: 299, currency: "USD" },
  "FR-JP": { price: 349, currency: "USD" }, // ← aligns with test expectation
  // add more overrides as needed…
};

/** Validate a 2-letter ISO2 code */
export function isIso2(code: string): boolean {
  return /^[A-Z]{2}$/.test(code);
}

/**
 * Build canonical key "AA-BB" (UPPERCASE, alphabetical).
 * SAFE version: never throws; returns null if invalid or same-country.
 */
export function toPairKeySafe(a?: string, b?: string): string | null {
  if (!a || !b) return null;
  const A = a.toUpperCase();
  const B = b.toUpperCase();
  if (!isIso2(A) || !isIso2(B)) return null;
  if (A === B) return null;
  const [x, y] = [A, B].sort();
  return `${x}-${y}`;
}

/**
 * Normalize an input like "aa-bb" or "AA-BB" to canonical "AA-BB".
 * SAFE version: never throws; returns null if invalid.
 */
export function normalizePairSafe(pair?: string): string | null {
  if (!pair) return null;
  const parts = pair.split("-");
  if (parts.length !== 2) return null;
  return toPairKeySafe(parts[0], parts[1]);
}

/** True if we have specific pricing for pair (case/order insensitive, safe) */
export function hasSpecificPricing(pair: string): boolean {
  const key = normalizePairSafe(pair);
  if (!key) return false; // ← do not throw, test expects false
  return Object.prototype.hasOwnProperty.call(PRICE_MAP, key);
}

/** Get price for pair (case/order insensitive), with DEFAULT fallback (safe) */
export function getPriceForPair(pair: string): PriceInfo {
  const key = normalizePairSafe(pair);
  if (!key) return DEFAULT_PRICE; // ← invalid → default
  return PRICE_MAP[key] ?? DEFAULT_PRICE;
}

/**
 * Get single kit price for a pair (EUR pricing)
 * Optionally allow pair-specific overrides later; for now all singles = 29 €
 */
export function getSinglePriceForPair(_pairKey: string): PriceInfo {
  return { ...DEFAULT_EUR, isDefault: true };
}

/** Utility for admin/debug: list all specifically priced pairs */
export function getPairsWithSpecificPricing(): string[] {
  return Object.keys(PRICE_MAP);
}
