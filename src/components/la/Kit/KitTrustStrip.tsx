"use client"

import Image from 'next/image'
import { ShieldCheck, Download, Lock, BadgeCheck } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

type Props = {
  showGrid?: boolean
  showLogo?: boolean
}

export function KitTrustStrip({ showGrid = true, showLogo = true }: Props) {
  const items = [
    { icon: ShieldCheck, label: 'GDPR Compliant' },
    { icon: Lock, label: 'Secure Checkout (256‑bit SSL)' },
    { icon: Download, label: 'Instant Download' },
    { icon: BadgeCheck, label: 'Expert Verified' },
  ]

  const prefersReducedMotion = useReducedMotion()
  return (
    <section aria-labelledby="trust-strip-heading" className="py-10 bg-white">
      <h2 id="trust-strip-heading" className="sr-only">Trust and assurances</h2>
      <div className="container">
        {showGrid && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {items.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  layout
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={prefersReducedMotion ? false : { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.05 } }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: 12, transition: { duration: 0.2 } }}
                  className="flex items-center gap-3 rounded-2xl ring-1 ring-black/5 bg-white p-4 shadow-soft transition-premium hover:ring-brand-gold/50 hover:shadow-gold-glow hover:-translate-y-[1px] motion-reduce:transform-none"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gold/10" aria-hidden="true">
                    <Icon className="h-5 w-5 text-brand-gold" />
                  </div>
                  <p className="text-sm text-slate-800">{label}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {showLogo && (
          <div className="mt-6 flex items-center justify-center">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={prefersReducedMotion ? false : { opacity: 1, y: 0, transition: { duration: 0.35 } }}
              whileHover={prefersReducedMotion ? undefined : { y: -1, scale: 1.02 }}
              className="rounded-xl bg-brand-navy px-4 py-2 ring-1 ring-black/5 transition-premium hover:ring-brand-gold/30 hover:shadow-gold-glow"
            >
              <Image src="/logo/lexatlas.svg" alt="LexAtlas" width={120} height={28} />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}


