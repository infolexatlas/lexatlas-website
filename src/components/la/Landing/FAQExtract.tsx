"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp } from "@/components/la/Motion"
import { faqs } from "@/lib/faq-data"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FAQSchema } from "@/components/la/FAQ/FAQSchema"
import { JsonLd } from "@/components/JsonLd"

const topFaqs = faqs.slice(0, 6)

export default function FAQExtract() {
  return (
    <section aria-labelledby="faq-heading" className="section">
      <div className="container">
        <div className="text-center mb-10 md:mb-12">
          <p className="eyebrow text-brand-gold mb-4">FAQ</p>
          <motion.h2
            id="faq-heading"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeInUp}
            className="heading-premium text-balance"
          >
            Common questions, clear answers
          </motion.h2>
        </div>

        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          {topFaqs.map((f, i) => (
            <AccordionItem
              key={f.id}
              value={f.id}
              className="animate-reveal bg-white/80 backdrop-blur rounded-xl2 shadow-soft border border-transparent mb-3 transition-all duration-250 hover:shadow-premium hover:-translate-y-[2px] hover:border-brand-gold/40 focus-within:ring-2 focus-within:ring-brand-gold focus-within:ring-offset-2"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <AccordionTrigger className="text-left px-5 py-4 group transition-colors duration-200 data-[state=open]:text-brand-gold">
                <h3 className="text-base md:text-lg font-semibold text-brand-navy group-data-[state=open]:text-brand-gold">
                  {f.question}
                </h3>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 text-brand-text leading-relaxed data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                {f.answer}
                <div className="mt-3">
                  <Link href={`/faq#${f.id}`} className="text-brand-gold underline hover:text-brand-navy transition-colors">Read more</Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-6">
          <Link href="/faq" className="btn-outline px-6 py-3 rounded-xl2">View all FAQs</Link>
        </div>

        {/* Structured data */}
        <FAQSchema faqs={topFaqs} />
      </div>
    </section>
  )
}


