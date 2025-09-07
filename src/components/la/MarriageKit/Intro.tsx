'use client'

import { motion } from 'framer-motion'
import { fadeInUp, useReducedMotionVariants } from '@/components/la/Motion'

export default function Intro() {
  const variants = useReducedMotionVariants(fadeInUp)
  return (
    <section className="bg-white pt-20 lg:pt-28 pb-10 lg:pb-14">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={variants}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="heading-display text-brand-navy text-balance">
            International <span className="text-brand-gold">Marriage Kits</span>
          </h1>
          <p className="mt-6 lede text-brand-textMuted text-balance">
            Navigate the complexities of international marriage with our expert-built guides. Choose two countries to get a comprehensive PDF guide tailored to your specific situation.
          </p>
          <p className="mt-4 text-sm text-brand-deep/80">
            Currently, 10 country pair kits are available. New kits released daily — check back for updates.
          </p>
        </motion.div>
      </div>
    </section>
  )
}


