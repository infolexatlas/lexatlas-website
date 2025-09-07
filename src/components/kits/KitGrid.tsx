import { useState, useEffect } from 'react'
import { PRIORITY_SLUGS } from '@/lib/kits.client'
import { getDisplayPairFromSlug } from '@/lib/kits.display'
import { KitCard } from './KitCard'

interface KitGridProps {
  filters?: {
    searchTerm: string
    fromCountry: string
    toCountry: string
  }
}

export function KitGrid({ filters }: KitGridProps) {
  const [filteredSlugs, setFilteredSlugs] = useState<string[]>([...PRIORITY_SLUGS])

  useEffect(() => {
    if (!filters) {
      setFilteredSlugs([...PRIORITY_SLUGS])
      return
    }

    const { searchTerm, fromCountry, toCountry } = filters

    const filtered = PRIORITY_SLUGS.filter(slug => {
      const displayPair = getDisplayPairFromSlug(slug)
      if (!displayPair) return false

      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        const title = `${displayPair.left} ${displayPair.right}`.toLowerCase()
        const slugLower = slug.toLowerCase()
        
        if (!title.includes(searchLower) && !slugLower.includes(searchLower)) {
          return false
        }
      }

      // From country filter
      if (fromCountry) {
        const slugParts = slug.toLowerCase().split('-')
        if (!slugParts.includes(fromCountry.toLowerCase())) {
          return false
        }
      }

      // To country filter
      if (toCountry) {
        const slugParts = slug.toLowerCase().split('-')
        if (!slugParts.includes(toCountry.toLowerCase())) {
          return false
        }
      }

      return true
    })

    setFilteredSlugs(filtered)
  }, [filters])

  if (filteredSlugs.length === 0) {
    return (
      <div className="text-center py-16 animate-reveal">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-brand-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-brand-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-[#1A2E4F] mb-2">
            No kits found
          </h3>
          <p className="text-[#444444] text-sm">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
      {filteredSlugs.map((slug, index) => (
        <KitCard key={slug} slug={slug} index={index} />
      ))}
    </div>
  )
}
