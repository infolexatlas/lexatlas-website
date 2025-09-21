'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { fetchWithTimeout } from '@/lib/fetchWithTimeout'
import { disableExternal } from '@/lib/devFlags'

interface Status {
  kind: 'success' | 'error'
  msg: string
}

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<Status | null>(null)
  const honeyRef = useRef<HTMLInputElement | null>(null)
  const describedById = 'newsletter-helper'

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    const value = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!valid) { setStatus({ kind:'error', msg:'Please enter a valid email.' }); return; }
    // Honeypot
    if (honeyRef.current && honeyRef.current.value) {
      setStatus({ kind: 'success', msg: '✅ Saved.' });
      setEmail('');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ email: value, source:'footer' }),
      });
      const data = await res.json().catch(() => ({}));
      console.log('[Newsletter] response', { ok: res.ok, data });

      if (res.ok && data?.ok) {
        // Use the user-friendly message from the API
        const msg = data.message || (data.sent === true
          ? '📬 Email sent! Check your inbox.'
          : '✅ Thank you for subscribing!')
        setStatus({ kind:'success', msg })
        setEmail('');
        // Plausible tracking if available
        if (typeof window !== 'undefined' && (window as any).plausible) {
          ;(window as any).plausible('newsletter_subscribe', { props: { source: 'footer', sent: !!data.sent }})
        }
      } else {
        setStatus({ kind:'error', msg: `❌ Error: ${data?.error || 'server_error'}` });
      }
    } catch (err) {
      console.error('[Newsletter] fetch error', err);
      setStatus({ kind:'error', msg:'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={onSubmit} className="space-y-3" aria-describedby={describedById}>
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 text-sm bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            disabled={loading}
          />
          <Button 
            type="submit" 
            size="sm"
            disabled={loading}
            className="bg-brand-gold text-white hover:bg-brand-gold/90"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Subscribe'
            )}
          </Button>
        </div>
        {/* Honeypot */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" ref={honeyRef} tabIndex={-1} autoComplete="off" />
        </div>
        
        {status && (
          <p role={status.kind === 'error' ? 'alert' : 'status'} aria-live="polite"
             className={status.kind === 'error' ? 'text-red-400 text-xs' : 'text-gray-400 text-xs'}>
            {status.msg}
          </p>
        )}
        
        <p id={describedById} className="text-xs text-gray-400">
          We'll send you updates about new country kits and special offers.
        </p>
      </form>
    </div>
  )
}
