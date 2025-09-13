'use client'

import { useEffect } from 'react'
import { useParams, redirect } from 'next/navigation'
import { normalizeSlug } from '@/lib/kits-slug'
import { kitsDetail } from '@/lib/kits-detail-data'

export default function SamplePage() {
  const params = useParams()
  const normalizedSlug = normalizeSlug(params.slug as string)
  
  useEffect(() => {
    if (!normalizedSlug) {
      redirect('/kits')
      return
    }

    const kit = kitsDetail[normalizedSlug]
    if (!kit) {
      redirect('/kits')
      return
    }

    // Direct download via window.location
    const downloadUrl = `/api/sample?slug=${encodeURIComponent(normalizedSlug)}`
    window.location.href = downloadUrl
  }, [normalizedSlug])

  if (!normalizedSlug) {
    return null
  }

  const kit = kitsDetail[normalizedSlug]
  if (!kit) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-muted">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-brand-navy mb-4">
          Preparing your sample download...
        </h1>
        <p className="text-brand-textMuted mb-6">
          Your sample kit for {normalizedSlug.replace('-', ' – ')} is being prepared.
        </p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold mx-auto"></div>
        <p className="mt-4 text-sm text-brand-textMuted">
          If the download doesn't start automatically, <a href={`/api/sample?slug=${encodeURIComponent(normalizedSlug)}`} className="text-brand-gold underline">click here</a>.
        </p>
      </div>
    </div>
  )
}
