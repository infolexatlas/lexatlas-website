'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export function FAQExtract({ items }: { items: { id: string; q: string; a: string }[] }) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="text-2xl font-semibold tracking-tight">Top Questions</h2>
        <Accordion type="single" collapsible className="mt-4">
          {items.map((f) => (
            <AccordionItem key={f.id} value={f.id}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">{f.a}</p>
                <a className="mt-2 inline-block text-sm underline" href={`/faq#${f.id}`}>Open full answer →</a>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}


