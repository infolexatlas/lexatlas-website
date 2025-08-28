import { describe, it, expect } from 'vitest'
import { 
  COUNTRIES, 
  isValidCode, 
  pairKey, 
  parsePair, 
  getCountryName,
  generateAllPairs,
  ALL_PAIRS 
} from '../countries'

describe('countries', () => {
  describe('COUNTRIES', () => {
    it('should have 30 countries', () => {
      expect(COUNTRIES).toHaveLength(30)
    })

    it('should have valid country objects', () => {
      COUNTRIES.forEach(country => {
        expect(country).toHaveProperty('code')
        expect(country).toHaveProperty('name')
        expect(typeof country.code).toBe('string')
        expect(typeof country.name).toBe('string')
        expect(country.code).toHaveLength(2)
        expect(country.code).toBe(country.code.toUpperCase())
      })
    })

    it('should have unique country codes', () => {
      const codes = COUNTRIES.map(c => c.code)
      const uniqueCodes = new Set(codes)
      expect(uniqueCodes.size).toBe(codes.length)
    })
  })

  describe('isValidCode', () => {
    it('should return true for valid country codes', () => {
      expect(isValidCode('US')).toBe(true)
      expect(isValidCode('FR')).toBe(true)
      expect(isValidCode('DE')).toBe(true)
    })

    it('should return false for invalid country codes', () => {
      expect(isValidCode('XX')).toBe(false)
      expect(isValidCode('ABC')).toBe(false)
      expect(isValidCode('')).toBe(false)
    })

    it('should be case insensitive', () => {
      expect(isValidCode('us')).toBe(true)
      expect(isValidCode('Us')).toBe(true)
      expect(isValidCode('US')).toBe(true)
    })
  })

  describe('pairKey', () => {
    it('should create pair keys in alphabetical order', () => {
      expect(pairKey('US', 'FR')).toBe('FR-US')
      expect(pairKey('FR', 'US')).toBe('FR-US')
      expect(pairKey('DE', 'FR')).toBe('DE-FR')
      expect(pairKey('FR', 'DE')).toBe('DE-FR')
    })

    it('should handle case insensitive input', () => {
      expect(pairKey('us', 'fr')).toBe('FR-US')
      expect(pairKey('FR', 'us')).toBe('FR-US')
    })

    it('should handle uppercase output', () => {
      expect(pairKey('us', 'fr')).toBe('FR-US')
      expect(pairKey('de', 'fr')).toBe('DE-FR')
    })
  })

  describe('parsePair', () => {
    it('should parse valid country pairs', () => {
      const result = parsePair('FR-US')
      expect(result).toEqual({
        country1: 'FR',
        country2: 'US',
        pair: 'FR-US'
      })
    })

    it('should handle case insensitive input', () => {
      const result = parsePair('fr-us')
      expect(result).toEqual({
        country1: 'FR',
        country2: 'US',
        pair: 'FR-US'
      })
    })

    it('should return null for invalid pairs', () => {
      expect(parsePair('FR-XX')).toBeNull()
      expect(parsePair('XX-US')).toBeNull()
      expect(parsePair('FR')).toBeNull()
      expect(parsePair('FR-US-XX')).toBeNull()
      expect(parsePair('')).toBeNull()
    })

    it('should return null for same country pairs', () => {
      expect(parsePair('FR-FR')).toBeNull()
      expect(parsePair('US-US')).toBeNull()
    })

    it('should ensure alphabetical order', () => {
      const result = parsePair('US-FR')
      expect(result).toEqual({
        country1: 'FR',
        country2: 'US',
        pair: 'FR-US'
      })
    })
  })

  describe('getCountryName', () => {
    it('should return country name for valid codes', () => {
      expect(getCountryName('US')).toBe('United States')
      expect(getCountryName('FR')).toBe('France')
      expect(getCountryName('DE')).toBe('Germany')
    })

    it('should be case insensitive', () => {
      expect(getCountryName('us')).toBe('United States')
      expect(getCountryName('Us')).toBe('United States')
    })

    it('should return undefined for invalid codes', () => {
      expect(getCountryName('XX')).toBeUndefined()
      expect(getCountryName('')).toBeUndefined()
    })
  })

  describe('generateAllPairs', () => {
    it('should generate all unique country pairs', () => {
      const pairs = generateAllPairs()
      expect(pairs).toHaveLength(435) // 30 choose 2 = 435
    })

    it('should generate pairs in alphabetical order', () => {
      const pairs = generateAllPairs()
      pairs.forEach(pair => {
        const [country1, country2] = pair.split('-')
        expect(country1 < country2).toBe(true)
      })
    })

    it('should not include same country pairs', () => {
      const pairs = generateAllPairs()
      pairs.forEach(pair => {
        const [country1, country2] = pair.split('-')
        expect(country1).not.toBe(country2)
      })
    })

    it('should include all valid country combinations', () => {
      const pairs = generateAllPairs()
      expect(pairs).toContain('FR-US')
      expect(pairs).toContain('DE-US')
      expect(pairs).toContain('FR-DE')
    })
  })

  describe('ALL_PAIRS', () => {
    it('should be the same as generateAllPairs()', () => {
      expect(ALL_PAIRS).toEqual(generateAllPairs())
    })

    it('should have 435 pairs', () => {
      expect(ALL_PAIRS).toHaveLength(435)
    })
  })
})
