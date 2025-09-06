export async function fetchWithTimeout(url: string, ms = 8000, init?: RequestInit) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), ms)
  try {
    return await fetch(url, { signal: ctrl.signal, ...(init ?? {}) })
  } finally {
    clearTimeout(t)
  }
}


