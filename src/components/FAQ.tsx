'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown } from 'lucide-react'
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
  const [expandedItem, setExpandedItem] = useState<string | undefined>()

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
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border-gray-300 focus:border-brand-gold focus:ring-brand-gold"
            />
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-600 text-center mt-2">
              {filteredItems.length} of {items.length} questions found
            </p>
          )}
        </div>
      )}

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {displayItems.map((item, index) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:border-brand-gold transition-colors"
          >
            <AccordionItem>
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline group">
                <h3 className="text-lg font-serif font-semibold text-brand-deep group-hover:text-brand-gold transition-colors">
                  {item.question}
                </h3>
                <ChevronDown className="h-5 w-5 text-brand-gold transition-transform duration-200 flex-shrink-0 ml-4" />
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="text-gray-700 leading-relaxed">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {searchTerm && filteredItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-600 mb-4">
            No questions found matching "{searchTerm}"
          </p>
          <button
            onClick={() => setSearchTerm('')}
            className="text-brand-gold hover:text-brand-deep transition-colors underline"
          >
            Clear search
          </button>
        </motion.div>
      )}
    </section>
  )
}
