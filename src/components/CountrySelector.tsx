'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, Globe } from 'lucide-react'
import { COUNTRIES, type Country } from '@/content/marriage/countries'
import { cn } from '@/lib/utils'

interface CountrySelectorProps {
  className?: string
  placeholder?: string
  onSelect?: (country: Country) => void
}

export function CountrySelector({ 
  className, 
  placeholder = "Select your country...",
  onSelect 
}: CountrySelectorProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredCountries = COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelect = (country: Country) => {
    setSelectedCountry(country)
    setSearchTerm(country.name)
    setIsOpen(false)
    setFocusedIndex(-1)
    
    if (onSelect) {
      onSelect(country)
    } else {
      // Default behavior: navigate to country page
      router.push(`/kits/marriage-kit/${country.code}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex(prev => 
          prev < filteredCountries.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : filteredCountries.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (focusedIndex >= 0 && filteredCountries[focusedIndex]) {
          handleSelect(filteredCountries[focusedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        setFocusedIndex(-1)
        break
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setIsOpen(true)
    setFocusedIndex(-1)
  }

  const handleInputFocus = () => {
    setIsOpen(true)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setFocusedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Globe className="h-5 w-5 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-autocomplete="list"
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          aria-label="Toggle country dropdown"
        >
          <ChevronDown 
            className={cn(
              "h-5 w-5 text-gray-400 transition-transform",
              isOpen && "rotate-180"
            )} 
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
            role="listbox"
          >
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, index) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleSelect(country)}
                  onMouseEnter={() => setFocusedIndex(index)}
                  className={cn(
                    "w-full px-4 py-3 text-left hover:bg-brand-muted focus:bg-brand-muted focus:outline-none transition-colors",
                    focusedIndex === index && "bg-brand-muted",
                    "flex items-center justify-between"
                  )}
                  role="option"
                  aria-selected={focusedIndex === index}
                >
                  <span className="font-medium text-brand-deep">
                    {country.name}
                  </span>
                  <span className="text-sm text-gray-500 font-mono">
                    {country.code}
                  </span>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-500 text-center">
                No countries found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
