'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import type { FeatureCollection, Feature } from 'geojson'
import { loadCountries } from '@/lib/loadCountries'

// Dynamically import Globe to avoid SSR issues
const Globe = dynamic(() => import('react-globe.gl'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-white/60 text-sm">Loading globe...</div>
    </div>
  )
})

export default function GlobeCountries() {
  const globeRef = React.useRef<any>(null)
  const [countries, setCountries] = React.useState<FeatureCollection | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    let mounted = true
    
    const loadData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const geo = await loadCountries()
        if (mounted) {
          setCountries(geo)
          console.log(`[Globe] Loaded ${geo.features.length} countries`)
        }
      } catch (e) {
        console.error('[Globe] Failed to load countries:', e)
        if (mounted) {
          setError((e as Error)?.message || 'Failed to load countries')
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    loadData()
    return () => { mounted = false }
  }, [])

  // Globe configuration
  const globeProps: any = {
    backgroundColor: 'rgba(0,0,0,0)',
    showGraticules: true,
    animateIn: true,
    globeImageUrl: null, // No texture, just polygons
    showAtmosphere: false,
    enablePointerInteraction: false,
  }

  const polygons = countries?.features ?? []

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-full h-full max-w-full max-h-full">
        <Globe
          ref={globeRef}
          {...globeProps}
          width="100%"
          height="100%"
          // Render polygons when available
          polygonsData={polygons}
          polygonAltitude={0.01}
          polygonCapColor={() => 'rgba(255,255,255,0.2)'}
          polygonSideColor={() => 'rgba(255,255,255,0.1)'}
          polygonStrokeColor={() => 'rgba(255,255,255,0.3)'}
          polygonStrokeWidth={0.5}
          // Keep existing points/arcs if any
          pointsData={[]}
          arcsData={[]}
        />
      </div>
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute left-2 top-2 rounded bg-black/60 px-2 py-1 text-xs text-white">
          Loading countries…
        </div>
      )}
      
      {/* Error indicator */}
      {error && (
        <div className="absolute left-2 top-2 max-w-xs rounded bg-red-600/90 px-2 py-1 text-xs text-white">
          Globe error: {error}
        </div>
      )}
      
      {/* Success indicator */}
      {countries && !error && (
        <div className="absolute left-2 top-2 rounded bg-green-600/90 px-2 py-1 text-xs text-white">
          {countries.features.length} countries loaded
        </div>
      )}
    </div>
  )
}
