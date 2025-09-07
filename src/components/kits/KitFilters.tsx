'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { KitGrid } from './KitGrid'

export function KitFilters() {
  const [filters, setFilters] = useState({
    searchTerm: '',
    fromCountry: '',
    toCountry: ''
  })

  const countries = [
    { value: '', label: 'All Countries' },
    { value: 'fra', label: 'France' },
    { value: 'usa', label: 'United States' },
    { value: 'gbr', label: 'United Kingdom' },
    { value: 'can', label: 'Canada' },
    { value: 'mar', label: 'Morocco' },
    { value: 'deu', label: 'Germany' },
    { value: 'che', label: 'Switzerland' },
    { value: 'bel', label: 'Belgium' },
    { value: 'esp', label: 'Spain' },
    { value: 'ita', label: 'Italy' },
    { value: 'prt', label: 'Portugal' },
  ]

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      searchTerm: value
    }))
  }

  const handleFromCountryChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      fromCountry: value
    }))
  }

  const handleToCountryChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      toCountry: value
    }))
  }

  return (
    <>
      <div className="mb-12 animate-reveal">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative">
              <label htmlFor="search-kits" className="sr-only">
                Search marriage kits
              </label>
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#444444] pointer-events-none" />
              <Input
                id="search-kits"
                type="text"
                placeholder="Search kits or country pair..."
                value={filters.searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white/70 backdrop-blur border-0 rounded-2xl ring-1 ring-black/5 shadow-soft focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 text-base transition-all duration-200 hover:shadow-premium"
                aria-label="Search marriage kits"
              />
            </div>

            {/* From Country Select */}
            <div className="relative">
              <label htmlFor="from-country" className="sr-only">
                Filter by country of origin
              </label>
              <select
                id="from-country"
                value={filters.fromCountry}
                onChange={(e) => handleFromCountryChange(e.target.value)}
                className="w-full px-4 py-3 bg-white/70 backdrop-blur border-0 rounded-2xl ring-1 ring-black/5 shadow-soft focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 text-base text-[#1A2E4F] appearance-none cursor-pointer pr-10 transition-all duration-200 hover:shadow-premium"
                aria-label="Filter by country of origin"
              >
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-[#444444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* To Country Select */}
            <div className="relative">
              <label htmlFor="to-country" className="sr-only">
                Filter by destination country
              </label>
              <select
                id="to-country"
                value={filters.toCountry}
                onChange={(e) => handleToCountryChange(e.target.value)}
                className="w-full px-4 py-3 bg-white/70 backdrop-blur border-0 rounded-2xl ring-1 ring-black/5 shadow-soft focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 text-base text-[#1A2E4F] appearance-none cursor-pointer pr-10 transition-all duration-200 hover:shadow-premium"
                aria-label="Filter by destination country"
              >
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-[#444444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Kits Grid */}
      <KitGrid filters={filters} />
    </>
  )
}
