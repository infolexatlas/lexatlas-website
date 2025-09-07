import { describe, it, expect } from 'vitest'
import { 
  getPriceForPair, 
  hasSpecificPricing, 
  getPairsWithSpecificPricing,
  DEFAULT_PRICE,
  PRICE_MAP,
  isIso2,
  toPairKeySafe,
  normalizePairSafe
} from '../pricing'

describe('Pricing System', () => {
  describe('getPriceForPair', () => {
    it('should return specific pricing for known pairs', () => {
      const frUsPrice = getPriceForPair('FR-US')
      expect(frUsPrice).toEqual({ price: 299, currency: 'USD' })
      
      const frJpPrice = getPriceForPair('FR-JP')
      expect(frJpPrice).toEqual({ price: 349, currency: 'USD' })
    })

    it('should return default price for unknown pairs', () => {
      const unknownPrice = getPriceForPair('XX-YY')
      expect(unknownPrice).toEqual(DEFAULT_PRICE)
    })

    it('should handle case-insensitive pairs', () => {
      const lowerCasePrice = getPriceForPair('fr-us')
      expect(lowerCasePrice).toEqual({ price: 299, currency: 'USD' })
    })

    it('should handle order-insensitive pairs', () => {
      const reversedPrice = getPriceForPair('us-fr')
      expect(reversedPrice).toEqual({ price: 299, currency: 'USD' })
    })

    it('should return default price for invalid pair format', () => {
      const invalidPrice = getPriceForPair('invalid')
      expect(invalidPrice).toEqual(DEFAULT_PRICE)
    })

    it('should return default price for same country pair', () => {
      const sameCountryPrice = getPriceForPair('FR-FR')
      expect(sameCountryPrice).toEqual(DEFAULT_PRICE)
    })
  })

  describe('hasSpecificPricing', () => {
    it('should return true for pairs with specific pricing', () => {
      expect(hasSpecificPricing('FR-US')).toBe(true)
      expect(hasSpecificPricing('FR-JP')).toBe(true)
    })

    it('should return false for pairs without specific pricing', () => {
      expect(hasSpecificPricing('XX-YY')).toBe(false)
      expect(hasSpecificPricing('UNKNOWN-PAIR')).toBe(false)
    })
  })

  describe('getPairsWithSpecificPricing', () => {
    it('should return all pairs with specific pricing', () => {
      const pairs = getPairsWithSpecificPricing()
      expect(pairs).toEqual(Object.keys(PRICE_MAP))
      expect(pairs).toContain('FR-US')
      expect(pairs).toContain('FR-JP')
    })

    it('should return an array of strings', () => {
      const pairs = getPairsWithSpecificPricing()
      expect(Array.isArray(pairs)).toBe(true)
      pairs.forEach(pair => {
        expect(typeof pair).toBe('string')
      })
    })
  })

  describe('DEFAULT_PRICE', () => {
    it('should have the correct structure', () => {
      expect(DEFAULT_PRICE).toHaveProperty('price')
      expect(DEFAULT_PRICE).toHaveProperty('currency')
      expect(typeof DEFAULT_PRICE.price).toBe('number')
      expect(typeof DEFAULT_PRICE.currency).toBe('string')
    })

    it('should have the expected default values', () => {
      expect(DEFAULT_PRICE.price).toBe(249)
      expect(DEFAULT_PRICE.currency).toBe('USD')
    })
  })

  describe('PRICE_MAP', () => {
    it('should contain at least 2 explicit pairs as required', () => {
      expect(Object.keys(PRICE_MAP).length).toBeGreaterThanOrEqual(2)
      expect(PRICE_MAP).toHaveProperty('FR-US')
      expect(PRICE_MAP).toHaveProperty('FR-JP')
    })

    it('should have correct structure for all entries', () => {
      Object.entries(PRICE_MAP).forEach(([pair, priceInfo]) => {
        expect(priceInfo).toHaveProperty('price')
        expect(priceInfo).toHaveProperty('currency')
        expect(typeof priceInfo.price).toBe('number')
        expect(typeof priceInfo.currency).toBe('string')
        expect(priceInfo.price).toBeGreaterThan(0)
      })
    })
  })

  describe('Utility Functions', () => {
    describe('isIso2', () => {
      it('should validate correct ISO2 codes', () => {
        expect(isIso2('FR')).toBe(true)
        expect(isIso2('US')).toBe(true)
        expect(isIso2('JP')).toBe(true)
      })

      it('should reject invalid codes', () => {
        expect(isIso2('F')).toBe(false)
        expect(isIso2('USA')).toBe(false)
        expect(isIso2('fr')).toBe(false)
        expect(isIso2('')).toBe(false)
      })
    })

    describe('toPairKeySafe', () => {
      it('should create canonical keys', () => {
        expect(toPairKeySafe('FR', 'US')).toBe('FR-US')
        expect(toPairKeySafe('US', 'FR')).toBe('FR-US')
        expect(toPairKeySafe('JP', 'FR')).toBe('FR-JP')
      })

      it('should return null for invalid codes', () => {
        expect(toPairKeySafe('F', 'US')).toBe(null)
        expect(toPairKeySafe('FR', 'USA')).toBe(null)
        expect(toPairKeySafe('', 'US')).toBe(null)
        expect(toPairKeySafe('FR', '')).toBe(null)
      })

      it('should return null for same countries', () => {
        expect(toPairKeySafe('FR', 'FR')).toBe(null)
      })
    })

    describe('normalizePairSafe', () => {
      it('should normalize pair strings', () => {
        expect(normalizePairSafe('FR-US')).toBe('FR-US')
        expect(normalizePairSafe('fr-us')).toBe('FR-US')
        expect(normalizePairSafe('US-FR')).toBe('FR-US')
        expect(normalizePairSafe('us-fr')).toBe('FR-US')
      })

      it('should return null for invalid formats', () => {
        expect(normalizePairSafe('invalid')).toBe(null)
        expect(normalizePairSafe('FR-US-JP')).toBe(null)
        expect(normalizePairSafe('FR')).toBe(null)
        expect(normalizePairSafe('')).toBe(null)
        expect(normalizePairSafe(undefined)).toBe(null)
      })
    })
  })
})
