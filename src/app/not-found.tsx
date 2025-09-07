"use client"

import { useEffect } from 'react'
import { Container } from '@/components/ui/container'
import { NotFoundHero } from '@/components/la/NotFound/Hero'
import { NotFoundPrimaryActions } from '@/components/la/NotFound/PrimaryActions'
import { track } from '@/lib/analytics'

export default function NotFound() {
  useEffect(() => {
    track('404_view', { path: window.location.pathname })
  }, [])

  return (
    <main>
      <Container className="py-16 md:py-20">
        <NotFoundHero />
        <NotFoundPrimaryActions />
      </Container>
    </main>
  )
}
