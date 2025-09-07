"use client"

import type { CountryPair } from '@/lib/kits-country-data'
import { KitCard } from './KitCard'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

type Props = { pairs: CountryPair[] }

export function KitGrid({ pairs }: Props) {
  const prefersReducedMotion = useReducedMotion()
  const variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] as any } },
    exit: { opacity: 0, y: 16, transition: { duration: 0.2 } },
  }
  return (
    <section aria-labelledby="kits-grid-heading" className="section-premium">
      <h2 id="kits-grid-heading" className="sr-only">Available marriage kits</h2>
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {pairs.map((pair, i) => (
              <motion.div
                key={pair.id}
                layout
                variants={variants}
                initial={false}
                animate={prefersReducedMotion ? false : 'show'}
                exit={prefersReducedMotion ? undefined : 'exit'}
                transition={prefersReducedMotion ? undefined : { delay: i * 0.05 }}
              >
                <KitCard pair={pair} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}


