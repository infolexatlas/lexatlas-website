'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useMountAnimation } from './useMountAnimation'

export function RelatedKits({ related }: { related: string[] }) {
  const mounted = useMountAnimation()
  if (!related?.length) return null
  return (
    <section className="section pt-6 md:pt-8">
      <div className="container">
        <motion.h2 className="text-2xl font-semibold tracking-tight" initial={mounted ? { opacity: 0, y: 10 } : false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>You might also like</motion.h2>
        <motion.div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3" initial={mounted ? 'hidden' : false} whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}>
          {related.map((slug) => (
            <motion.div key={slug} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="h-full">
              <Link href={`/kits/${slug}`} className="block h-full rounded-xl border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-premium hover:border-brand-gold">
                <div className="text-sm font-medium text-brand-navy">{slug.toUpperCase().replace('-', ' – ')}</div>
                <div className="mt-1 text-xs text-muted-foreground">Marriage Kit</div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


