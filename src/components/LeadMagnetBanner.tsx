'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Download, CheckCircle, AlertCircle, Info, ExternalLink } from 'lucide-react'
import { fetchWithTimeout } from '@/lib/fetchWithTimeout'
import { disableExternal } from '@/lib/devFlags'

interface LeadMagnetBannerProps {
  className?: string
  source?: string
}

interface Status {
  kind: 'success' | 'error'
  msg: string
}

export function LeadMagnetBanner({ className = '', source = 'lead_magnet_banner' }: LeadMagnetBannerProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<Status | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    const value = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!valid) { setStatus({ kind:'error', msg:'Please enter a valid email.' }); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ email: value, source:'lead_magnet' }),
      });
      const data = await res.json().catch(() => ({}));
      console.log('[LeadMagnet] response', { ok: res.ok, data });

      if (res.ok && data?.ok) {
        if (data.sent === true) {
          setStatus({ kind:'success', msg:'📬 Email sent! Check your inbox.' });
        } else if (data.reason === 'sandbox_sender') {
          setStatus({ kind:'success', msg:'✅ Saved. (Dev mode: sent from sandbox)' });
        } else if (data.reason === 'provider_error') {
          setStatus({ kind:'success', msg:'✅ Saved. (Email provider rejected sending.) Tip: In dev, set EMAIL_FORCE_SANDBOX=1 or set EMAIL_ECHO_TO=your@email. In production, set a verified RESEND_FROM and verify your domain in Resend.' });
        } else {
          setStatus({ kind:'success', msg:'✅ Saved.' });
        }
        setEmail('');
      } else {
        setStatus({ kind:'error', msg: `❌ Error: ${data?.error || 'server_error'}` });
      }
    } catch (err) {
      console.error('[LeadMagnet] fetch error', err);
      setStatus({ kind:'error', msg:'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const isDev = process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_ENV === 'development'

  return (
    <section className="py-20 lg:py-28 bg-brand-gray">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-br from-[#1A2E4F] to-[#1A2E4F]/90 border-0 rounded-2xl ring-1 ring-black/5 shadow-lg overflow-hidden animate-reveal">
          <CardHeader className="text-center text-white pb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-brand-gold/20 to-brand-gold/10 rounded-2xl flex items-center justify-center mb-6">
              <FileText className="h-8 w-8 text-brand-gold" />
            </div>
            <CardTitle className="text-2xl lg:text-3xl font-serif text-white mb-4">
              Not ready to buy? Get a free sample from one of our kits.
            </CardTitle>
            <CardDescription className="text-lg text-white/90 max-w-2xl mx-auto">
              Download our comprehensive marriage kit sample and see what's included in our guides
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
            <form onSubmit={onSubmit} className="space-y-6 max-w-md mx-auto">
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-center rounded-2xl border-0 bg-white/75 backdrop-blur ring-1 ring-black/5 shadow-sm focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-[#1A2E4F] text-lg py-4"
                  disabled={loading}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full rounded-2xl bg-brand-gold text-[#1A2E4F] hover:bg-brand-gold/90 hover:scale-105 shadow-sm hover:shadow-lg transition-all duration-250 font-semibold text-lg py-4 focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2" 
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-[#1A2E4F] border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Download className="h-5 w-5" />
                    Get Free Sample
                  </div>
                )}
              </Button>
              <p className="text-sm text-white/80 text-center leading-relaxed">
                We'll send you a free sample and occasional updates about new country kits.
                Unsubscribe anytime.
              </p>
              
              {status && (
                <p role="status" aria-live="polite"
                   className={`text-sm mt-3 p-3 rounded-2xl ${
                     status.kind === 'error' 
                       ? 'bg-red-500/20 text-red-200 border border-red-500/30' 
                       : 'bg-brand-gold/20 text-brand-gold border border-brand-gold/30'
                   }`}>
                  {status.msg}
                </p>
              )}
              
              {/* Dev diagnostic links */}
              {isDev && (
                <div className="text-xs text-white/60 space-y-2 border-t border-white/20 pt-4">
                  <p className="font-medium">Dev Tools:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <a 
                      href="/api/dev/email-env" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-brand-gold hover:text-brand-gold/90 transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Email Config
                    </a>
                    <a 
                      href={`/api/dev/test-lead-send?to=${encodeURIComponent(email || 'contact.lexatlas@gmail.com')}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-brand-gold hover:text-brand-gold/90 transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Test Send
                    </a>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
