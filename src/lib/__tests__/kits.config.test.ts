import { KITS, SLUG_MAPPING, getLegacySlug, getKitBySlug } from '../kits.config'

describe('kits.config', () => {
  describe('KITS configuration', () => {
    it('should have exactly 10 kit entries', () => {
      expect(Object.keys(KITS)).toHaveLength(10)
    })

    it('should have all required kit slugs', () => {
      const expectedSlugs = [
        'france-usa-marriage-guide',
        'france-uk-marriage-guide',
        'france-canada-marriage-guide',
        'france-morocco-marriage-guide',
        'france-germany-marriage-guide',
        'france-switzerland-marriage-guide',
        'france-belgium-marriage-guide',
        'france-spain-marriage-guide',
        'france-italy-marriage-guide',
        'france-portugal-marriage-guide'
      ]
      
      expectedSlugs.forEach(slug => {
        expect(KITS[slug]).toBeDefined()
      })
    })

    it('should have all required fields for each kit', () => {
      Object.entries(KITS).forEach(([slug, kit]) => {
        expect(kit.title).toBeDefined()
        expect(kit.description).toBeDefined()
        expect(kit.ogImage).toBeDefined()
        expect(kit.sku).toBeDefined()
        expect(kit.price).toBeDefined()
        expect(kit.currency).toBe('EUR')
        expect(kit.url).toBeDefined()
        expect(kit.validFrom).toBeDefined()

        // Validate specific field formats
        expect(kit.title).toContain('Marriage Guide (2025) | LexAtlas')
        expect(kit.description.length).toBeGreaterThan(50)
        expect(kit.ogImage).toMatch(/^\/images\/kits\/fra-\w+-cover\.jpg$/)
        expect(kit.sku).toMatch(/^KIT-FRA-\w{3}-2025$/)
        expect(kit.price).toBe('29.00')
        expect(kit.url).toMatch(/^https:\/\/lex-atlas\.com\/kits\/france-\w+-marriage-guide$/)
        expect(kit.validFrom).toBe('2025-09-17')
      })
    })

    it('should have unique SKUs for each kit', () => {
      const skus = Object.values(KITS).map(kit => kit.sku)
      const uniqueSkus = new Set(skus)
      expect(uniqueSkus.size).toBe(skus.length)
    })

    it('should have unique URLs for each kit', () => {
      const urls = Object.values(KITS).map(kit => kit.url)
      const uniqueUrls = new Set(urls)
      expect(uniqueUrls.size).toBe(urls.length)
    })
  })

  describe('SLUG_MAPPING', () => {
    it('should have exactly 10 mapping entries', () => {
      expect(Object.keys(SLUG_MAPPING)).toHaveLength(10)
    })

    it('should map all descriptive slugs to legacy slugs', () => {
      const expectedMappings = {
        'france-usa-marriage-guide': 'fra-usa',
        'france-uk-marriage-guide': 'fra-gbr',
        'france-canada-marriage-guide': 'fra-can',
        'france-morocco-marriage-guide': 'fra-mar',
        'france-germany-marriage-guide': 'fra-deu',
        'france-switzerland-marriage-guide': 'fra-che',
        'france-belgium-marriage-guide': 'fra-bel',
        'france-spain-marriage-guide': 'fra-esp',
        'france-italy-marriage-guide': 'fra-ita',
        'france-portugal-marriage-guide': 'fra-prt'
      }

      Object.entries(expectedMappings).forEach(([descriptive, legacy]) => {
        expect(SLUG_MAPPING[descriptive]).toBe(legacy)
      })
    })
  })

  describe('getLegacySlug', () => {
    it('should return correct legacy slug for valid descriptive slug', () => {
      expect(getLegacySlug('france-usa-marriage-guide')).toBe('fra-usa')
      expect(getLegacySlug('france-italy-marriage-guide')).toBe('fra-ita')
    })

    it('should return null for invalid slug', () => {
      expect(getLegacySlug('invalid-slug')).toBeNull()
      expect(getLegacySlug('')).toBeNull()
    })
  })

  describe('getKitBySlug', () => {
    it('should return correct kit data for valid slug', () => {
      const kit = getKitBySlug('france-usa-marriage-guide')
      expect(kit).toBeDefined()
      expect(kit?.title).toContain('United States')
      expect(kit?.sku).toBe('KIT-FRA-USA-2025')
    })

    it('should return null for invalid slug', () => {
      expect(getKitBySlug('invalid-slug')).toBeNull()
      expect(getKitBySlug('')).toBeNull()
    })
  })

  describe('Data consistency', () => {
    it('should have consistent mapping between KITS and SLUG_MAPPING', () => {
      Object.keys(KITS).forEach(descriptiveSlug => {
        expect(SLUG_MAPPING[descriptiveSlug]).toBeDefined()
      })
    })

    it('should have consistent URLs in KITS matching the descriptive slugs', () => {
      Object.entries(KITS).forEach(([slug, kit]) => {
        expect(kit.url).toContain(slug)
      })
    })
  })
})
