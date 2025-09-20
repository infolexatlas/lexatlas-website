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
      setMessage('Veuillez saisir un email.')
      return
    }

    try {
      setStatus('loading')
      setMessage('Envoi en cours…')

      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website })
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({} as any))
        const msg = typeof data?.error === 'string' ? data.error : `Erreur ${res.status}.`
        setStatus('error')
        setMessage(msg)
        return
      }

      setStatus('success')
      setMessage('✅ Merci ! Vérifiez votre boîte mail.')
      form.reset()
      // Optional analytics:
      // if ((window as any).plausible) (window as any).plausible('lead_submitted')
    } catch (err) {
      setStatus('error')
      setMessage('Erreur réseau. Réessayez.')
      console.error('Lead submit failed', err)
    }
  }

  const isLoading = status === 'loading'

  return (
    <form onSubmit={onSubmit} className="flex max-w-md flex-col gap-3">
      <label htmlFor={`${id}-email`} className="text-sm font-medium">
        Recevoir le guide gratuit
      </label>
      <input
        id={`${id}-email`}
        type="email"
        name="email"
        required
        placeholder="Votre email"
        className="rounded border px-3 py-2"
        autoComplete="email"
        inputMode="email"
      />
      {/* Honeypot (hidden) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <button
        type="submit"
        disabled={isLoading}
        className={`rounded px-4 py-2 font-semibold text-white ${
          isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isLoading ? 'Envoi…' : 'Send the sample'}
      </button>

      {status !== 'idle' && (
        <p
          role="status"
          aria-live="polite"
          className={`text-sm ${
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
