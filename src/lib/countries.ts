import { COUNTRIES, type Country } from '@/content/marriage/countries'

export { COUNTRIES, type Country }

/**
 * Check if a country code is valid
 */
export function isValidCode(code: string): boolean {
  return COUNTRIES.some(country => country.code === code.toUpperCase())
}

/**
 * Create a pair key from two country codes (alphabetical order)
 */
export function pairKey(a: string, b: string): string {
  const [first, second] = [a.toUpperCase(), b.toUpperCase()].sort()
  return `${first}-${second}`
}

/**
 * Parse a pair parameter and validate it
 */
export function parsePair(param: string): { country1: string; country2: string; pair: string } | null {
  const codes = param.toUpperCase().split('-')
  
  if (codes.length !== 2) {
    return null
  }
  
  const [code1, code2] = codes
  
  if (!isValidCode(code1) || !isValidCode(code2)) {
    return null
  }
  
  if (code1 === code2) {
    return null // Same country not allowed
  }
  
  const pair = pairKey(code1, code2)
  
  const [first, second] = [code1, code2].sort()
  
  return {
    country1: first,
    country2: second,
    pair
  }
}

/**
 * Get country name by code
 */
export function getCountryName(code: string): string | undefined {
  const country = COUNTRIES.find(c => c.code === code.toUpperCase())
  return country?.name
}

/**
 * Generate all valid country pairs for static generation
 */
export function generateAllPairs(): string[] {
  const pairs: string[] = []
  
  for (let i = 0; i < COUNTRIES.length; i++) {
    for (let j = i + 1; j < COUNTRIES.length; j++) {
      const pair = pairKey(COUNTRIES[i].code, COUNTRIES[j].code)
      pairs.push(pair)
    }
  }
  
  return pairs
}

/**
 * Get all country pairs (435 total)
 */
export const ALL_PAIRS = generateAllPairs()
