

'use client'
export const dynamic = 'force-dynamic'

import { Suspense, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { track } from '@/lib/analytics'

const ISO3: Record<string, string> = { fra: 'France', usa: 'United States', gbr: 'United Kingdom', can: 'Canada', mar: 'Morocco', deu: 'Germany', che: 'Switzerland', bel: 'Belgium', esp: 'Spain', ita: 'Italy', prt: 'Portugal' }

function titleFromSlug(slug?: string) {
  if (!slug) return 'Your Marriage Kit'
  const [a, b] = slug.toLowerCase().split('-')
  if (!ISO3[a] || !ISO3[b]) return 'Your Marriage Kit'
  return `${ISO3[a]} – ${ISO3[b]} Marriage Kit`
}

const fadeInUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] as any } },
}

const containerStagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

function SuccessInner() {
  const sp = useSearchParams()
  const kit = sp.get('kit') || ''
  const sessionId = sp.get('session_id') || ''
  const title = useMemo(() => titleFromSlug(kit), [kit])
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    track('checkout_success', { type: 'single', items_count: 1, session_id: sessionId || undefined, kit: kit || undefined })
  }, [kit, sessionId])

  const downloadHref = useMemo(() => {
    if (!kit) return ''
    const [a, b] = kit.toUpperCase().split('-')
    if (!a || !b) return ''
    const params = new URLSearchParams()
    params.set('country1', a)
    params.set('country2', b)
    params.set('pair', `${a}-${b}`)
    if (sessionId) params.set('session_id', sessionId)
    return `/api/download?${params.toString()}`
  }, [kit, sessionId])

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
              { '@type': 'ListItem', position: 2, name: 'Success' },
            ],
          }),
        }}
      />

      {/* Confirmation Hero */}
      <section className="py-16 lg:py-24 bg-brand-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.7 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={prefersReducedMotion ? undefined : { type: 'spring', stiffness: 220, damping: 18 }}
            aria-hidden
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-deep text-brand-gold shadow-soft text-3xl"
          >
            ✓
          </motion.div>
          <motion.h1
            className="text-3xl font-serif font-bold tracking-tight text-brand-deep md:text-4xl lg:text-5xl"
            variants={fadeInUp}
            initial="hidden"
            animate="show"
          >
            Payment Successful
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-brand-textMuted"
            variants={fadeInUp}
            initial="hidden"
            animate="show"
          >
            Thank you for your purchase. Your kit is ready to download.
          </motion.p>
          <div className="mt-2 text-sm text-brand-textMuted">Instant download • Lifetime access • One‑time payment</div>
        </div>
      </section>

      {/* Primary CTA Card */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-xl rounded-2xl border-2 border-brand-gold/20 bg-brand-gold/5 p-6 text-center shadow-soft"
            variants={containerStagger}
            initial={prefersReducedMotion ? undefined : 'hidden'}
            animate={prefersReducedMotion ? undefined : 'show'}
          >
            <motion.div className="text-sm text-brand-gold font-medium" variants={fadeInUp}>You purchased</motion.div>
            <motion.div className="mt-1 text-lg font-serif font-semibold text-brand-deep" variants={fadeInUp}>{title}</motion.div>
            <motion.div className="mt-6 grid gap-3 sm:grid-cols-2" variants={fadeInUp}>
              {downloadHref ? (
                <motion.a
                  href={downloadHref}
                  download
                  aria-label="Download your purchased marriage kit"
                  className="inline-flex items-center justify-center rounded-xl bg-brand-deep text-white px-6 py-3 font-medium transition hover:bg-brand-deep/90 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold active:translate-y-[1px]"
                  onClick={() => track('kit_download_click', { kit: kit || undefined })}
                >
                  Download Your Kit
                </motion.a>
              ) : (
                <motion.div
                  className="inline-flex items-center justify-center rounded-xl bg-brand-deep text-white px-6 py-3 font-medium transition hover:bg-brand-deep/90 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold active:translate-y-[1px]"
                >
                  <Link href="/kit">Browse Kits</Link>
                </motion.div>
              )}
              <motion.div
                className="inline-flex items-center justify-center rounded-xl border-2 border-brand-deep text-brand-deep px-6 py-3 font-medium transition hover:bg-brand-deep hover:text-white hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold active:translate-y-[1px]"
                onClick={() => track('contact_support_click', { from: 'success', kit: kit || undefined })}
                variants={fadeInUp}
              >
                <Link href="/contact">Contact Support</Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      

    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <SuccessInner />
    </Suspense>
  )
}
