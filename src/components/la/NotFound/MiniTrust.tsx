'use client'

import { FileCheck2, Lock, ShieldCheck, Sparkles } from 'lucide-react'

export function MiniTrust() {
  const items = [
    { icon: Lock, label: 'Secure Checkout' },
    { icon: ShieldCheck, label: 'GDPR Compliant' },
    { icon: FileCheck2, label: 'Instant Download' },
    { icon: Sparkles, label: 'Expert Reviewed' },
  ]
  return (
    <section className="pt-4 pb-2">
      <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="rounded-2xl border bg-card shadow-sm p-3 flex items-center gap-2 justify-center">
            <Icon className="h-4 w-4 text-[var(--la-accent)]" aria-hidden />
            <span className="text-xs text-[var(--la-text)]">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}


