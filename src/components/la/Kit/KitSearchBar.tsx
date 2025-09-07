'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { allCountries, regions } from '@/lib/kits-country-data'

type Props = {
  onChange: (state: { query: string; region: string; country: string }) => void
  totalCount: number
}

export function KitSearchBar({ onChange, totalCount }: Props) {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('all')
  const [country, setCountry] = useState('all')
  const [announce, setAnnounce] = useState('')
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const regionCountries = useMemo(() => {
    if (region === 'all') return allCountries
    return allCountries.filter(c => c.region === region)
  }, [region])

  // Debounce emit
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      onChange({ query, region, country })
      setAnnounce(`${totalCount} results${query ? ` for “${query}”` : ''}`)
    }, 200)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query, region, country, onChange, totalCount])

  // Reset country when region changes and country no longer in list
  useEffect(() => {
    if (country !== 'all' && !regionCountries.some(c => c.code === country)) {
      setCountry('all')
    }
  }, [regionCountries, country])

  return (
    <section aria-labelledby="kits-search-heading" className="sticky top-16 z-30 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 ring-1 ring-black/5">
      <h2 id="kits-search-heading" className="sr-only">Search and filter</h2>
      <div className="container py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Search */}
          <div className="relative">
            <label htmlFor="kit-search" className="sr-only">Search country pairs</label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" aria-hidden="true" />
            <Input
              id="kit-search"
              placeholder="Search country pairs"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 rounded-xl2"
              aria-describedby="kits-search-status"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm underline"
              >
                Clear
              </button>
            )}
          </div>

          {/* Region */}
          <div>
            <label className="sr-only" htmlFor="kit-region">Region</label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger id="kit-region" className="rounded-md">
                <SelectValue placeholder="All regions" />
              </SelectTrigger>
              <SelectContent>
                {regions.map(r => (
                  <SelectItem key={r.id} value={r.id}>{r.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Country */}
          <div>
            <label className="sr-only" htmlFor="kit-country">Country</label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger id="kit-country" className="rounded-md">
                <SelectValue placeholder="All countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All countries</SelectItem>
                {regionCountries.map(c => (
                  <SelectItem key={c.code} value={c.code}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <p id="kits-search-status" role="status" aria-live="polite" className="sr-only">{announce}</p>
      </div>
    </section>
  )
}


