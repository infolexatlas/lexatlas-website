'use client'

import { FAQ } from '@/lib/faq-data'

interface FAQSchemaProps {
  faqs: FAQ[]
}

/**
 * JSON-LD schema for FAQ page SEO
 * Provides structured data for search engines
 */
export const FAQSchema = ({ faqs }: FAQSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
