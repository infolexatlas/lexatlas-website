'use client'
import { useId, useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function LeadForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState<string>('')
  const id = useId()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'loading') return

    const form = e.currentTarget
    const emailEl = form.elements.namedItem('email') as HTMLInputElement | null
    const honeyEl = form.elements.namedItem('website') as HTMLInputElement | null
    const email = (emailEl?.value || '').trim()
    const website = (honeyEl?.value || '').trim()

    if (!email) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    try {
      setStatus('loading')
      setMessage('Sending…')

      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website })
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({} as any))
        const msg = typeof data?.error === 'string' ? data.error : `Error ${res.status}.`
        setStatus('error')
        setMessage(msg)
        return
      }

      setStatus('success')
      setMessage('✅ Success! Please check your inbox.')
      form.reset()
      // Optional analytics:
      // if ((window as any).plausible) (window as any).plausible('lead_submitted')
    } catch (err) {
      setStatus('error')
      setMessage('Network error. Please try again.')
      console.error('Lead submit failed', err)
    }
  }

  const isLoading = status === 'loading'

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md rounded-2xl border border-black/10 bg-white/70 p-4 shadow-sm backdrop-blur">
      <label htmlFor={`${id}-email`} className="mb-2 block text-sm font-semibold tracking-wide text-gray-900">
        Get your free guide
      </label>
      <div className="flex gap-2">
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className="flex-1 rounded-xl border border-black/10 bg-white px-3 py-2 text-[15px] outline-none ring-0 focus:border-[#0b5cff] focus:ring-2 focus:ring-[#0b5cff]/20"
          autoComplete="email"
          inputMode="email"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition ${
            isLoading ? 'bg-[#5a8aff] cursor-not-allowed' : 'bg-[#0b5cff] hover:bg-[#0a4ed8]'
          }`}
        >
          {isLoading ? 'Sending…' : 'Send the sample'}
        </button>
      </div>

      {/* Honeypot (hidden) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {status !== 'idle' && (
        <p
          role="status"
          aria-live="polite"
          className={`mt-3 text-sm ${
            status === 'success'
              ? 'text-green-600'
              : status === 'error'
              ? 'text-red-600'
              : 'text-gray-600'
          }`}
        >
          {message}
        </p>
      )}
    </form>
  )
}
