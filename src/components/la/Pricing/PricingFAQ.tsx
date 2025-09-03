'use client'

import { faqs as allFaqs } from '@/lib/faq-data'
import { FAQAccordion } from '@/components/la/FAQ/FAQAccordion'

export default function PricingFAQ() {
  const extract = allFaqs.filter(f => ['pricing', 'cost', 'bundles', 'download', 'delivery'].some(tag => f.tags?.includes(tag))).slice(0, 5)
  return (
    <section aria-labelledby="pricing-faq-title" className="section-premium">
      <div className="container">
        <h2 id="pricing-faq-title" className="heading-2 text-brand-navy text-center mb-10">Frequently Asked <span className="text-brand-gold">Questions</span></h2>
        <FAQAccordion faqs={extract} />
      </div>
    </section>
  )
}


