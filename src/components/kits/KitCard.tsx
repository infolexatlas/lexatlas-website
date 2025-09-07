import Link from 'next/link'
import { Globe, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getDisplayPairFromSlug } from '@/lib/kits.display'
import { generateFRAXXXTitle } from '@/lib/kits.client'
import { formatPrice } from '@/lib/utils'

interface KitCardProps {
  slug: string
  index: number
}

export function KitCard({ slug, index }: KitCardProps) {
  const displayPair = getDisplayPairFromSlug(slug)
  const pairCode = generateFRAXXXTitle(slug)
  
  if (!displayPair) return null

  return (
    <div 
      className="animate-reveal group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="h-full rounded-2xl bg-white/75 backdrop-blur ring-1 ring-black/5 shadow-soft hover:shadow-premium hover:-translate-y-[2px] transition-all duration-300 flex flex-col">
        {/* Header Row */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            {/* Gold Chip with Pair Code */}
            <div className="inline-flex items-center px-3 py-1 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-medium ring-1 ring-brand-gold/20">
              {pairCode}
            </div>
            
            {/* Mini Globe Icon */}
            <div className="w-8 h-8 bg-brand-navy/10 rounded-full flex items-center justify-center group-hover:bg-brand-navy/20 transition-colors duration-200">
              <Globe className="w-4 h-4 text-brand-gold" />
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-semibold text-[#1A2E4F] mb-3 leading-tight group-hover:text-[#223A63] transition-colors duration-200">
            {displayPair.left} – {displayPair.right}
          </h3>
          
          {/* Bullets */}
          <ul className="space-y-2 text-sm text-[#444444]">
            <li className="flex items-center">
              <Check className="w-4 h-4 text-brand-gold mr-2 flex-shrink-0" />
              Official sources
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-brand-gold mr-2 flex-shrink-0" />
              Step-by-step guidance
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-brand-gold mr-2 flex-shrink-0" />
              Instant download
            </li>
          </ul>
        </div>
        
        {/* Price Row */}
        <div className="px-6 py-4 border-t border-brand-gray/30">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-2xl font-bold text-[#1A2E4F]">
              29 €
            </span>
            <span className="text-sm text-[#444444]">
              One-time purchase
            </span>
          </div>
        </div>
        
        {/* CTA Row */}
        <div className="px-6 pb-6 mt-auto">
          {/* Primary CTA */}
          <Button 
            asChild 
            className="w-full bg-[#1A2E4F] hover:bg-[#223A63] text-white shadow-soft hover:shadow-premium hover:scale-[1.02] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
          >
            <Link href={`/kits/${slug}`}>
              Get Marriage Kit
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
