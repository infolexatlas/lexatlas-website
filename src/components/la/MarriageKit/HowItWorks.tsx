'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, useReducedMotionVariants } from '@/components/la/Motion'
import { Globe, FileText, CheckCircle2 } from 'lucide-react'

const steps = [
  { icon: Globe, title: 'Select Countries', desc: 'Choose the two countries involved in your marriage process.' },
  { icon: FileText, title: 'Get Your Guide', desc: 'Receive a tailored PDF covering requirements and steps.' },
  { icon: CheckCircle2, title: 'Follow Steps', desc: 'Use the checklist to proceed with confidence.' }
]

export default function HowItWorks() {
  const container = useReducedMotionVariants(staggerContainer)
  const item = useReducedMotionVariants(fadeInUp)
  return (
    <section className="py-12 lg:py-16 bg-brand-muted">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="heading-1 text-brand-navy">How It Works</h2>
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={container}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {steps.map((s, i) => (
            <motion.article
              key={s.title}
              variants={item}
              whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.18, ease: [0.2,0.8,0.2,1] } }}
              className="card p-6 rounded-2xl border bg-card shadow-sm transition will-change-transform motion-reduce:transform-none"
            >
              <div className="flex items-center gap-3">
                <div aria-hidden className="h-10 w-10 rounded-xl grid place-items-center bg-white border">
                  <s.icon className="h-5 w-5 text-brand-gold" />
                </div>
                <h3 className="heading-3 text-brand-navy">{s.title}</h3>
              </div>
              <p className="mt-3 text-brand-textMuted">{s.desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


