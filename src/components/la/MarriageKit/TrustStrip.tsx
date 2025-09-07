'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Download, CheckCircle2 } from 'lucide-react'
import { fadeInUp, staggerContainer, useReducedMotionVariants } from '@/components/la/Motion'

const items = [
  { icon: Shield, label: 'GDPR Compliant' },
  { icon: Lock, label: 'Secure Checkout' },
  { icon: Download, label: 'Instant Download' },
  { icon: CheckCircle2, label: 'Expert Verified' },
]

export default function TrustStrip() {
  const container = useReducedMotionVariants(staggerContainer)
  const item = useReducedMotionVariants(fadeInUp)
  return (
    <section className="pt-2 lg:pt-3 pb-10 lg:pb-12 bg-white">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={container}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {items.map(i => (
            <motion.div
              key={i.label}
              variants={item}
              whileHover={{ y: -2, scale: 1.01, transition: { duration: 0.16, ease: [0.2,0.8,0.2,1] } }}
              className="rounded-2xl border bg-card shadow-sm p-4 flex items-center justify-center gap-2 min-h-[72px] will-change-transform motion-reduce:transform-none"
            >
              <i.icon aria-hidden className="h-5 w-5 text-brand-gold" />
              <span className="text-sm font-medium text-brand-navy">{i.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


