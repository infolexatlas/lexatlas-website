type PlausibleFn = (event: string, options?: { props?: Record<string, unknown> }) => void

export function track(event: string, props?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  const plausible = (window as unknown as { plausible?: PlausibleFn }).plausible
  if (typeof plausible === 'function') plausible(event, { props })
  else if (process.env.NODE_ENV !== 'production') console.info('[analytics]', event, props)
}


