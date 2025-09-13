'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeInUp, staggerContainer, useReducedMotionVariants } from '@/components/la/Motion'
import { FileText, Clock, BookOpen, Link2, ListChecks, RefreshCcw } from 'lucide-react'

const items = [
  {
    icon: FileText,
    title: 'Documentation Requirements',
    bullets: [
      'Birth certificates, passports, residence proofs',
      'Apostille and certified translations where required',
      'Local civil registry specifics by country'
    ]
  },
  {
    icon: Clock,
    title: 'Process Timeline',
    bullets: [
      'Estimated timelines by country pair',
      'Appointment scheduling guidance',
      'What to expect at each step'
    ]
  },
  {
    icon: BookOpen,
    title: 'Expert Commentary',
    bullets: [
      'Plain-language explanations of complex steps',
      'Common pitfalls and how to avoid them',
      'Tips from real-world case reviews'
    ]
  },
  {
    icon: Link2,
    title: 'Official Sources',
    bullets: [
      'Links to government and consular pages',
      'Up-to-date forms and references',
      'Verified requirements with date stamps'
    ]
  },
  {
    icon: ListChecks,
    title: 'Checklists & Templates',
    bullets: [
      'Printable step-by-step checklists',
      'Communication templates (appointments, requests)',
      'Document preparation worksheets'
    ]
  },
  {
    icon: RefreshCcw,
    title: 'Updates & Support',
    bullets: [
      'Continuous updates as rules change',
      'Guidance on contacting authorities',
      'Access to global sample for quick preview'
    ]
  }
]

export default function Included() {
  const container = useReducedMotionVariants(staggerContainer)
  const item = useReducedMotionVariants(fadeInUp)
  const reduce = useReducedMotion()
  return (
    <section id="whats-included" className="pt-20 lg:pt-28 pb-20 lg:pb-28 bg-brand-muted">
      <div className="container">
        <div className="text-center mb-3">
          <h2 className="heading-1 text-brand-navy">What's Included in <span className="text-brand-gold">Each Kit</span></h2>
          <p className="mt-3 text-brand-textMuted max-w-3xl mx-auto">Premium, expert-built content designed to save you time and eliminate uncertainty.</p>
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={container}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map(section => (
            <motion.article 
              key={section.title} 
              variants={item} 
              whileHover={reduce ? undefined : { y: -4, scale: 1.01, transition: { duration: 0.18, ease: [0.2,0.8,0.2,1] } }}
              className="card p-6 rounded-2xl border bg-card shadow-sm will-change-transform motion-reduce:transform-none"
            >
              <div className="flex items-center gap-3">
                <div aria-hidden className="h-10 w-10 rounded-xl grid place-items-center bg-white border">
                  <section.icon className="h-5 w-5 text-brand-gold" />
                </div>
                <h3 className="heading-3 text-brand-navy">{section.title}</h3>
              </div>
              <ul className="mt-4 space-y-2">
                {section.bullets.map(b => (
                  <motion.li
                    key={b}
                    variants={item}
                    className="text-brand-textMuted flex items-start gap-2"
                  >
                    <span aria-hidden className="mt-1 inline-block h-3 w-3 rounded-full bg-brand-gold/80" />
                    <span>{b}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


