'use client'

import { useEffect, useState } from 'react'

/**
 * Returns true after first client mount so we can safely enable
 * initial animations without causing SSR "page blank" flashes.
 */
export function useMountAnimation(): boolean {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}


