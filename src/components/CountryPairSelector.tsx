'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { COUNTRIES, type Country } from '@/lib/countries'
import { toISO3, canonicalFraSlug } from '@/lib/kits.config'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface CountryPairSelectorProps {
  className?: string
}

export function CountryPairSelector({ className }: CountryPairSelectorProps) {
  const router = useRouter()
  const [country1, setCountry1] = useState<Country | null>(null)
  const [country2, setCountry2] = useState<Country | null>(null)
  const [search1, setSearch1] = useState('')
  const [search2, setSearch2] = useState('')
  const [showDropdown1, setShowDropdown1] = useState(false)
  const [showDropdown2, setShowDropdown2] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const filteredCountries1 = COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(search1.toLowerCase()) &&
    country.code !== country2?.code
  )

  const filteredCountries2 = COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(search2.toLowerCase()) &&
    country.code !== country1?.code
  )

  const handleCountry1Select = (country: Country) => {
    setCountry1(country)
    setSearch1(country.name)
    setShowDropdown1(false)
    setErrorMessage(null) // Clear error when selection changes
  }

  const handleCountry2Select = (country: Country) => {
    setCountry2(country)
    setSearch2(country.name)
    setShowDropdown2(false)
    setErrorMessage(null) // Clear error when selection changes
  }

  const handleSubmit = () => {
    if (country1 && country2) {
      // Convert country names to ISO3 codes
      const aIso3 = toISO3(country1.name)
      const bIso3 = toISO3(country2.name)
      
      if (!aIso3 || !bIso3) {
        setErrorMessage("This pair isn't available yet. More kits are in production and released daily.")
        return
      }
      
      // Get canonical FRA-X slug
      const slug = canonicalFraSlug(aIso3, bIso3)
      
      if (slug) {
        // Valid FRA-X pair, navigate to the kit page
        setErrorMessage(null) // Clear error on successful navigation
        router.push(`/kits/${slug}`)
      } else {
        // Not a supported pair, show persistent error message
        setErrorMessage("This pair isn't available yet. More kits are in production and released daily.")
      }
    }
  }

  const canSubmit = country1 && country2 && country1.code !== country2.code

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Select 2 Countries</CardTitle>
        <CardDescription>
          Choose the countries for your international marriage kit
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {/* Country 1 Selector */}
          <div className="space-y-2">
            <Label htmlFor="country1">First Country</Label>
            <div className="relative">
              <Input
                id="country1"
                data-testid="country1-input"
                placeholder="Search for a country..."
                value={search1}
                onChange={(e) => {
                  setSearch1(e.target.value)
                  setShowDropdown1(true)
                  setErrorMessage(null) // Clear error when user starts typing
                  if (!e.target.value) {
                    setCountry1(null)
                  }
                }}
                onFocus={() => setShowDropdown1(true)}
                onBlur={() => setTimeout(() => setShowDropdown1(false), 200)}
              />
              {showDropdown1 && filteredCountries1.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                  {filteredCountries1.map((country) => (
                    <button
                      key={country.code}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                      onClick={() => handleCountry1Select(country)}
                    >
                      {country.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Country 2 Selector */}
          <div className="space-y-2">
            <Label htmlFor="country2">Second Country</Label>
            <div className="relative">
              <Input
                id="country2"
                data-testid="country2-input"
                placeholder="Search for a country..."
                value={search2}
                onChange={(e) => {
                  setSearch2(e.target.value)
                  setShowDropdown2(true)
                  setErrorMessage(null) // Clear error when user starts typing
                  if (!e.target.value) {
                    setCountry2(null)
                  }
                }}
                onFocus={() => setShowDropdown2(true)}
                onBlur={() => setTimeout(() => setShowDropdown2(false), 200)}
              />
              {showDropdown2 && filteredCountries2.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                  {filteredCountries2.map((country) => (
                    <button
                      key={country.code}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                      onClick={() => handleCountry2Select(country)}
                    >
                      {country.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Selected Countries Display */}
        {(country1 || country2) && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Selected Countries:</h4>
            <div className="space-y-1">
              {country1 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{country1.name}</span>
                  <span className="text-xs text-gray-500">({country1.code})</span>
                </div>
              )}
              {country2 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{country2.name}</span>
                  <span className="text-xs text-gray-500">({country2.code})</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full"
        >
          View Marriage Kit
        </Button>

        {country1 && country2 && country1.code === country2.code && (
          <p className="text-sm text-red-600 text-center">
            Please select two different countries
          </p>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800 text-center">
              {errorMessage}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
