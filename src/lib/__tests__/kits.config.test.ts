import { KITS, KIT_SLUGS, getKitBySlug, getShortSlugFromLongSlug } from '../kits.config'

describe('kits.config', () => {
  describe('KIT_SLUGS', () => {
    it('should have exactly 10 kit slugs', () => {
      expect(KIT_SLUGS).toHaveLength(10)
    })

    it('should contain all expected short slugs', () => {
      const expectedSlugs = [
        'fra-usa',
        'fra-gbr', 
        'fra-can',
        'fra-mar',
        'fra-deu',
        'fra-che',
        'fra-bel',
        'fra-esp',
        'fra-ita',
        'fra-prt'
      ]
      
      expectedSlugs.forEach(slug => {
        expect(KIT_SLUGS).toContain(slug)
      })
    })
  })

  describe('KITS', () => {
    it('should have entries for all KIT_SLUGS', () => {
      KIT_SLUGS.forEach(slug => {
        expect(KITS[slug]).toBeDefined()
      })
    })

    it('should have all required fields for each kit', () => {
      KIT_SLUGS.forEach(slug => {
        const kit = KITS[slug]
        expect(kit).toBeDefined()
        expect(kit.title).toBeDefined()
        expect(kit.description).toBeDefined()
        expect(kit.ogImage).toBeDefined()
        expect(kit.sku).toBeDefined()
        expect(kit.price).toBeDefined()
        expect(kit.currency).toBe('EUR')
        expect(kit.url).toBeDefined()
        expect(kit.validFrom).toBeDefined()
      })
    })

    it('should have correct URL format for each kit', () => {
      KIT_SLUGS.forEach(slug => {
        const kit = KITS[slug]
        expect(kit.url).toBe(`https://lex-atlas.com/kits/${slug}`)
      })
    })

    it('should have correct price format', () => {
      KIT_SLUGS.forEach(slug => {
        const kit = KITS[slug]
        expect(kit.price).toBe('29.00')
      })
    })
  })

  describe('getKitBySlug', () => {
    it('should return kit data for valid short slugs', () => {
      KIT_SLUGS.forEach(slug => {
        const kit = getKitBySlug(slug)
        expect(kit).toBeDefined()
        expect(kit?.url).toBe(`https://lex-atlas.com/kits/${slug}`)
      })
    })

    it('should return null for invalid slugs', () => {
      expect(getKitBySlug('invalid-slug')).toBeNull()
      expect(getKitBySlug('')).toBeNull()
    })
  })

  describe('getShortSlugFromLongSlug', () => {
    it('should map long slugs to short slugs correctly', () => {
      const mappings = [
        { long: 'france-usa-marriage-guide', short: 'fra-usa' },
        { long: 'france-uk-marriage-guide', short: 'fra-gbr' },
        { long: 'france-canada-marriage-guide', short: 'fra-can' },
        { long: 'france-morocco-marriage-guide', short: 'fra-mar' },
        { long: 'france-germany-marriage-guide', short: 'fra-deu' },
        { long: 'france-switzerland-marriage-guide', short: 'fra-che' },
        { long: 'france-belgium-marriage-guide', short: 'fra-bel' },
        { long: 'france-spain-marriage-guide', short: 'fra-esp' },
        { long: 'france-italy-marriage-guide', short: 'fra-ita' },
        { long: 'france-portugal-marriage-guide', short: 'fra-prt' }
      ]

      mappings.forEach(({ long, short }) => {
        expect(getShortSlugFromLongSlug(long)).toBe(short)
      })
    })

    it('should return null for invalid long slugs', () => {
      expect(getShortSlugFromLongSlug('invalid-long-slug')).toBeNull()
      expect(getShortSlugFromLongSlug('')).toBeNull()
    })
  })
})