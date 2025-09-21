import { describe, it, expect } from 'vitest'
import { KITS, KIT_SLUGS } from '../src/lib/kits.config'

describe('Kits Configuration', () => {
  it('should have exactly 10 kit slugs', () => {
    expect(KIT_SLUGS).toHaveLength(10)
  })

  it('should have all required short slugs', () => {
    const expectedSlugs = [
      'fra-usa', 'fra-gbr', 'fra-can', 'fra-mar', 'fra-deu',
      'fra-che', 'fra-bel', 'fra-esp', 'fra-ita', 'fra-prt'
    ]
    
    for (const slug of expectedSlugs) {
      expect(KIT_SLUGS).toContain(slug)
    }
  })

  it('should have valid kit data for all slugs', () => {
    for (const slug of KIT_SLUGS) {
      const kit = KITS[slug]
      expect(kit).toBeDefined()
      
      // Required fields
      expect(kit.title).toBeTruthy()
      expect(kit.description).toBeTruthy()
      expect(kit.ogImage).toBeTruthy()
      expect(kit.sku).toBeTruthy()
      expect(kit.price).toBeTruthy()
      expect(kit.currency).toBe('EUR')
      expect(kit.url).toBeTruthy()
      expect(kit.validFrom).toBeTruthy()
      expect(kit.brand).toBe('Lex Atlas')
      
      // Validation rules
      expect(kit.title.length).toBeLessThanOrEqual(60)
      expect(kit.description.length).toBeLessThanOrEqual(155)
      expect(kit.url).toMatch(/^https:\/\/lex-atlas\.com\/kits\/[a-z-]+$/)
      expect(kit.price).toMatch(/^\d+\.\d{2}$/)
      expect(kit.validFrom).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
  })

  it('should have unique SKUs', () => {
    const skus = KIT_SLUGS.map(slug => KITS[slug].sku)
    const uniqueSkus = new Set(skus)
    expect(uniqueSkus.size).toBe(skus.length)
  })

  it('should have consistent pricing', () => {
    for (const slug of KIT_SLUGS) {
      expect(KITS[slug].price).toBe('29.00')
    }
  })
})
