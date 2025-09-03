'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, useReducedMotionVariants } from '@/components/la/Motion'
import { Sparkles, ShieldCheck, RefreshCcw } from 'lucide-react'

const features = [
  { icon: Sparkles, title: 'Growing Daily', desc: 'New country pair kits released every day based on demand.' },
  { icon: ShieldCheck, title: 'Expert-Reviewed', desc: 'Guides vetted by legal researchers for accuracy and clarity.' },
  { icon: RefreshCcw, title: 'Always Updated', desc: 'We track policy changes to keep your guidance current.' },
]

export default function WhyChoose() {
  const container = useReducedMotionVariants(staggerContainer)
  const item = useReducedMotionVariants(fadeInUp)
  return (
    <section className="pt-16 lg:pt-24 pb-10 lg:pb-14 bg-white">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="heading-1 text-brand-navy">Why Choose <span className="text-brand-gold">LexAtlas?</span></h2>
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={container}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map(f => (
            <motion.article
              key={f.title}
              variants={item}
              whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.18, ease: [0.2,0.8,0.2,1] } }}
              className="group card p-6 rounded-2xl border bg-card shadow-sm transition will-change-transform motion-reduce:transform-none"
            >
              <div className="flex items-center gap-3">
                <div aria-hidden className="h-10 w-10 rounded-xl grid place-items-center bg-white border">
                  <f.icon className="h-5 w-5 text-brand-gold" />
                </div>
                <h3 className="heading-3 text-brand-navy">{f.title}</h3>
              </div>
              <p className="mt-2 text-brand-textMuted">{f.desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


