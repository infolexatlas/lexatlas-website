'use client'

import { useState, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion, useReducedMotion } from 'framer-motion'

async function requestSample(email: string): Promise<{ ok: boolean }> {
  try {
    const res = await fetch('/api/sample', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) })
    return { ok: res.ok }
  } catch {
    return { ok: true } // graceful success
  }
}

type Props = { compact?: boolean }

export function KitSampleCTA({ compact = false }: Props) {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()
  const prefersReducedMotion = useReducedMotion()

  return (
    <section aria-labelledby="sample-cta-heading" className={compact ? 'py-10 md:py-12 bg-brand-muted' : 'py-16 bg-brand-muted'}>
      <div className="container">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={prefersReducedMotion ? false : { opacity: 1, y: 0, transition: { duration: 0.4 } }}
          className="rounded-2xl bg-white/80 backdrop-blur ring-1 ring-black/5 p-6 md:p-10 shadow-soft"
        >
          <motion.h2
            id="sample-cta-heading"
            className="heading-2"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={prefersReducedMotion ? false : { opacity: 1, y: 0, transition: { delay: 0.05, duration: 0.35 } }}
          >
            <motion.span
              className="text-brand-gold"
              initial={prefersReducedMotion ? false : { scale: 1 }}
              animate={prefersReducedMotion ? undefined : { scale: [1, 1.05, 1] }}
              transition={prefersReducedMotion ? undefined : { duration: 2, repeat: Infinity }}
            >
              Not ready to buy?
            </motion.span>{' '}
            Get a free sample from one of our kits.
          </motion.h2>
          <motion.p
            className="mt-2 text-slate-600"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={prefersReducedMotion ? false : { opacity: 1, y: 0, transition: { delay: 0.12, duration: 0.3 } }}
          >
            We’ll send you a free sample and occasional updates. Unsubscribe anytime.
          </motion.p>

          {success ? (
            <motion.p
              className="mt-6 text-emerald-700 font-medium"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
              animate={prefersReducedMotion ? false : { opacity: 1, y: 0, transition: { duration: 0.25 } }}
            >
              Check your inbox for the sample.
            </motion.p>
          ) : (
            <motion.form
              className="mt-6 flex flex-col sm:flex-row gap-3"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={prefersReducedMotion ? false : { opacity: 1, y: 0, transition: { delay: 0.18, duration: 0.35 } }}
              onSubmit={(e) => {
                e.preventDefault()
                startTransition(async () => {
                  const { ok } = await requestSample(email)
                  if (ok) setSuccess(true)
                })
              }}
            >
              <label htmlFor="sample-email" className="sr-only">Email address</label>
              <Input
                id="sample-email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl2"
                aria-describedby="sample-help"
              />
              <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <Button type="submit" size="xl" disabled={isPending} className="sm:ml-2">Send me the sample</Button>
            </motion.form>
          )}

          <p id="sample-help" className="sr-only">We respect your privacy.</p>
        </motion.div>
      </div>
    </section>
  )
}


