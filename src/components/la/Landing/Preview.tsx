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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Preview Image 1 */}
          <div className="group">
            <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src="/product-previews/1.png"
                alt="LexAtlas Kit Preview - Document 1"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Preview Image 2 */}
          <div className="group">
            <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src="/product-previews/2.png"
                alt="LexAtlas Kit Preview - Document 2"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Preview Image 3 */}
          <div className="group">
            <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src="/product-previews/3.png"
                alt="LexAtlas Kit Preview - Document 3"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Preview Image 4 */}
          <div className="group">
            <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src="/product-previews/4.png"
                alt="LexAtlas Kit Preview - Document 4"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
