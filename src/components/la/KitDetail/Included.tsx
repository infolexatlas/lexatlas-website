'use client'
import { Check } from 'lucide-react'

export function Included({ items, inline = false }: { items: string[]; inline?: boolean }) {
  const content = (
    <>
      <h2 className="text-2xl font-semibold tracking-tight animate-reveal">What’s Included</h2>
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {items.map((it) => (
          <li
            key={it}
            className="flex items-start gap-2 rounded-xl border bg-card p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-premium hover:border-brand-gold animate-reveal"
          >
            <Check className="mt-0.5 h-5 w-5 text-[color:var(--la-accent)]" aria-hidden="true" />
            <span className="text-sm">{it}</span>
          </li>
        ))}
      </ul>
    </>
  )

  if (inline) return content

  return (
    <section className="section">
      <div className="container">{content}</div>
    </section>
  )
}


