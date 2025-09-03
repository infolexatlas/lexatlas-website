'use client'
import { ShieldCheck, Lock, Timer, BadgeCheck } from 'lucide-react'

export function TrustStrip() {
  const items = [
    { icon: ShieldCheck, label: 'GDPR Compliant', sub: 'Your data is protected' },
    { icon: Lock, label: 'Secure Checkout', sub: '256‑bit SSL encryption' },
    { icon: Timer, label: 'Instant Download', sub: 'Get your guide immediately' },
    { icon: BadgeCheck, label: 'Expert Verified', sub: 'Legal professionals reviewed' },
  ]
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
      {items.map(({ icon: Icon, label, sub }) => (
        <div
          key={label}
          className="rounded-xl border bg-card p-4 shadow-sm hover:shadow-premium hover:border-brand-gold transition-all duration-300 animate-reveal"
        >
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-[color:var(--la-accent)]" aria-hidden="true" />
            <div className="font-medium">{label}</div>
          </div>
          <div className="text-xs text-muted-foreground">{sub}</div>
        </div>
      ))}
    </div>
  )
}


