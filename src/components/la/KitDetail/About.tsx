'use client'
import { motion } from 'framer-motion'
import { useMountAnimation } from './useMountAnimation'

export function About({ text }: { text: string }) {
  const mounted = useMountAnimation()
  return (
    <section className="section">
      <div className="container">
        <motion.h2 className="text-2xl font-semibold tracking-tight" initial={mounted ? { opacity: 0, y: 10 } : false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          About This Kit
        </motion.h2>
        <motion.p className="mt-3 max-w-prose text-muted-foreground" initial={mounted ? { opacity: 0, y: 12 } : false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {text}
        </motion.p>
      </div>
    </section>
  )
}


