'use client'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useMountAnimation } from './useMountAnimation'

export function Included({ items, inline = false }: { items: string[]; inline?: boolean }) {
  const mounted = useMountAnimation()
  const content = (
    <>
      <motion.h2
        className="text-2xl font-semibold tracking-tight"
        initial={mounted ? { opacity: 0, y: 10 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        What’s Included
      </motion.h2>
      <motion.ul
        className="mt-4 grid gap-3 md:grid-cols-2"
        initial={mounted ? 'hidden' : false}
        whileInView="visible"
        viewport={{ once: true, margin: '-10% 0%' }}
        variants={{
          hidden: { opacity: 1 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
      >
        {items.map((it) => (
          <motion.li
            key={it}
            className="flex items-start gap-2 rounded-xl border bg-card p-3 shadow-sm hover:shadow-premium hover:border-brand-gold transition-all duration-300"
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ y: -2, scale: 1.01 }}
            transition={{ duration: 0.35 }}
          >
            <Check className="mt-0.5 h-5 w-5 text-[color:var(--la-accent)]" aria-hidden="true" />
            <span className="text-sm">{it}</span>
          </motion.li>
        ))}
      </motion.ul>
    </>
  )

  if (inline) return content

  return (
    <section className="section">
      <div className="container">{content}</div>
    </section>
  )
}


