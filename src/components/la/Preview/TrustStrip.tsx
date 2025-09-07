'use client'

import { ShieldCheck, FileCheck2, Lock, Sparkles } from 'lucide-react'

const items = [
  { icon: Lock, label: 'Secure Checkout' },
  { icon: ShieldCheck, label: 'GDPR Compliant' },
  { icon: FileCheck2, label: 'Instant Download' },
  { icon: Sparkles, label: 'Expert Reviewed' },
]

export function TrustStrip() {
  return (
    <section className="pt-0 pb-1 -mt-12 md:-mt-14">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="rounded-2xl border bg-card shadow-sm p-4 flex items-center gap-3">
            <Icon className="h-5 w-5 text-[var(--la-accent)]" aria-hidden />
            <span className="text-sm text-[var(--la-text)]">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}


