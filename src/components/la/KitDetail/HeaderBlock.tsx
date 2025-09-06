'use client'
import { motion, type Variants } from 'framer-motion'
import { useMountAnimation } from './useMountAnimation'
import * as React from 'react'

export function HeaderBlock({ title, lede, right, compact = false }: { title: React.ReactNode; lede: string; right?: React.ReactNode; compact?: boolean }) {
  const mounted = useMountAnimation()
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 18, filter: 'blur(2px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
    exit: { opacity: 0, y: -12, filter: 'blur(2px)', transition: { duration: 0.3 } },
  }
  const ledeVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
  }
  const rightVariants: Variants = {
    hidden: { opacity: 0, scale: 0.96, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, delay: 0.15 } },
    exit: { opacity: 0, scale: 0.96, y: -10, transition: { duration: 0.25 } },
  }
  return (
    <section className={compact ? 'py-10 md:py-14' : 'section'}>
      <div className="container">
        <div className="flex justify-between gap-4 items-start md:items-center">
          <div className="min-w-0 flex-1">
            <motion.h1 key={mounted ? 'mounted' : 'ssr'}
              className="text-3xl font-bold tracking-tight md:text-4xl"
              initial={mounted ? 'hidden' : false}
              animate="visible"
              exit="exit"
              viewport={{ once: true, margin: '-10% 0%' }}
              variants={titleVariants}
            >
              {title}
            </motion.h1>
            <motion.p key={mounted ? 'mounted-p' : 'ssr-p'}
              className="lede mt-2 max-w-2xl text-muted-foreground"
              initial={mounted ? 'hidden' : false}
              animate="visible"
              exit="exit"
              viewport={{ once: true, margin: '-10% 0%' }}
              variants={ledeVariants}
            >
              {lede}
            </motion.p>
            <motion.div
              className="mt-3 text-sm text-muted-foreground"
              initial={mounted ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0%' }}
              transition={{ duration: 0.45, delay: 0.15 }}
            >
              Instant download · One-time payment · Lifetime access
            </motion.div>
          </div>
          {right && (
            <motion.div key={mounted ? 'mounted-right' : 'ssr-right'} className="hidden md:block shrink-0" aria-hidden initial={mounted ? 'hidden' : false} animate="visible" exit="exit" viewport={{ once: true, margin: '-10% 0%' }} variants={rightVariants}>
              {right}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}


