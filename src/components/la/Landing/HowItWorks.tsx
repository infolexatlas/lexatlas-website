"use client"

import { motion } from "framer-motion"
import { fadeInUp, stagger } from "@/components/la/Motion"
import { CheckCircle2, FileCheck2, ClipboardList, Download } from "lucide-react"

const steps = [
  {
    icon: ClipboardList,
    title: "Choose your countries",
    copy: "Select the two countries involved in your marriage or recognition.",
  },
  {
    icon: FileCheck2,
    title: "Get the exact steps",
    copy: "Follow a precise, validated process with official requirements and timelines.",
  },
  {
    icon: CheckCircle2,
    title: "Avoid mistakes",
    copy: "Know documents, translations, fees, and pitfalls—no guesswork.",
  },
  {
    icon: Download,
    title: "Download instantly",
    copy: "Receive your interactive PDF kit immediately after purchase.",
  },
]

export default function HowItWorks() {
  return (
    <section aria-labelledby="howitworks-heading" className="section bg-brand-ivory">
      <div className="container">
        <div className="text-center mb-10 md:mb-12">
          <p className="eyebrow text-brand-gold mb-4">PROCESS</p>
          <motion.h2
            id="howitworks-heading"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeInUp}
            className="heading-premium text-balance"
          >
            How it works
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeInUp}
            className="subheading-premium mt-4"
          >
            4 simple steps from selection to secure download.
          </motion.p>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15%" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {steps.map((step, idx) => (
            <motion.li
              key={step.title}
              variants={fadeInUp}
              className="card p-6 md:p-8 hover-lift focus-within:shadow-premium group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl2 bg-brand-gold/20 flex items-center justify-center transition-premium group">
                  <step.icon className="w-6 h-6 text-brand-gold group-hover:scale-110 transition-transform" aria-hidden />
                </div>
                <motion.div
                  aria-hidden
                  variants={fadeInUp}
                  className="w-8 h-8 rounded-xl2 border border-brand-gold bg-white text-brand-navy flex items-center justify-center font-semibold transition-premium group-hover:scale-105 group-hover:shadow-gold-glow"
                >
                  {idx + 1}
                </motion.div>
              </div>
              <h3 className="heading-3 text-brand-navy mb-2">{step.title}</h3>
              <p className="text-brand-text leading-relaxed">{step.copy}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}


