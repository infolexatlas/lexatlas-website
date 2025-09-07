'use client'
import { useEffect } from 'react'
export default function HeaderGlassClient() {
  useEffect(() => {
    const el = document.getElementById('site-header') as HTMLElement | null
    if (!el) return
    const onScroll = () => {
      const scrolled = (window.scrollY || document.documentElement.scrollTop) > 4
      if (scrolled) el.setAttribute('data-scrolled','true')
      else el.removeAttribute('data-scrolled')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return null
}
