'use client'

import { useEffect, useRef } from 'react'

export default function ChunkRecovery() {
  const reloaded = useRef(false)

  useEffect(() => {
    const shouldHandle = (msg?: string) =>
      typeof msg === 'string' &&
      (msg.includes('ChunkLoadError') || msg.includes('Loading chunk'))

    const hardReload = () => {
      if (reloaded.current) return
      reloaded.current = true
      // Force a full reload bypassing cache
      try {
        // Add a cache-buster to ensure fresh chunks
        const url = new URL(window.location.href)
        url.searchParams.set('_cb', Date.now().toString())
        window.location.replace(url.toString())
      } catch {
        window.location.reload()
      }
    }

    const onError = (event: ErrorEvent) => {
      if (shouldHandle(event?.message)) hardReload()
    }

    const onRejection = (event: PromiseRejectionEvent) => {
      const msg =
        (event?.reason && (event.reason.message || String(event.reason))) || ''
      if (shouldHandle(msg)) hardReload()
    }

    window.addEventListener('error', onError)
    window.addEventListener('unhandledrejection', onRejection)
    return () => {
      window.removeEventListener('error', onError)
      window.removeEventListener('unhandledrejection', onRejection)
    }
  }, [])

  return null
}
