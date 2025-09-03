'use client'

import { useState } from 'react'
import { KitSearchBar } from '@/components/la/Kit/KitSearchBar'
import { KitGrid } from '@/components/la/Kit/KitGrid'
import { countryPairs, allCountries } from '@/lib/kits-country-data'

export function KitCatalogueClient() {
  const [filters, setFilters] = useState({ query: '', region: 'all', country: 'all' })
  const query = filters.query.trim().toLowerCase()
  const codeToRegion = Object.fromEntries(allCountries.map(c => [c.code, c.region])) as Record<string, string>
  const filtered = countryPairs.filter((p) => {
    const matchesQuery = !query || p.label.toLowerCase().includes(query) || p.id.includes(query)
    const matchesCountry = filters.country === 'all' || p.id.includes(filters.country)
    // Region logic: pairs are FRA-XXX; use the partner country's region for filtering to avoid Europe matching everything
    const matchesRegion = (() => {
      if (filters.region === 'all') return true
      const codes = p.id.split('-')
      const partnerCodes = codes.filter(c => c !== 'fra')
      if (partnerCodes.length > 0) {
        return partnerCodes.some(code => codeToRegion[code] === filters.region)
      }
      return codes.every(code => codeToRegion[code] === filters.region)
    })()
    return matchesQuery && matchesCountry && matchesRegion
  })
  return (
    <div>
      <KitSearchBar onChange={setFilters} totalCount={filtered.length} />
      <KitGrid pairs={filtered} />
    </div>
  )
}


