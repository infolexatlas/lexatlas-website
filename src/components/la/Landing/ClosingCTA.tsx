"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp, stagger } from "@/components/la/Motion"
import { Section } from "@/components/ui/section"
import { ArrowRight, Mail } from 'lucide-react'

export default function ClosingCTA() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-brand-navy to-brand-navyEdge relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(212,175,55,0.3)_1px,transparent_0)] bg-[length:20px_20px]" />
      </div>
      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4">
            <span className="text-sm font-medium text-brand-gold uppercase tracking-wider">Ready to get started?</span>
          </div>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-white tracking-tight mb-6">
            Your Cross‑Border Marriage Journey Starts Here
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
            Clear guidance. Verified steps. Instant access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Link href="/kits" className="inline-flex items-center justify-center rounded-xl2 text-base px-8 py-3 bg-white text-brand-navy font-semibold shadow-soft hover:shadow-premium hover:scale-105 transition-premium">
              Browse kits
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-xl2 text-base px-8 py-3 border-2 border-brand-gold bg-brand-gold text-brand-navy font-semibold shadow-soft hover:shadow-premium hover:scale-105 transition-premium">
              Contact our team
              <Mail className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 lg:p-8 border border-white/20">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-brand-gold mb-2">10</div>
                <div className="text-white/80 text-sm">Countries covered</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-brand-gold mb-2">247</div>
                <div className="text-white/80 text-sm">Couples helped</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-brand-gold mb-2">24/7</div>
                <div className="text-white/80 text-sm">Support available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


