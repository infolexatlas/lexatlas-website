import { 
  COUNTRIES, 
  COUNTRY_PAIRS, 
  generateCountryPairs, 
  parseCountryPair, 
  validateCountryPair,
  getPairFileName 
} from '../countries'

describe('Country Pairs', () => {
  describe('generateCountryPairs', () => {
    it('generates correct number of pairs', () => {
      const pairs = generateCountryPairs()
      const expectedPairs = (COUNTRIES.length * (COUNTRIES.length - 1)) / 2
      expect(pairs).toHaveLength(expectedPairs)
    })

    it('generates 435 pairs for 30 countries', () => {
      expect(COUNTRY_PAIRS).toHaveLength(435)
    })

    it('ensures alphabetical order in pair codes', () => {
      const pairs = generateCountryPairs()
      pairs.forEach(pair => {
        const [first, second] = pair.pairCode.split('-')
        expect(first.localeCompare(second)).toBeLessThan(0)
      })
    })

    it('does not include same country pairs', () => {
      const pairs = generateCountryPairs()
      pairs.forEach(pair => {
        expect(pair.country1.code).not.toBe(pair.country2.code)
      })
    })
  })

  describe('parseCountryPair', () => {
    it('parses valid country pair codes', () => {
      const pair = parseCountryPair('FR-US')
      expect(pair).toBeDefined()
      expect(pair?.country1.code).toBe('FR')
      expect(pair?.country2.code).toBe('US')
      expect(pair?.pairCode).toBe('FR-US')
    })

    it('handles case insensitive input', () => {
      const pair = parseCountryPair('fr-us')
      expect(pair).toBeDefined()
      expect(pair?.country1.code).toBe('FR')
      expect(pair?.country2.code).toBe('US')
    })

    it('ensures alphabetical order regardless of input order', () => {
      const pair1 = parseCountryPair('US-FR')
      const pair2 = parseCountryPair('FR-US')
      expect(pair1?.pairCode).toBe('FR-US')
      expect(pair2?.pairCode).toBe('FR-US')
    })

    it('returns null for invalid country codes', () => {
      const pair = parseCountryPair('XX-YY')
      expect(pair).toBeNull()
    })

    it('returns null for malformed pair codes', () => {
      expect(parseCountryPair('FR')).toBeNull()
      expect(parseCountryPair('FR-US-UK')).toBeNull()
      expect(parseCountryPair('')).toBeNull()
    })

    it('returns null for same country pairs', () => {
      const pair = parseCountryPair('FR-FR')
      expect(pair).toBeNull()
    })
  })

  describe('validateCountryPair', () => {
    it('validates correct country pairs', () => {
      expect(validateCountryPair('FR', 'US')).toBe(true)
      expect(validateCountryPair('US', 'FR')).toBe(true)
    })

    it('rejects same country pairs', () => {
      expect(validateCountryPair('FR', 'FR')).toBe(false)
      expect(validateCountryPair('US', 'US')).toBe(false)
    })

    it('rejects invalid country codes', () => {
      expect(validateCountryPair('XX', 'US')).toBe(false)
      expect(validateCountryPair('FR', 'YY')).toBe(false)
      expect(validateCountryPair('XX', 'YY')).toBe(false)
    })

    it('handles case insensitive input', () => {
      expect(validateCountryPair('fr', 'us')).toBe(true)
      expect(validateCountryPair('FR', 'us')).toBe(true)
    })
  })

  describe('getPairFileName', () => {
    it('generates correct file names', () => {
      expect(getPairFileName('FR', 'US')).toBe('FR-US')
      expect(getPairFileName('US', 'FR')).toBe('FR-US')
    })

    it('handles case insensitive input', () => {
      expect(getPairFileName('fr', 'us')).toBe('FR-US')
      expect(getPairFileName('FR', 'us')).toBe('FR-US')
    })

    it('ensures alphabetical order', () => {
      expect(getPairFileName('Z', 'A')).toBe('A-Z')
      expect(getPairFileName('A', 'Z')).toBe('A-Z')
    })
  })

  describe('COUNTRY_PAIRS constant', () => {
    it('contains all expected pairs', () => {
      // Check a few specific pairs
      const frUsPair = COUNTRY_PAIRS.find(p => p.pairCode === 'FR-US')
      const deUsPair = COUNTRY_PAIRS.find(p => p.pairCode === 'DE-US')
      
      expect(frUsPair).toBeDefined()
      expect(deUsPair).toBeDefined()
      expect(frUsPair?.country1.code).toBe('FR')
      expect(frUsPair?.country2.code).toBe('US')
    })

    it('has no duplicates', () => {
      const pairCodes = COUNTRY_PAIRS.map(p => p.pairCode)
      const uniqueCodes = new Set(pairCodes)
      expect(pairCodes.length).toBe(uniqueCodes.size)
    })

    it('has no same-country pairs', () => {
      COUNTRY_PAIRS.forEach(pair => {
        expect(pair.country1.code).not.toBe(pair.country2.code)
      })
    })
  })
})
