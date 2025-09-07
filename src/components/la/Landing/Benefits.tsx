"use client"

import { motion, useReducedMotion } from "framer-motion"
import { fadeInUp, stagger } from "@/components/la/Motion"
import { ShieldCheck, Clock, PiggyBank, RefreshCcw } from "lucide-react"

const features = [
  {
    icon: ShieldCheck,
    title: "Verified guidance",
    copy: "Built from current laws and consular practice. Expert reviewed.",
  },
  { icon: Clock, title: "Instant access", copy: "Download right after checkout. Start today." },
  { icon: PiggyBank, title: "Affordable expertise", copy: "Clarity without €€€ legal fees." },
  { icon: RefreshCcw, title: "Lifetime updates", copy: "Get revisions when rules change." },
]

export default function Benefits() {
  const reduce = useReducedMotion()
  return (
    <section aria-labelledby="benefits-heading" className="section">
      <div className="container">
        <div className="text-center mb-10 md:mb-12">
          <p className="eyebrow text-brand-gold mb-4">WHY LEXATLAS</p>
          <motion.h2
            id="benefits-heading"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeInUp}
            className="heading-premium text-balance"
          >
            The better way to handle cross‑border marriage
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeInUp}
            className="subheading-premium mt-4"
          >
            Better than DIY guesswork. More affordable than a lawyer.
          </motion.p>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15%" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {features.map((f) => (
            <motion.li
              key={f.title}
              variants={fadeInUp}
              className="card p-6 md:p-8 hover-lift focus-within:shadow-premium relative overflow-hidden group"
              whileHover={reduce ? undefined : { y: -4 }}
              whileTap={reduce ? undefined : { y: -1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-premium" style={{background: 'radial-gradient(600px 200px at 80% 0%, rgba(212,175,55,0.08), transparent 60%)'}} aria-hidden />
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-brand-gold/10" aria-hidden />
              <div className="w-12 h-12 rounded-xl2 bg-brand-gold/20 flex items-center justify-center mb-4 transition-premium group">
                <f.icon className="w-6 h-6 text-brand-gold group-hover:scale-110 transition-transform" aria-hidden />
              </div>
              <h3 className="heading-3 text-brand-navy mb-2">{f.title}</h3>
              <span aria-hidden className="block h-[2px] bg-brand-gold/70 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
              <p className="text-brand-text leading-relaxed">{f.copy}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}


