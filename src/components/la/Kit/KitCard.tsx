import Link from 'next/link'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/kit-routes'
import type { CountryPair } from '@/lib/kits-country-data'

type Props = { pair: CountryPair; index: number }

export function KitCard({ pair, index }: Props) {
  return (
    <article
      aria-labelledby={`kit-${pair.id}-title`}
      className="group rounded-2xl bg-white/80 backdrop-blur ring-1 ring-black/5 shadow-soft transition-premium hover:ring-brand-gold/40 hover:shadow-gold-glow hover:-translate-y-[1px] motion-reduce:transform-none motion-reduce:transition-none"
    >
      <div className="p-6 pb-4">
        <p className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium text-brand-navy bg-brand-navy/10 ring-1 ring-brand-navy/15 transition-all duration-300 ease-out hover:bg-brand-gold hover:text-brand-deep hover:ring-brand-gold/40 hover:shadow-gold-glow hover:scale-[1.02] group-hover:bg-brand-gold group-hover:text-brand-deep group-hover:ring-brand-gold/40 group-hover:shadow-gold-glow motion-reduce:transform-none motion-reduce:transition-none">
          {pair.iso}
        </p>
        <h3 id={`kit-${pair.id}-title`} className="mt-3 text-lg font-semibold text-brand-navy">{pair.label}</h3>
        <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
          {pair.features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-brand-gold" aria-hidden="true" /> {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="px-6 py-4 border-t border-slate-200">
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold text-brand-navy">{pair.price} €</span>
          <span className="text-sm text-slate-600">One-time purchase</span>
        </div>
        <Button asChild className="mt-4 w-full" variant="default">
          <Link href={ROUTES.getKit(pair.id)}>Get Marriage Kit</Link>
        </Button>
      </div>
    </article>
  )
}


