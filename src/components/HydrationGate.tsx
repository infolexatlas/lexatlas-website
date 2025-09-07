"use client"

import { useEffect, useState } from "react"

export function HydrationGate({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    // Return a minimal, invisible shell to avoid layout shift
    return <div aria-hidden="true" style={{ display: 'contents' }} />
  }
  
  return <>{children}</>
}
