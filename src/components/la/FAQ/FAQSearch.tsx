'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/ui/motion'
import { FAQ } from '@/lib/faq-data'

interface FAQSearchProps {
  onSearchChange: (query: string) => void
  faqs: FAQ[]
  filteredCount?: number
  className?: string
}

/**
 * Premium search component with debounced input and fuzzy search
 * Features instant filtering, result highlighting, and accessibility
 */
export const FAQSearch = ({ 
  onSearchChange, 
  faqs, 
  filteredCount,
  className = '' 
}: FAQSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm)
    }, 200)

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Update parent components immediately when search is cleared
  useEffect(() => {
    if (searchTerm === '') {
      onSearchChange('')
    } else {
      onSearchChange(debouncedTerm)
    }
  }, [debouncedTerm, searchTerm, onSearchChange])

  const handleClear = () => {
    setSearchTerm('')
    setDebouncedTerm('')
    onSearchChange('')
  }

  return (
    <FadeIn className={`w-full ${className}`}>
      <div className="max-w-2xl mx-auto">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-textMuted" />
          <Input
            type="text"
            placeholder="Search questions, answers, or topics..."
            value={searchTerm}
            onChange={(e) => {
              const value = e.target.value
              setSearchTerm(value)
              // Si l'input est vide, mettre à jour immédiatement
              if (!value.trim()) {
                setDebouncedTerm('')
                onSearchChange('')
              }
            }}
            className="pl-12 pr-12 py-4 border-0 rounded-2xl bg-white/75 backdrop-blur ring-1 ring-black/5 shadow-soft focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 text-base transition-all duration-250"
            aria-label="Search frequently asked questions"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-brand-textMuted hover:text-brand-navy"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Results Count */}
        {debouncedTerm && (
          <div className="mt-4 text-center">
            <p className="text-sm text-brand-textMuted">
              {filteredCount === 0 ? (
                <span>No questions found matching "{debouncedTerm}"</span>
              ) : (
                <span>
                  {filteredCount} of {faqs.length} questions found
                </span>
              )}
            </p>
            {filteredCount === 0 && (
              <div className="mt-4">
                <Button
                  variant="link"
                  onClick={handleClear}
                  className="text-brand-gold hover:text-brand-navy underline decoration-brand-gold hover:decoration-brand-navy"
                >
                  Clear search and show all questions
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Search Suggestions */}
        {!debouncedTerm && (
          <div className="mt-6 text-center">
            <p className="text-sm text-brand-textMuted mb-3">
              Popular topics:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['pricing', 'timeline', 'translations', 'recognition', 'delivery'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchTerm(tag)
                    setDebouncedTerm(tag)
                    onSearchChange(tag)
                  }}
                  className="px-3 py-1 text-xs font-medium text-brand-navy bg-brand-navy/10 rounded-full hover:bg-brand-gold/20 transition-colors duration-250 capitalize"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </FadeIn>
  )
}
