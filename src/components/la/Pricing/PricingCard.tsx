'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeInUp } from '@/components/la/Motion'
import { cn } from '@/lib/utils'
import { CheckCircle, Star } from 'lucide-react'
import type { ReactNode } from 'react'

type PricingCardProps = {
  id: string
  title: string
  subtitle: string
  priceCents: number
  currency: string
  ctaLabel: string
  onCta?: () => void
  ctaNode?: ReactNode
  features: string[]
  badge?: { label: string; tone?: 'gold' | 'success' }
  popular?: boolean
  className?: string
}

export default function PricingCard({
  id,
  title,
  subtitle,
  priceCents,
  currency,
  ctaLabel,
  onCta,
  ctaNode,
  features,
  badge,
  popular = false,
  className = ''
}: PricingCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const price = (priceCents / 100).toFixed(0)

  return (
    <motion.article
      aria-labelledby={`${id}-title`}
      variants={prefersReducedMotion ? undefined : fadeInUp}
      className={cn(
        'relative h-full rounded-2xl bg-white ring-1 ring-black/5 shadow-soft transition-premium hover:shadow-premium focus-within:shadow-premium group',
        popular && 'ring-brand-gold/40 bg-brand-gold/5',
        'hover-lift',
        className
      )}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <motion.span
            aria-hidden="true"
            animate={prefersReducedMotion ? undefined : { scale: [1, 1.05, 1] }}
            transition={prefersReducedMotion ? undefined : { duration: 2, repeat: Infinity }}
            className={cn(
              'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-soft',
              badge.tone === 'success' ? 'bg-emerald-700 text-white' : 'bg-brand-gold text-brand-navy'
            )}
          >
            {popular && <Star className="h-3.5 w-3.5" />}
            {badge.label}
          </motion.span>
        </div>
      )}

      <div className="px-6 pt-8 pb-2 text-center">
        <h3 id={`${id}-title`} className="heading-3 text-brand-navy">{title}</h3>
        <p className="mt-1 text-sm text-brand-textMuted">{subtitle}</p>
        <div className="mt-4 text-4xl font-bold text-brand-gold">
          <motion.span
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 4 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? undefined : { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            className="inline-block will-change-transform transition-transform duration-250 ease-out group-hover:-translate-y-0.5 group-hover:scale-[1.02]"
          >
            {price} {currency === 'EUR' ? '€' : currency}
          </motion.span>
        </div>
      </div>

      <ul className="px-6 pb-6 space-y-3 min-h-[10rem]">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-700 mt-0.5 flex-shrink-0" />
            <span className="text-brand-textMuted">{f}</span>
          </li>
        ))}
      </ul>

      <div className="px-6 pb-6">
        {ctaNode ? (
          ctaNode
        ) : (
          <motion.button
            onClick={onCta}
            whileHover={prefersReducedMotion ? undefined : { y: -1, scale: 1.01 }}
            whileTap={prefersReducedMotion ? undefined : { y: 0, scale: 0.99 }}
            className={cn(
              'w-full rounded-2xl bg-brand-navy text-white font-semibold',
              'px-6 py-4 text-base md:text-lg',
              'shadow-soft hover:shadow-premium hover:shadow-gold-glow transition-premium',
              'focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white'
            )}
          >
            {ctaLabel}
          </motion.button>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-brand-gold/60" />
    </motion.article>
  )
}


