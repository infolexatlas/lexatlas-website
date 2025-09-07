'use client'

import { useEffect, useMemo, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Pair, pairs } from '@/lib/pairs'
import { track } from '@/lib/analytics'

interface PreviewEmailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialPair?: Pair
}

export function PreviewEmailModal({ open, onOpenChange, initialPair }: PreviewEmailModalProps) {
  const [email, setEmail] = useState('')
  const [pairSlug, setPairSlug] = useState(initialPair?.slug ?? pairs[0].slug)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<null | { kind: 'success' | 'error'; msg: string }>(null)
  const [trap, setTrap] = useState('') // honeypot

  useEffect(() => {
    if (open) {
      track('preview_email_open', { pair: initialPair?.slug })
    }
  }, [open, initialPair?.slug])

  useEffect(() => {
    if (initialPair?.slug) setPairSlug(initialPair.slug)
  }, [initialPair])

  const selectedPair = useMemo(() => pairs.find(p => p.slug === pairSlug)!, [pairSlug])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)
    if (trap) return
    const value = email.trim()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    if (!valid) { setStatus({ kind: 'error', msg: 'Please enter a valid email.' }); return }
    setLoading(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value, source: 'preview', pair: pairSlug })
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data?.ok) {
        track('preview_email_submit', { pair: pairSlug })
        setStatus({ kind: 'success', msg: `Preview sent to ${value}` })
        setEmail('')
      } else {
        track('preview_email_submit', { pair: pairSlug, error: data?.error || 'server_error' })
        setStatus({ kind: 'error', msg: 'Something went wrong. Please try again.' })
      }
    } catch (err) {
      track('preview_email_submit', { pair: pairSlug, error: 'network_error' })
      setStatus({ kind: 'error', msg: 'Network error. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl bg-[var(--la-surface)] text-[var(--la-text)] border ring-1 ring-black/5 shadow-premium">
        <DialogHeader>
          <DialogTitle>We’ll send you the sample</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <input type="text" className="hidden" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pair">Country pair</Label>
            <Select value={pairSlug} onValueChange={setPairSlug}>
              <SelectTrigger id="pair"><SelectValue placeholder="Select a pair" /></SelectTrigger>
              <SelectContent>
                {pairs.map(p => (
                  <SelectItem key={p.slug} value={p.slug}>{p.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Sending…' : 'Request sample'}
          </Button>

          {status && (
            <p role="status" aria-live="polite" className={`text-sm ${status.kind === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {status.msg}
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}


