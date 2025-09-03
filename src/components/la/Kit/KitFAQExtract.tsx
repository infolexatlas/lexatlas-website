import Link from 'next/link'
import { faqs } from '@/lib/faq-data'
import { FAQAccordion } from '@/components/la/FAQ/FAQAccordion'

type Props = { ids: string[] }

export function KitFAQExtract({ ids }: Props) {
  const subset = faqs.filter(f => ids.includes(f.id))
  return (
    <section aria-labelledby="kits-faq-heading" className="section-premium bg-brand-ivory">
      <div className="container">
        <div className="text-center mb-8">
          <h2 id="kits-faq-heading" className="heading-premium">Top Questions</h2>
          <p className="subheading-premium">Everything you need to know about our marriage kits</p>
        </div>
        <FAQAccordion faqs={subset} />
        <div className="mt-6 text-center">
          <Link href="/faq" className="text-brand-navy underline decoration-brand-gold">See all FAQs</Link>
        </div>
      </div>
    </section>
  )
}


