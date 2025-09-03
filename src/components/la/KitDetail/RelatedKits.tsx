'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useMountAnimation } from './useMountAnimation'

export function RelatedKits({ related }: { related: string[] }) {
  const mounted = useMountAnimation()
  if (!related?.length) return null
  return (
    <section className="section">
      <div className="container">
        <motion.h2 className="text-2xl font-semibold tracking-tight" initial={mounted ? { opacity: 0, y: 10 } : false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>You might also like</motion.h2>
        <motion.div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3" initial={mounted ? 'hidden' : false} whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}>
          {related.map((slug) => (
            <motion.div key={slug} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
              <Link href={`/kits/${slug}`} className="rounded-xl border bg-card p-4 shadow-sm transition hover:-translate-y-0.5">
                <div className="text-sm">{slug.toUpperCase().replace('-', ' – ')}</div>
                <div className="text-xs text-muted-foreground">Marriage Kit</div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


