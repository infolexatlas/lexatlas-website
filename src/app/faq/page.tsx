'use client'

import { useState, useEffect } from 'react'
import { FAQHero, FAQSearch, FAQAccordion, FAQCTA, FAQSchema } from '@/components/la'
import { faqs } from '@/lib/faq-data'
import { PageTransition } from '@/components/ui/page-transition'

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredFaqs, setFilteredFaqs] = useState(faqs)

  // Handle search changes
  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
  }

  // Filter FAQs based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredFaqs(faqs)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = faqs.filter(faq => {
      const questionMatch = faq.question.toLowerCase().includes(query)
      const answerMatch = faq.answer.toLowerCase().includes(query)
      const tagMatch = faq.tags?.some(tag => tag.toLowerCase().includes(query))
      
      return questionMatch || answerMatch || tagMatch
    })

    setFilteredFaqs(filtered)
  }, [searchQuery])

  return (
    <PageTransition>
      {/* JSON-LD Schema */}
      <FAQSchema faqs={faqs} />
      
      <div className="min-h-screen bg-brand-muted">
        {/* Hero Section */}
        <FAQHero />

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Search */}
              <FAQSearch
                onSearchChange={handleSearchChange}
                faqs={faqs}
                filteredCount={filteredFaqs.length}
              />

              {/* FAQ Accordion */}
              <FAQAccordion
                faqs={filteredFaqs}
                searchQuery={searchQuery}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <FAQCTA />
      </div>
    </PageTransition>
  )
}
