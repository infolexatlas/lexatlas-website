import { describe, it, expect } from 'vitest'
import { 
  DEFAULT_EUR, 
  PRICE_BUNDLE_3, 
  PRICE_BUNDLE_10, 
  getSinglePriceForPair,
  toPairKeySafe,
  normalizePairSafe,
  isIso2
} from '../pricing'

describe('EUR Pricing', () => {
  describe('Price constants', () => {
    it('should have correct EUR prices in cents', () => {
      expect(DEFAULT_EUR.price).toBe(2900) // 29.00 EUR
      expect(DEFAULT_EUR.currency).toBe('EUR')
      
      expect(PRICE_BUNDLE_3.price).toBe(7500) // 75.00 EUR
      expect(PRICE_BUNDLE_3.currency).toBe('EUR')
      
      expect(PRICE_BUNDLE_10.price).toBe(20000) // 200.00 EUR
      expect(PRICE_BUNDLE_10.currency).toBe('EUR')
    })

    it('should have reasonable price relationships', () => {
      // Bundle 3 should be cheaper than 3 singles
      expect(PRICE_BUNDLE_3.price).toBeLessThan(DEFAULT_EUR.price * 3)
      
      // Bundle 10 should be cheaper than 10 singles
      expect(PRICE_BUNDLE_10.price).toBeLessThan(DEFAULT_EUR.price * 10)
      
      // Bundle 10 should be more expensive than bundle 3
      expect(PRICE_BUNDLE_10.price).toBeGreaterThan(PRICE_BUNDLE_3.price)
    })
  })

  describe('getSinglePriceForPair', () => {
    it('should return default EUR price for any pair', () => {
      expect(getSinglePriceForPair('FR-US')).toEqual({
        price: 2900,
        currency: 'EUR',
        isDefault: true
      })
      
      expect(getSinglePriceForPair('GB-DE')).toEqual({
        price: 2900,
        currency: 'EUR',
        isDefault: true
      })
    })

    it('should handle edge cases safely', () => {
      expect(getSinglePriceForPair('')).toEqual({
        price: 2900,
        currency: 'EUR',
        isDefault: true
      })
      
      expect(getSinglePriceForPair('INVALID')).toEqual({
        price: 2900,
        currency: 'EUR',
        isDefault: true
      })
    })
  })

  describe('ISO validation', () => {
    it('should validate ISO2 codes correctly', () => {
      expect(isIso2('FR')).toBe(true)
      expect(isIso2('US')).toBe(true)
      expect(isIso2('GB')).toBe(true)
      expect(isIso2('DE')).toBe(true)
      
      expect(isIso2('FRA')).toBe(false) // Too long
      expect(isIso2('F')).toBe(false)   // Too short
      expect(isIso2('12')).toBe(false)  // Numbers
      expect(isIso2('fr')).toBe(false)  // Lowercase
      expect(isIso2('')).toBe(false)    // Empty
    })

    it('should create safe pair keys', () => {
      expect(toPairKeySafe('FR', 'US')).toBe('FR-US')
      expect(toPairKeySafe('US', 'FR')).toBe('FR-US') // Should sort
      expect(toPairKeySafe('GB', 'DE')).toBe('DE-GB') // Should sort
      
      expect(toPairKeySafe('FR', 'FR')).toBeNull() // Same country
      expect(toPairKeySafe('FR', '')).toBeNull()   // Invalid
      expect(toPairKeySafe('', 'US')).toBeNull()   // Invalid
      expect(toPairKeySafe('FRA', 'US')).toBeNull() // Invalid ISO2
    })

    it('should normalize pairs safely', () => {
      expect(normalizePairSafe('FR-US')).toBe('FR-US')
      expect(normalizePairSafe('fr-us')).toBe('FR-US') // Case insensitive
      expect(normalizePairSafe('US-FR')).toBe('FR-US') // Should sort
      
      expect(normalizePairSafe('')).toBeNull()           // Empty
      expect(normalizePairSafe('FR')).toBeNull()         // Single part
      expect(normalizePairSafe('FR-US-EXTRA')).toBeNull() // Too many parts
      expect(normalizePairSafe('FR-FR')).toBeNull()      // Same country
    })
  })

  describe('Price calculations', () => {
    it('should calculate savings correctly', () => {
      const singlePrice = DEFAULT_EUR.price
      const bundle3Price = PRICE_BUNDLE_3.price
      const bundle10Price = PRICE_BUNDLE_10.price
      
      // Bundle 3 savings
      const bundle3Savings = ((singlePrice * 3 - bundle3Price) / (singlePrice * 3)) * 100
      expect(bundle3Savings).toBeGreaterThan(0)
      expect(bundle3Savings).toBeLessThan(100)
      
      // Bundle 10 savings
      const bundle10Savings = ((singlePrice * 10 - bundle10Price) / (singlePrice * 10)) * 100
      expect(bundle10Savings).toBeGreaterThan(0)
      expect(bundle10Savings).toBeLessThan(100)
      
      // Bundle 10 should have better savings than bundle 3
      expect(bundle10Savings).toBeGreaterThan(bundle3Savings)
    })
  })
})
