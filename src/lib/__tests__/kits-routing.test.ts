import { describe, it, expect } from 'vitest'
import { 
  slugToIso3Pair, 
  iso3PairToIso2Pair, 
  toCanonicalPairKey, 
  expandPairTitle, 
  slugToPairKey,
  isValidPrioritySlug,
  PRIORITY_SLUGS 
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
})
