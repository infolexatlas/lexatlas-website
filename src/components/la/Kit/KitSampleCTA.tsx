'use client'

import { motion, useReducedMotion } from 'framer-motion'
import LeadForm from '@/components/LeadForm'

type Props = { compact?: boolean }

export function KitSampleCTA({ compact = false }: Props) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section aria-labelledby="sample-cta-heading" className={`${compact ? 'py-10 md:py-12 bg-brand-ivory' : 'py-16 bg-brand-ivory'} relative overflow-hidden`}>
      <div className="container relative">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={prefersReducedMotion ? false : { opacity: 1, y: 0, transition: { duration: 0.4 } }}
          className="rounded-2xl bg-white/80 backdrop-blur ring-1 ring-black/5 p-6 md:p-10 shadow-soft"
        >
          <motion.h2
            id="sample-cta-heading"
            className="heading-2"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={prefersReducedMotion ? false : { opacity: 1, y: 0, transition: { delay: 0.05, duration: 0.35 } }}
          >
            <motion.span
              className="text-brand-gold"
              initial={prefersReducedMotion ? false : { scale: 1 }}
              animate={prefersReducedMotion ? undefined : { scale: [1, 1.05, 1] }}
              transition={prefersReducedMotion ? undefined : { duration: 2, repeat: Infinity }}
            >
              Not ready to buy?
            </motion.span>{' '}
            Get a free sample from one of our kits.
          </motion.h2>
          <motion.p
            className="mt-2 text-slate-600"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={prefersReducedMotion ? false : { opacity: 1, y: 0, transition: { delay: 0.12, duration: 0.3 } }}
          >
            We'll send you a free sample and occasional updates. Unsubscribe anytime.
          </motion.p>

          <motion.div
            className="mt-6"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={prefersReducedMotion ? false : { opacity: 1, y: 0, transition: { delay: 0.18, duration: 0.35 } }}
          >
            <LeadForm />
          </motion.div>

          <p id="sample-help" className="sr-only">We respect your privacy.</p>
        </motion.div>
      </div>
    </section>
  )
}


