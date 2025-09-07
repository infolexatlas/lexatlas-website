"use client"

import { motion, useReducedMotion } from "framer-motion"
import { fadeInUp, stagger } from "@/components/la/Motion"
import { Shield, Lock, DownloadCloud, CheckCircle2 } from "lucide-react"

const items = [
  { icon: Shield, title: "Expert reviewed", copy: "Built and checked by international jurists." },
  { icon: Lock, title: "Secure checkout", copy: "Payment and data protected. GDPR compliant." },
  { icon: DownloadCloud, title: "Instant download", copy: "Access your PDF kit immediately." },
  { icon: CheckCircle2, title: "Clear & practical", copy: "Step‑by‑step with checklists and templates." },
]

export default function Trust() {
  const reduce = useReducedMotion()
  return (
    <section aria-labelledby="trust-heading" className="section bg-brand-ivory">
      <div className="container">
        <div className="text-center mb-10 md:mb-12">
          <motion.h2
            id="trust-heading"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeInUp}
            className="heading-premium text-balance"
          >
            Confidence, built‑in
          </motion.h2>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15%" }}
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {items.map((it) => (
            <motion.li
              key={it.title}
              variants={fadeInUp}
              className="card p-4 md:p-6 text-center hover-lift group relative overflow-hidden"
              whileHover={reduce ? undefined : { y: -3 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{background: 'radial-gradient(220px 80px at 80% 0%, rgba(212,175,55,0.08), transparent 60%)'}} aria-hidden />
              <div className="mx-auto w-10 h-10 rounded-xl2 bg-brand-gold/20 flex items-center justify-center mb-3 transition-transform group-hover:scale-105">
                <it.icon className="w-5 h-5 text-brand-gold" aria-hidden />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-brand-navy mb-1">{it.title}</h3>
              <p className="text-xs md:text-sm text-brand-textMuted leading-relaxed">{it.copy}</p>
              <span aria-hidden className="absolute inset-0 rounded-xl2 ring-0 group-hover:ring-2 group-hover:ring-brand-gold/40 transition-[box-shadow,transform]" />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}


