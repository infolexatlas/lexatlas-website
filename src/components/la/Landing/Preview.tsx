'use client'

import { motion } from "framer-motion"
import { fadeInUp } from "@/components/la/Motion"

export default function Preview() {
  return (
    <section aria-labelledby="preview-heading" className="section bg-brand-muted">
      <div className="container">
        <div className="text-center mb-10 md:mb-12">
          <p className="eyebrow text-brand-gold mb-4">PREVIEW</p>
          <motion.h2
            id="preview-heading"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeInUp}
            className="heading-premium text-balance"
          >
            See what's inside
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeInUp}
            className="subheading-premium mt-4"
          >
            Get a glimpse of the comprehensive guides and resources included in each kit.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15%" }}
          variants={fadeInUp}
          className="text-center"
        >
          <div className="inline-block p-8 bg-white rounded-2xl shadow-soft">
            <p className="text-brand-textMuted">
              Preview content coming soon...
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
