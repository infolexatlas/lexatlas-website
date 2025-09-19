'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import type { FeatureCollection } from 'geojson'
import { loadCountries } from '@/lib/loadCountries'

// Dynamically import Globe to avoid SSR issues
const Globe = dynamic(() => import('react-globe.gl'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full w-full">
      <div className="text-white/60 text-sm">Loading globe...</div>
    </div>
  )
})

export default function GlobeCountries() {
  const globeRef = React.useRef<any>(null)
  const [countries, setCountries] = React.useState<FeatureCollection | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [globeLoaded, setGlobeLoaded] = React.useState(false)

  React.useEffect(() => {
    let mounted = true
    
    const loadData = async () => {
      try {
        console.log('[Globe] Starting to load countries...')
        setIsLoading(true)
        setError(null)
        
        const geo = await loadCountries()
        console.log('[Globe] Countries loaded:', geo.features.length)
        
        if (mounted) {
          setCountries(geo)
          console.log(`[Globe] Set countries state with ${geo.features.length} features`)
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
    globeImageUrl: null,
    showAtmosphere: false,
    enablePointerInteraction: false,
    onGlobeReady: () => {
      console.log('[Globe] Globe is ready!')
      setGlobeLoaded(true)
    },
  }

  const polygons = countries?.features ?? []

  console.log('[Globe] Render state:', { 
    isLoading, 
    error, 
    countriesCount: countries?.features.length || 0,
    globeLoaded,
    polygonsCount: polygons.length 
  })

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        <Globe
          ref={globeRef}
          {...globeProps}
          width={400}
          height={400}
          // Render polygons when available
          polygonsData={polygons}
          polygonAltitude={0.01}
          polygonCapColor={() => 'rgba(255,255,255,0.3)'}
          polygonSideColor={() => 'rgba(255,255,255,0.2)'}
          polygonStrokeColor={() => 'rgba(255,255,255,0.5)'}
          polygonStrokeWidth={0.8}
        />
      </div>
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute left-2 top-2 rounded bg-black/60 px-2 py-1 text-xs text-white z-10">
          Loading countries…
        </div>
      )}
      
      {/* Error indicator */}
      {error && (
        <div className="absolute left-2 top-2 max-w-xs rounded bg-red-600/90 px-2 py-1 text-xs text-white z-10">
          Globe error: {error}
        </div>
      )}
      
      {/* Success indicator */}
      {countries && !error && globeLoaded && (
        <div className="absolute left-2 top-2 rounded bg-green-600/90 px-2 py-1 text-xs text-white z-10">
          {countries.features.length} countries loaded
        </div>
      )}
    </div>
  )
}
