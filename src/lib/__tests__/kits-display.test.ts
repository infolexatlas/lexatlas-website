import { describe, it, expect } from 'vitest'
import { 
  iso3ToName,
  parseSlugToIso3Pair,
  orderFranceFirst,
  getDisplayPairFromSlug,
  getDisplayTitle,
  getDisplayDescription
} from '../kits.display'

describe('Kits Display Helpers', () => {
  describe('iso3ToName', () => {
    it('should convert ISO3 codes to full country names', () => {
      expect(iso3ToName('FRA')).toBe('France')
      expect(iso3ToName('USA')).toBe('United States')
      expect(iso3ToName('GBR')).toBe('United Kingdom')
      expect(iso3ToName('CAN')).toBe('Canada')
      expect(iso3ToName('DEU')).toBe('Germany')
    })

    it('should handle case insensitive input', () => {
      expect(iso3ToName('fra')).toBe('France')
      expect(iso3ToName('Usa')).toBe('United States')
    })

    it('should return original code for unknown ISO3', () => {
      expect(iso3ToName('XXX')).toBe('XXX')
      expect(iso3ToName('INVALID')).toBe('INVALID')
    })
  })

  describe('parseSlugToIso3Pair', () => {
    it('should parse valid slugs correctly', () => {
      expect(parseSlugToIso3Pair('fra-can')).toEqual({ a: 'FRA', b: 'CAN' })
      expect(parseSlugToIso3Pair('usa-gbr')).toEqual({ a: 'USA', b: 'GBR' })
      expect(parseSlugToIso3Pair('DEU-FRA')).toEqual({ a: 'DEU', b: 'FRA' })
    })

    it('should handle case insensitive input', () => {
      expect(parseSlugToIso3Pair('Fra-Can')).toEqual({ a: 'FRA', b: 'CAN' })
    })

    it('should return null for invalid slugs', () => {
      expect(parseSlugToIso3Pair('fra')).toBeNull()
      expect(parseSlugToIso3Pair('fra-can-extra')).toBeNull()
      expect(parseSlugToIso3Pair('fra-xxx')).toBeNull() // Unknown ISO3
      expect(parseSlugToIso3Pair('')).toBeNull()
    })
  })

  describe('orderFranceFirst', () => {
    it('should put France first when it is the first country', () => {
      expect(orderFranceFirst('FRA', 'CAN')).toEqual(['FRA', 'CAN'])
    })

    it('should put France first when it is the second country', () => {
      expect(orderFranceFirst('CAN', 'FRA')).toEqual(['FRA', 'CAN'])
    })

    it('should keep original order for non-France pairs', () => {
      expect(orderFranceFirst('USA', 'GBR')).toEqual(['USA', 'GBR'])
      expect(orderFranceFirst('DEU', 'ITA')).toEqual(['DEU', 'ITA'])
    })
  })

  describe('getDisplayPairFromSlug', () => {
    it('should return France first for FRA-X pairs', () => {
      expect(getDisplayPairFromSlug('fra-can')).toEqual({
        left: 'France',
        right: 'Canada'
      })
    })

    it('should return France first for X-FRA pairs', () => {
      expect(getDisplayPairFromSlug('can-fra')).toEqual({
        left: 'France',
        right: 'Canada'
      })
    })

    it('should handle other country pairs correctly', () => {
      expect(getDisplayPairFromSlug('usa-gbr')).toEqual({
        left: 'United States',
        right: 'United Kingdom'
      })
    })

    it('should return null for invalid slugs', () => {
      expect(getDisplayPairFromSlug('invalid')).toBeNull()
      expect(getDisplayPairFromSlug('fra-xxx')).toBeNull()
    })
  })

  describe('getDisplayTitle', () => {
    it('should return correct title for FRA-X pairs', () => {
      expect(getDisplayTitle('fra-can')).toBe('France – Canada Marriage Kit')
      expect(getDisplayTitle('fra-usa')).toBe('France – United States Marriage Kit')
    })

    it('should return correct title for X-FRA pairs', () => {
      expect(getDisplayTitle('can-fra')).toBe('France – Canada Marriage Kit')
      expect(getDisplayTitle('usa-fra')).toBe('France – United States Marriage Kit')
    })

    it('should return fallback for invalid slugs', () => {
      expect(getDisplayTitle('invalid')).toBe('Invalid Kit')
    })
  })

  describe('getDisplayDescription', () => {
    it('should return correct description for FRA-X pairs', () => {
      expect(getDisplayDescription('fra-can')).toBe('Complete step-by-step guide for international marriage with France – Canada')
    })

    it('should return correct description for X-FRA pairs', () => {
      expect(getDisplayDescription('can-fra')).toBe('Complete step-by-step guide for international marriage with France – Canada')
    })

    it('should return fallback for invalid slugs', () => {
      expect(getDisplayDescription('invalid')).toBe('Invalid Kit')
    })
  })

  describe('Integration tests', () => {
    it('should handle all priority slugs correctly', () => {
      const testCases = [
        { slug: 'fra-usa', expected: 'France – United States Marriage Kit' },
        { slug: 'fra-gbr', expected: 'France – United Kingdom Marriage Kit' },
        { slug: 'fra-can', expected: 'France – Canada Marriage Kit' },
        { slug: 'fra-mar', expected: 'France – Morocco Marriage Kit' },
        { slug: 'fra-deu', expected: 'France – Germany Marriage Kit' },
        { slug: 'fra-che', expected: 'France – Switzerland Marriage Kit' },
        { slug: 'fra-bel', expected: 'France – Belgium Marriage Kit' },
        { slug: 'fra-esp', expected: 'France – Spain Marriage Kit' },
        { slug: 'fra-ita', expected: 'France – Italy Marriage Kit' },
        { slug: 'fra-prt', expected: 'France – Portugal Marriage Kit' }
      ]

      testCases.forEach(({ slug, expected }) => {
        expect(getDisplayTitle(slug)).toBe(expected)
      })
    })

    it('should handle reversed slugs correctly', () => {
      const testCases = [
        { slug: 'usa-fra', expected: 'France – United States Marriage Kit' },
        { slug: 'gbr-fra', expected: 'France – United Kingdom Marriage Kit' },
        { slug: 'can-fra', expected: 'France – Canada Marriage Kit' }
      ]

      testCases.forEach(({ slug, expected }) => {
        expect(getDisplayTitle(slug)).toBe(expected)
      })
    })
  })
})
