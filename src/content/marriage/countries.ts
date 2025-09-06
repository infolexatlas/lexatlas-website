export interface Country {
  code: string
  name: string
}

export interface CountryPair {
  country1: Country
  country2: Country
  pairCode: string // e.g., "FR-US"
}

export const COUNTRIES: Country[] = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'IE', name: 'Ireland' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'PT', name: 'Portugal' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'BE', name: 'Belgium' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'AT', name: 'Austria' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' },
  { code: 'IS', name: 'Iceland' },
  { code: 'GR', name: 'Greece' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'MT', name: 'Malta' },
  { code: 'PL', name: 'Poland' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'HU', name: 'Hungary' },
  { code: 'RO', name: 'Romania' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'HR', name: 'Croatia' },
  { code: 'SI', name: 'Slovenia' }
]

// Generate all unique country pairs (combinations, not permutations)
export function generateCountryPairs(): CountryPair[] {
  const pairs: CountryPair[] = []
  
  for (let i = 0; i < COUNTRIES.length; i++) {
    for (let j = i + 1; j < COUNTRIES.length; j++) {
      const country1 = COUNTRIES[i]
      const country2 = COUNTRIES[j]
      
      // Ensure alphabetical order for consistent pair codes
      const [first, second] = [country1, country2].sort((a, b) => 
        a.code.localeCompare(b.code)
      )
      
      pairs.push({
        country1: first,
        country2: second,
        pairCode: `${first.code}-${second.code}`
      })
    }
  }
  
  return pairs
}

// Get all country pairs for static generation
export const COUNTRY_PAIRS = generateCountryPairs()

export function getCountryByCode(code: string): Country | undefined {
  return COUNTRIES.find(country => country.code === code.toUpperCase())
}

export function getCountryByName(name: string): Country | undefined {
  return COUNTRIES.find(country => 
    country.name.toLowerCase().includes(name.toLowerCase())
  )
}

export function validateCountryCode(code: string): boolean {
  return COUNTRIES.some(country => country.code === code.toUpperCase())
}

// Parse a pair code (e.g., "FR-US") and return the countries
export function parseCountryPair(pairCode: string): CountryPair | null {
  const codes = pairCode.toUpperCase().split('-')
  
  if (codes.length !== 2) {
    return null
  }
  
  const [code1, code2] = codes
  const country1 = getCountryByCode(code1)
  const country2 = getCountryByCode(code2)
  
  if (!country1 || !country2) {
    return null
  }
  
  // Check for same country
  if (country1.code === country2.code) {
    return null
  }
  
  // Ensure alphabetical order
  const [first, second] = [country1, country2].sort((a, b) => 
    a.code.localeCompare(b.code)
  )
  
  return {
    country1: first,
    country2: second,
    pairCode: `${first.code}-${second.code}`
  }
}

// Validate if two country codes form a valid pair
export function validateCountryPair(code1: string, code2: string): boolean {
  if (code1.toUpperCase() === code2.toUpperCase()) {
    return false // Same country not allowed
  }
  
  return validateCountryCode(code1) && validateCountryCode(code2)
}

// Get the expected file name for a country pair
export function getPairFileName(country1: string, country2: string): string {
  const [first, second] = [country1, country2].sort((a, b) => 
    a.toUpperCase().localeCompare(b.toUpperCase())
  )
  return `${first.toUpperCase()}-${second.toUpperCase()}`
}
