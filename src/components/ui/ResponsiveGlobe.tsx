'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { loadCountries } from '@/lib/loadCountries'

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false })

export default function ResponsiveGlobe() {
  const ref = React.useRef<any>(null)
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [size, setSize] = React.useState({ w: 0, h: 0 })
  const [countries, setCountries] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  // Load countries data
  React.useEffect(() => {
    const loadData = async () => {
      try {
        console.log('[ResponsiveGlobe] Loading countries...')
        const geo = await loadCountries()
        setCountries(geo)
        console.log(`[ResponsiveGlobe] Loaded ${geo.features.length} countries`)
      } catch (e) {
        console.error('[ResponsiveGlobe] Failed to load countries:', e)
        setError((e as Error)?.message || 'Failed to load countries')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Handle resize with ResizeObserver
  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect()
      const width = rect.width
      const height = rect.height || Math.max(480, Math.round(width / (16 / 9)))
      setSize({ w: width, h: height })
      
      // Update globe dimensions if ref is available
      if (ref.current) {
        try {
          ref.current.width(width)
          ref.current.height(height)
        } catch (e) {
          console.warn('[ResponsiveGlobe] Could not update globe dimensions:', e)
        }
      }
    })

    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const polygons = countries?.features ?? []

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-visible min-h-[480px] md:min-h-[560px] lg:min-h-[640px]"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-white/60 text-sm">Loading globe...</div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-red-400 text-sm">Error: {error}</div>
        </div>
      )}

      <Globe
        ref={ref}
        width={size.w || undefined}
        height={size.h || undefined}
        backgroundColor="rgba(0,0,0,0)"
        showGraticules
        animateIn
        globeImageUrl={null}
        showAtmosphere={false}
        enablePointerInteraction={false}
        // Render polygons when available
        polygonsData={polygons}
        polygonAltitude={() => 0.005}
        polygonCapColor={() => 'rgba(220,220,220,0.9)'}
        polygonSideColor={() => 'rgba(80,80,80,0.25)'}
        polygonStrokeColor={() => '#111'}
        // Keep existing points/arcs if any
        pointsData={[]}
        arcsData={[]}
      />
      
      {/* Success indicator */}
      {countries && !error && !isLoading && (
        <div className="absolute left-2 top-2 rounded bg-green-600/90 px-2 py-1 text-xs text-white z-10">
          {countries.features.length} countries loaded
        </div>
      )}
    </div>
  )
}
