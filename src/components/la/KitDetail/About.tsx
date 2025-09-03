'use client'
import { motion } from 'framer-motion'
import { useMountAnimation } from './useMountAnimation'

export function About({ text, compact = true }: { text: string; compact?: boolean }) {
  const mounted = useMountAnimation()
  // Typographic tweak: avoid "This" or single-letter "A" at end of line by gluing them to the next word
  const formattedText = (
    text
      // Glue starting "This " and "A " to next word
      .replace(/^This\s+/m, 'This\u00A0')
      .replace(/^A\s+/m, 'A\u00A0')
      // Glue in-sentence occurrences
      .replace(/\sThis\s/g, '\u00A0This\u00A0')
      .replace(/\sA\s/g, '\u00A0A\u00A0')
  )
  return (
    <section className={compact ? 'section pt-6 md:pt-8' : 'section'}>
      <div className="container">
        <motion.h2 key={mounted ? 'mounted-about' : 'ssr-about'} className="text-2xl font-semibold tracking-tight text-brand-navy" initial={mounted ? { opacity: 0, y: 10 } : false} animate={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          About This Kit
        </motion.h2>
        <motion.div key={mounted ? 'mounted-about-line' : 'ssr-about-line'}
          initial={mounted ? { opacity: 0, y: 6 } : false}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="mt-2 h-px w-full bg-brand-gold/50"
          aria-hidden
        />
        <motion.p
          key={mounted ? 'mounted-about-text' : 'ssr-about-text'}
          className="mt-4 text-muted-foreground max-w-none [&_strong]:text-brand-gold"
          initial={mounted ? { opacity: 0, y: 12 } : false}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
      </div>
    </section>
  )
}


