'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { track } from '@/lib/analytics'
import { motion } from 'framer-motion'
import { useMountAnimation } from './useMountAnimation'

export function BuyBox({ priceEUR, slug }: { priceEUR: number; slug: string }) {
  const mounted = useMountAnimation()
  const checkoutHref = `/checkout?kit=${encodeURIComponent(slug)}`
  const sampleHref = `/kits/${slug}/sample`
  return (
    <motion.aside
      className="rounded-2xl border bg-card p-5 shadow-sm hover:shadow-premium hover:border-brand-gold transition-all duration-300"
      initial={mounted ? { opacity: 0, y: 16, scale: 0.98 } : false}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-10% 0%' }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="text-3xl font-bold">{priceEUR} €</div>
      <div className="mt-1 text-xs text-muted-foreground">One-time payment • Lifetime access</div>
      <div className="mt-4 space-y-3">
        <Button
          asChild
          className="w-full gold-hover"
          onClick={() => track('checkout_click', { type: 'single', pair: slug })}
        >
          <Link href={checkoutHref}>Buy Now</Link>
        </Button>
        <Button asChild variant="secondary" className="w-full" onClick={() => track('lead_magnet_submit', { source: 'kit_detail', pair: slug })}>
          <Link href={sampleHref}>Download Sample Kit</Link>
        </Button>
        <div className="pt-2 text-xs text-muted-foreground">Secure payments by Stripe • 256‑bit SSL</div>
      </div>
    </motion.aside>
  )
}


