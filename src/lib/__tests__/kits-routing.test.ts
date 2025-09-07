import { describe, it, expect } from 'vitest'
import { 
  slugToIso3Pair, 
  iso3PairToIso2Pair, 
  toCanonicalPairKey, 
  expandPairTitle, 
  slugToPairKey,
  isValidPrioritySlug,
  PRIORITY_SLUGS,
  toISO3,
  canonicalFraSlug,
  SUPPORTED_FRA_SLUGS
} from '../kits.config'

describe('Kits Routing', () => {
  describe('slugToIso3Pair', () => {
    it('should convert valid slug to ISO3 pair', () => {
      expect(slugToIso3Pair('fra-usa')).toEqual({ a3: 'FRA', b3: 'USA' })
      expect(slugToIso3Pair('fra-gbr')).toEqual({ a3: 'FRA', b3: 'GBR' })
    })

    it('should handle case insensitive input', () => {
      expect(slugToIso3Pair('FRA-USA')).toEqual({ a3: 'FRA', b3: 'USA' })
      expect(slugToIso3Pair('Fra-Usa')).toEqual({ a3: 'FRA', b3: 'USA' })
    })

    it('should return null for invalid slugs', () => {
      expect(slugToIso3Pair('invalid')).toBeNull()
      expect(slugToIso3Pair('fra-')).toBeNull()
      expect(slugToIso3Pair('-usa')).toBeNull()
      expect(slugToIso3Pair('fra-usa-extra')).toBeNull()
      expect(slugToIso3Pair('fra-xxx')).toBeNull() // Invalid ISO3
    })
  })

  describe('iso3PairToIso2Pair', () => {
    it('should convert ISO3 pair to ISO2 pair', () => {
      expect(iso3PairToIso2Pair({ a3: 'FRA', b3: 'USA' })).toEqual({ a2: 'FR', b2: 'US' })
      expect(iso3PairToIso2Pair({ a3: 'GBR', b3: 'DEU' })).toEqual({ a2: 'GB', b2: 'DE' })
    })

    it('should return null for invalid ISO3 codes', () => {
      expect(iso3PairToIso2Pair({ a3: 'XXX', b3: 'USA' })).toBeNull()
      expect(iso3PairToIso2Pair({ a3: 'FRA', b3: 'YYY' })).toBeNull()
    })
  })

  describe('toCanonicalPairKey', () => {
    it('should create canonical pair key in alphabetical order', () => {
      expect(toCanonicalPairKey({ a2: 'FR', b2: 'US' })).toBe('FR-US')
      expect(toCanonicalPairKey({ a2: 'US', b2: 'FR' })).toBe('FR-US')
      expect(toCanonicalPairKey({ a2: 'GB', b2: 'DE' })).toBe('DE-GB')
    })
  })

  describe('expandPairTitle', () => {
    it('should expand pair key to full title', () => {
      expect(expandPairTitle('FR-US')).toBe('France – United States')
      expect(expandPairTitle('GB-DE')).toBe('United Kingdom – Germany')
    })

    it('should fallback to code for unknown countries', () => {
      expect(expandPairTitle('XX-YY')).toBe('XX – YY')
    })
  })

  describe('slugToPairKey', () => {
    it('should convert slug to canonical pair key', () => {
      expect(slugToPairKey('fra-usa')).toBe('FR-US')
      expect(slugToPairKey('fra-gbr')).toBe('FR-GB')
      expect(slugToPairKey('usa-fra')).toBe('FR-US') // Should normalize order
    })

    it('should return null for invalid slugs', () => {
      expect(slugToPairKey('invalid')).toBeNull()
      expect(slugToPairKey('fra-xxx')).toBeNull()
    })
  })

  describe('isValidPrioritySlug', () => {
    it('should validate priority slugs', () => {
      expect(isValidPrioritySlug('fra-usa')).toBe(true)
      expect(isValidPrioritySlug('fra-gbr')).toBe(true)
      expect(isValidPrioritySlug('fra-can')).toBe(true)
    })

    it('should reject non-priority slugs', () => {
      expect(isValidPrioritySlug('usa-gbr')).toBe(false)
      expect(isValidPrioritySlug('invalid')).toBe(false)
      expect(isValidPrioritySlug('')).toBe(false)
    })
  })

  describe('PRIORITY_SLUGS', () => {
    it('should contain exactly 10 slugs', () => {
      expect(PRIORITY_SLUGS).toHaveLength(10)
    })

    it('should all be valid slugs', () => {
      PRIORITY_SLUGS.forEach(slug => {
        expect(slugToPairKey(slug)).not.toBeNull()
      })
    })

    it('should all start with fra-', () => {
      PRIORITY_SLUGS.forEach(slug => {
        expect(slug).toMatch(/^fra-/)
      })
    })
  })

  describe('toISO3', () => {
    it('should convert country names to ISO3 codes', () => {
      expect(toISO3('France')).toBe('FRA')
      expect(toISO3('United States')).toBe('USA')
      expect(toISO3('United Kingdom')).toBe('GBR')
      expect(toISO3('Germany')).toBe('DEU')
    })

    it('should convert ISO2 codes to ISO3 codes', () => {
      expect(toISO3('FR')).toBe('FRA')
      expect(toISO3('US')).toBe('USA')
      expect(toISO3('GB')).toBe('GBR')
      expect(toISO3('DE')).toBe('DEU')
    })

    it('should handle case insensitive input', () => {
      expect(toISO3('france')).toBe('FRA')
      expect(toISO3('fr')).toBe('FRA')
      expect(toISO3('FRA')).toBe('FRA')
    })

    it('should return null for unknown countries', () => {
      expect(toISO3('Unknown Country')).toBeNull()
      expect(toISO3('XX')).toBeNull()
      expect(toISO3('')).toBeNull()
    })
  })

  describe('canonicalFraSlug', () => {
    it('should create FRA-X slugs when France is first', () => {
      expect(canonicalFraSlug('FRA', 'USA')).toBe('fra-usa')
      expect(canonicalFraSlug('FRA', 'GBR')).toBe('fra-gbr')
      expect(canonicalFraSlug('FRA', 'DEU')).toBe('fra-deu')
    })

    it('should create FRA-X slugs when France is second', () => {
      expect(canonicalFraSlug('USA', 'FRA')).toBe('fra-usa')
      expect(canonicalFraSlug('GBR', 'FRA')).toBe('fra-gbr')
      expect(canonicalFraSlug('DEU', 'FRA')).toBe('fra-deu')
    })

    it('should return null for non-FRA pairs', () => {
      expect(canonicalFraSlug('USA', 'GBR')).toBeNull()
      expect(canonicalFraSlug('DEU', 'ITA')).toBeNull()
      expect(canonicalFraSlug('FRA', 'FRA')).toBeNull()
    })

    it('should return null for unsupported FRA-X pairs', () => {
      expect(canonicalFraSlug('FRA', 'XXX')).toBeNull()
      expect(canonicalFraSlug('FRA', 'JPN')).toBeNull()
    })

    it('should handle case insensitive input', () => {
      expect(canonicalFraSlug('fra', 'usa')).toBe('fra-usa')
      expect(canonicalFraSlug('USA', 'fra')).toBe('fra-usa')
    })
  })

  describe('SUPPORTED_FRA_SLUGS', () => {
    it('should contain exactly 10 supported FRA-X slugs', () => {
      expect(SUPPORTED_FRA_SLUGS).toHaveLength(10)
    })

    it('should all be valid FRA-X slugs', () => {
      SUPPORTED_FRA_SLUGS.forEach(slug => {
        expect(slug).toMatch(/^fra-/)
        expect(canonicalFraSlug('FRA', slug.substring(4).toUpperCase())).toBe(slug)
      })
    })

    it('should match PRIORITY_SLUGS', () => {
      expect(SUPPORTED_FRA_SLUGS).toEqual(PRIORITY_SLUGS)
    })
  })
})
