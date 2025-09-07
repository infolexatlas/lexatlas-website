'use client'

import * as React from 'react'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

export type PlanKey = 'single' | 'bundle3' | 'full'

export type FeatureRow = {
  id: string
  label: string
  hint?: string
  values: Record<PlanKey, boolean | string | number>
  emphasize?: boolean
}

export type ComparisonConfig = {
  heading?: string
  subheading?: string
  plans: Array<{
    key: PlanKey
    name: string
    price: string
    badge?: string
    ctaLabel: string
    ctaHref: string
    highlight?: boolean
  }>
  features: FeatureRow[]
}

export const comparisonConfig: ComparisonConfig = {
  heading: 'Compare plans',
  subheading: 'Choose the value that fits your situation. Instant download and lifetime access on every plan.',
  plans: [
    { key: 'single', name: 'Single Kit', price: '29 €', ctaLabel: 'Choose Country Pair', ctaHref: '/pricing#pricing-cards-title' },
    { key: 'bundle3', name: 'Bundle of 3', price: '75 €', badge: 'Most Popular', ctaLabel: 'Choose 3 Pairs', ctaHref: '/pricing#pricing-cards-title', highlight: true },
    { key: 'full', name: 'Full Pack', price: '200 €', badge: 'Save 31%', ctaLabel: 'Get Full Pack – 200 €', ctaHref: '/pricing#pricing-cards-title' },
  ],
  features: [
    { id: 'pairs', label: 'Country pairs included', values: { single: 1, bundle3: 3, full: 10 }, emphasize: true },
    { id: 'savings', label: 'Savings versus Single', values: { single: '—', bundle3: 'Save 14%', full: 'Save 31%' } },
    { id: 'mix', label: 'Mix & match country pairs', values: { single: false, bundle3: true, full: true } },
    { id: 'updates', label: 'Lifetime updates to selected kits', hint: 'We refresh guides as rules evolve', values: { single: 'For 1 pair', bundle3: 'For 3 pairs', full: 'All 10 pairs' } },
    { id: 'priority', label: 'Priority support (email)', values: { single: false, bundle3: true, full: true } },
    { id: 'delivery', label: 'Instant download (PDF)', values: { single: true, bundle3: true, full: true } },
    { id: 'verified', label: 'Verified with official sources', values: { single: true, bundle3: true, full: true } },
  ],
}

const isTrue = (v: any) => v === true
const isFalse = (v: any) => v === false

export default function PricingComparison({ config = comparisonConfig }: { config?: ComparisonConfig }) {
  const { heading, subheading, plans, features } = config
  const prefersReducedMotion = useReducedMotion()

  const track = (event: string, props?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).plausible) {
      ;(window as any).plausible(event, { props })
    }
  }

  return (
    <section className="section-premium pt-8 lg:pt-10" aria-labelledby="comparison-heading">
      <div className="container">
        <header className="mb-4 text-center md:mb-6">
          <h2 id="comparison-heading" className="heading-2 text-brand-navy">{heading}</h2>
          {subheading && (
            <p className="lede mx-auto mt-2 max-w-2xl text-brand-textMuted">{subheading}</p>
          )}
        </header>

        <div className="overflow-x-auto rounded-2xl bg-white">
          <table className="w-full border-collapse text-sm md:text-base">
            <caption className="sr-only">Feature comparison across Single, Bundle of 3, and Full Pack</caption>
            <thead>
              <tr className="border-b border-brand-gray">
                <th className="sticky left-0 z-10 bg-white px-3 py-3 text-left">
                  <span className="sr-only">Feature</span>
                </th>
                {plans.map((p) => (
                  <th key={p.key} scope="col" className="px-3 py-3 text-left align-bottom border-l border-brand-gray">
                    <div className={`relative rounded-xl2 border p-4 ${p.highlight ? 'ring-1 ring-brand-gold bg-brand-gold/5' : ''}`}>
                      <div className="text-sm text-brand-textMuted">{p.name}</div>
                      <div className="mt-1 text-xl font-semibold text-brand-gold">{p.price}</div>
                      {p.badge && (
                        <motion.div
                          initial={prefersReducedMotion ? undefined : { scale: 1 }}
                          animate={prefersReducedMotion ? undefined : { scale: [1, 1.05, 1] }}
                          transition={prefersReducedMotion ? undefined : { duration: 2, repeat: Infinity }}
                          className="absolute -top-2 right-2 select-none rounded-full bg-white px-2 py-1 text-xs font-medium text-brand-navy/80 shadow-soft"
                          aria-label={p.badge}
                        >
                          {p.badge}
                        </motion.div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((row) => (
                <tr key={row.id} className="group border-b border-brand-gray last:border-0">
                  <th
                    scope="row"
                    className={`sticky left-0 z-10 bg-white px-3 py-3 text-left ${
                      row.emphasize ? 'font-medium text-brand-navy' : 'text-brand-textMuted'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{row.label}</span>
                      {row.hint && <span className="text-xs text-brand-textMuted/80">{row.hint}</span>}
                    </div>
                  </th>

                  {plans.map((p) => {
                    const v = row.values[p.key]
                    return (
                      <td key={p.key} className={`px-3 py-3 align-middle border-l border-brand-gray ${p.highlight ? 'bg-brand-gold/5' : ''}`}>
                        {isTrue(v) && (
                          <Check className="h-5 w-5 text-brand-gold" aria-label="Included" />
                        )}
                        {isFalse(v) && (
                          <X className="h-5 w-5 text-slate-300" aria-label="Not included" />
                        )}
                        {!isTrue(v) && !isFalse(v) && (
                          <span className="whitespace-nowrap text-brand-textMuted">{String(v)}</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}

              <tr className="border-t border-brand-gray">
                <td className="px-3 py-4" />
                {plans.map((p) => (
                  <td key={p.key} className="px-3 py-4">
                    {p.key === 'single' && (
                      <Button className={`w-full rounded-2xl ${p.highlight ? 'hover:shadow-gold-glow' : ''}`} onClick={() => { track('checkout_click', { type: p.key }); (window as any).LA_pricing?.openSingle?.() }}>
                        {p.ctaLabel}
                      </Button>
                    )}
                    {p.key === 'bundle3' && (
                      <Button className={`w-full rounded-2xl ${p.highlight ? 'hover:shadow-gold-glow' : ''}`} onClick={() => { track('checkout_click', { type: p.key }); (window as any).LA_pricing?.openBundle3?.() }}>
                        {p.ctaLabel}
                      </Button>
                    )}
                    {p.key === 'full' && (
                      <Button className={`w-full rounded-2xl ${p.highlight ? 'hover:shadow-gold-glow' : ''}`} onClick={() => { track('checkout_click', { type: p.key }); (window as any).LA_pricing?.buyFull?.() }}>
                        {p.ctaLabel}
                      </Button>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}


