'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { fadeInUp, useReducedMotionVariants } from '@/components/la/Motion'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { COUNTRIES, type Country } from '@/content/marriage/countries'
import { toISO3, canonicalFraSlug } from '@/lib/kits.config'

export default function CountryForm() {
  const router = useRouter()
  const [countryA, setCountryA] = useState<Country | null>(null)
  const [countryB, setCountryB] = useState<Country | null>(null)
  const [error, setError] = useState<string | null>(null)
  const variants = useReducedMotionVariants(fadeInUp)

  const onSubmit = () => {
    if (!countryA || !countryB) return
    const a3 = toISO3(countryA.code) || toISO3(countryA.name)
    const b3 = toISO3(countryB.code) || toISO3(countryB.name)
    const slug = a3 && b3 ? canonicalFraSlug(a3, b3) : null
    if (slug) {
      setError(null)
      router.push(`/kits/${slug}`)
    } else {
      setError("This pair isn't available yet. More kits are in production and released daily.")
    }
  }

  const canSubmit = !!countryA && !!countryB && countryA.code !== countryB.code

  return (
    <section id="select-countries" className="section-premium bg-white">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={variants}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="heading-1 text-brand-navy">Select 2 Countries</h2>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); onSubmit() }}
            aria-describedby={error ? 'country-form-error' : undefined}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="space-y-2">
              <Label htmlFor="country-a" className="text-brand-gold">First Country</Label>
              <Select onValueChange={(code) => {
                const c = COUNTRIES.find(c => c.code === code) || null
                setCountryA(c)
                setError(null)
              }}>
                <SelectTrigger id="country-a" className="h-12 rounded-xl2 focus:ring-brand-gold hover:border-brand-gold hover:shadow-gold-glow transition">
                  <SelectValue placeholder="Choose a country" className="group" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map(c => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country-b" className="text-brand-gold">Second Country</Label>
              <Select onValueChange={(code) => {
                const c = COUNTRIES.find(c => c.code === code) || null
                setCountryB(c)
                setError(null)
              }}>
                <SelectTrigger id="country-b" className="h-12 rounded-xl2 focus:ring-brand-gold hover:border-brand-gold hover:shadow-gold-glow transition">
                  <SelectValue placeholder="Choose a country" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map(c => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2 mt-4">
              <Button
                type="submit"
                className="w-full h-12 rounded-xl2 bg-brand-navy text-white hover:bg-brand-navy/90 hover:-translate-y-[1px] active:translate-y-[1px] transition motion-reduce:transform-none"
                aria-disabled={!canSubmit}
                disabled={!canSubmit}
              >
                View Marriage Kit
              </Button>
              {error && (
                <p id="country-form-error" className="mt-3 text-sm text-red-700 text-center">
                  {error}
                </p>
              )}
              {countryA && countryB && countryA.code === countryB.code && (
                <p className="mt-3 text-sm text-red-700 text-center">Please select two different countries</p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}


