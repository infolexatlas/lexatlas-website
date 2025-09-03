'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export const faqItems: FAQItem[] = [
  {
    id: 'what-is-marriage-kit',
    question: 'What is a LexAtlas Marriage Kit?',
    answer: 'A complete legal guide that explains step by step how to celebrate and legally recognize your marriage between two countries. It covers required documents, fees, timelines, translations, and recognition in both countries.'
  },
  {
    id: 'replace-lawyer',
    question: 'Does the kit replace a lawyer?',
    answer: 'No. It is not a substitute for personalized legal advice. It provides reliable, practical, and clear information so most couples can complete the process themselves without expensive legal fees.'
  },
  {
    id: 'up-to-date',
    question: 'Are the guides up to date and verified?',
    answer: 'Yes. Each kit is based on national laws, EU and international regulations, and current consular/administrative practices. We review and update regularly.'
  },
  {
    id: 'timeline',
    question: 'How long does an international marriage usually take?',
    answer: 'It depends on the countries. Within the EU: ~1–3 months. With the US, Asia, or the Middle East: ~3–6 months. Some jurisdictions require publication of banns, investigations, or legalization/apostille, which can extend timelines.'
  },
  {
    id: 'cost',
    question: 'How much does the procedure cost?',
    answer: 'We provide estimates for sworn translations, legalization/apostille, consular fees, and civil registry certificates. Typical ranges: €100–€600 depending on the countries.'
  },
  {
    id: 'recognition',
    question: 'Will our marriage be recognized in both countries?',
    answer: 'Yes—if you follow the steps outlined in the kit. We explain how to register the marriage where it is celebrated and how to have it recognized in the other country (consulate/civil registry steps if needed).'
  },
  {
    id: 'residence-requirement',
    question: 'Do we need to marry in our country of residence?',
    answer: 'Not always. Some countries require residence; others allow non-resident marriages. Each kit clarifies where you can legally marry and the conditions.'
  },
  {
    id: 'translations',
    question: 'Do we need official translations?',
    answer: 'In most cases, yes. Civil status documents often require sworn translations; many jurisdictions also require an apostille or legalization. The kit specifies exactly what to translate, into which language, and by whom.'
  },
  {
    id: 'delivery',
    question: 'How do we receive the kit?',
    answer: 'Immediately after purchase you get a secure download link (interactive PDF). You have lifetime access and can view it on desktop, tablet, or mobile.'
  },
  {
    id: 'multiple-kits',
    question: 'Can we buy multiple kits?',
    answer: 'Yes. One kit is €50. Bundle offer: 2 kits for €75 (50% off the second). Perfect for comparing different country pairs.'
  },
  {
    id: 'wrong-kit',
    question: 'What if we buy the wrong kit?',
    answer: 'Contact support and we\'ll provide access to the correct kit. Our goal is 100% customer satisfaction.'
  },
  {
    id: 'who-we-are',
    question: 'Who is behind LexAtlas?',
    answer: 'International jurists specialized in cross-border marriages and private international law. Our mission is to make legal access simple, clear, and affordable for international couples.'
  }
]

interface FAQProps {
  className?: string
  items?: FAQItem[]
  showSearch?: boolean
  maxItems?: number
}

export default function FAQ({ 
  className = '', 
  items = faqItems,
  showSearch = true,
  maxItems
}: FAQProps) {
  const [searchTerm, setSearchTerm] = useState('')

  // Filter items based on search term
  const filteredItems = items.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Limit items if maxItems is specified
  const displayItems = maxItems ? filteredItems.slice(0, maxItems) : filteredItems

  return (
    <section className={`w-full ${className}`}>
      {/* Search Filter */}
      {showSearch && (
        <div className="mb-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#444444]" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-4 border-0 rounded-2xl bg-white/75 backdrop-blur ring-1 ring-black/5 shadow-sm focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 text-base"
            />
          </div>
          {searchTerm && (
            <p className="text-sm text-[#444444] text-center mt-3">
              {filteredItems.length} of {items.length} questions found
            </p>
          )}
        </div>
      )}

      {/* FAQ Accordion */}
      <Accordion type="single" collapsible={true} className="space-y-0">
        {displayItems.map((item, index) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="border-b border-brand-gray/50 last:border-none animate-reveal bg-white/75 backdrop-blur rounded-2xl ring-1 ring-black/5 shadow-sm"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <AccordionTrigger className="flex items-center justify-between gap-4 py-4 px-6 text-left hover:no-underline group">
              <h3 className="text-base md:text-lg font-medium text-[#1A2E4F] group-hover:text-brand-gold transition-colors duration-250 leading-relaxed">
                {item.question}
              </h3>
            </AccordionTrigger>
            <AccordionContent className="text-[#444444] leading-relaxed pt-2 pb-4 px-6 text-base">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* No Results Message */}
      {searchTerm && filteredItems.length === 0 && (
        <div className="text-center py-12 animate-reveal">
          <p className="text-[#444444] mb-4 text-lg">
            No questions found matching "{searchTerm}"
          </p>
          <button
            onClick={() => setSearchTerm('')}
            className="text-brand-gold hover:text-[#1A2E4F] transition-colors duration-250 underline decoration-brand-gold hover:decoration-[#1A2E4F]"
          >
            Clear search
          </button>
        </div>
      )}
    </section>
  )
}
