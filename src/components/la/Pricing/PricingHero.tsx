'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/components/la/Motion'

type PricingHeroProps = {
  className?: string
}

export default function PricingHero({ className = '' }: PricingHeroProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className={`section-premium relative overflow-hidden ${className}`} aria-labelledby="pricing-hero-title">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-ivory via-white to-brand-ivory" aria-hidden="true" />
      <div className="container relative">
        <motion.div
          variants={prefersReducedMotion ? undefined : staggerContainer}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          animate={prefersReducedMotion ? undefined : 'show'}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div variants={prefersReducedMotion ? undefined : fadeInUp} className="mb-6">
            <span className="text-sm font-medium text-brand-gold uppercase tracking-wider">Pricing</span>
          </motion.div>
          <motion.h1
            id="pricing-hero-title"
            variants={prefersReducedMotion ? undefined : fadeInUp}
            className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-brand-navy tracking-tight mb-6 leading-tight"
          >
            Choose Your <span className="text-brand-gold">Package</span>
          </motion.h1>
          <motion.p
            variants={prefersReducedMotion ? undefined : fadeInUp}
            className="text-xl lg:text-2xl text-brand-textMuted max-w-3xl mx-auto leading-relaxed"
          >
            Select the perfect marriage kit option for your needs. Instant download and lifetime access included.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}


