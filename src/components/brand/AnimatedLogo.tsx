'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

type Variant = 'header' | 'hero' | 'footer'

type Props = {
  src?: string
  alt?: string
  width?: number
  height?: number
  size?: number
  className?: string
  variant?: Variant
  priority?: boolean
}

export default function AnimatedLogo({
  src: srcProp,
  alt: altProp,
  width: widthProp,
  height: heightProp,
  size,
  className,
  variant = 'header',
  priority = false,
}: Props) {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('[AnimatedLogo]', { variant, note: 'mounted' })
  }

  const pathname = usePathname()
  const prevPathRef = useRef<string | null>(null)
  const [phase, setPhase] = useState<'idle' | 'leaving' | 'arriving'>('idle')
  const leaveTimeout = useRef<number | null>(null)
  const arriveTimeout = useRef<number | null>(null)

  // First-load arrival (header + hero only)
  useEffect(() => {
    if (variant === 'header' || variant === 'hero') {
      const id = window.setTimeout(() => {
        setPhase('arriving')
        arriveTimeout.current = window.setTimeout(() => setPhase('idle'), 200)
      }, 20)
      return () => window.clearTimeout(id)
    }
  }, [variant])

  // Route changes (header only): leave -> arrive
  useEffect(() => {
    if (variant !== 'header') {
      prevPathRef.current = pathname
      return
    }
    if (prevPathRef.current === null) {
      prevPathRef.current = pathname
      return
    }
    if (prevPathRef.current !== pathname) {
      setPhase('leaving')
      if (leaveTimeout.current) window.clearTimeout(leaveTimeout.current)
      if (arriveTimeout.current) window.clearTimeout(arriveTimeout.current)

      leaveTimeout.current = window.setTimeout(() => {
        setPhase('arriving')
        arriveTimeout.current = window.setTimeout(() => setPhase('idle'), 180)
      }, 160)

      prevPathRef.current = pathname
    }
  }, [pathname, variant])

  useEffect(() => {
    return () => {
      if (leaveTimeout.current) window.clearTimeout(leaveTimeout.current)
      if (arriveTimeout.current) window.clearTimeout(arriveTimeout.current)
    }
  }, [])

  const imgAnim = clsx(
    'transition duration-200 ease-out will-change-transform',
    phase === 'leaving' && 'logo-leave',
    phase === 'arriving' && 'logo-arrive',
    variant === 'hero' && 'logo-hero-enter',
    className
  )

  // Use size prop or fall back to individual width/height props
  const finalWidth = size || widthProp || 40
  const finalHeight = size || heightProp || 40
  const finalSrc = srcProp || '/logo/lexatlas.svg'
  const finalAlt = altProp || 'LexAtlas'

  return (
    <Image
      src={finalSrc}
      alt={finalAlt}
      width={finalWidth}
      height={finalHeight}
      priority={priority}
      className={imgAnim}
    />
  )
}
