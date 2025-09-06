export type CountryPair = {
  id: string
  iso: string
  label: string
  price: number
  features: string[]
}

export const countryPairs: CountryPair[] = [
  { id: 'fra-usa', iso: 'FRA – USA', label: 'France – United States', price: 29, features: ['Official sources', 'Step-by-step guidance', 'Instant download'] },
  { id: 'fra-gbr', iso: 'FRA – GBR', label: 'France – United Kingdom', price: 29, features: ['Official sources', 'Step-by-step guidance', 'Instant download'] },
  { id: 'fra-can', iso: 'FRA – CAN', label: 'France – Canada', price: 29, features: ['Official sources', 'Step-by-step guidance', 'Instant download'] },
  { id: 'fra-mar', iso: 'FRA – MAR', label: 'France – Morocco', price: 29, features: ['Official sources', 'Step-by-step guidance', 'Instant download'] },
  { id: 'fra-deu', iso: 'FRA – DEU', label: 'France – Germany', price: 29, features: ['Official sources', 'Step-by-step guidance', 'Instant download'] },
  { id: 'fra-che', iso: 'FRA – CHE', label: 'France – Switzerland', price: 29, features: ['Official sources', 'Step-by-step guidance', 'Instant download'] },
  { id: 'fra-bel', iso: 'FRA – BEL', label: 'France – Belgium', price: 29, features: ['Official sources', 'Step-by-step guidance', 'Instant download'] },
  { id: 'fra-esp', iso: 'FRA – ESP', label: 'France – Spain', price: 29, features: ['Official sources', 'Step-by-step guidance', 'Instant download'] },
  { id: 'fra-ita', iso: 'FRA – ITA', label: 'France – Italy', price: 29, features: ['Official sources', 'Step-by-step guidance', 'Instant download'] },
  { id: 'fra-prt', iso: 'FRA – PRT', label: 'France – Portugal', price: 29, features: ['Official sources', 'Step-by-step guidance', 'Instant download'] },
]

export const allCountries = [
  { code: 'fra', label: 'France', region: 'Europe' },
  { code: 'usa', label: 'United States', region: 'Americas' },
  { code: 'gbr', label: 'United Kingdom', region: 'Europe' },
  { code: 'can', label: 'Canada', region: 'Americas' },
  { code: 'mar', label: 'Morocco', region: 'Africa' },
  { code: 'deu', label: 'Germany', region: 'Europe' },
  { code: 'che', label: 'Switzerland', region: 'Europe' },
  { code: 'bel', label: 'Belgium', region: 'Europe' },
  { code: 'esp', label: 'Spain', region: 'Europe' },
  { code: 'ita', label: 'Italy', region: 'Europe' },
  { code: 'prt', label: 'Portugal', region: 'Europe' },
] as const

export const regions = [
  { id: 'all', label: 'All regions' },
  { id: 'Europe', label: 'Europe' },
  { id: 'Americas', label: 'Americas' },
  { id: 'Africa', label: 'Africa' },
  { id: 'Asia', label: 'Asia' },
  { id: 'Oceania', label: 'Oceania' },
] as const


