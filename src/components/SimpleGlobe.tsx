'use client'
import React, { useEffect, useRef, useState } from 'react'
import { loadCountries } from '@/lib/loadCountries'

export default function SimpleGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [countries, setCountries] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('[SimpleGlobe] Loading countries...')
        const geo = await loadCountries()
        setCountries(geo)
        console.log(`[SimpleGlobe] Loaded ${geo.features.length} countries`)
      } catch (e) {
        console.error('[SimpleGlobe] Failed to load countries:', e)
        setError((e as Error)?.message || 'Failed to load countries')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !countries) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Setup canvas
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    canvas.style.width = rect.width + 'px'
    canvas.style.height = rect.height + 'px'

    const w = rect.width
    const h = rect.height
    const cx = w / 2
    const cy = h / 2
    const r = Math.min(w, h) / 2 - 20

    // Clear canvas
    ctx.clearRect(0, 0, w, h)

    // Draw background gradient
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
    gradient.addColorStop(0, '#1A2E4F')
    gradient.addColorStop(1, '#223A63')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, w, h)

    // Simple projection
    function project(lon: number, lat: number) {
      const x = cx + (lon / 180) * r * 0.8
      const y = cy - (lat / 90) * r * 0.8
      return [x, y]
    }

    // Draw countries as simple shapes
    if (countries.features) {
      ctx.strokeStyle = 'rgba(255,255,255,0.3)'
      ctx.fillStyle = 'rgba(255,255,255,0.1)'
      ctx.lineWidth = 1

      countries.features.forEach((feature: any) => {
        if (feature.geometry && feature.geometry.coordinates) {
          ctx.beginPath()
          
          if (feature.geometry.type === 'Polygon') {
            feature.geometry.coordinates[0].forEach((coord: number[], i: number) => {
              const [x, y] = project(coord[0], coord[1])
              if (i === 0) ctx.moveTo(x, y)
              else ctx.lineTo(x, y)
            })
          } else if (feature.geometry.type === 'MultiPolygon') {
            feature.geometry.coordinates.forEach((polygon: any) => {
              polygon[0].forEach((coord: number[], i: number) => {
                const [x, y] = project(coord[0], coord[1])
                if (i === 0) ctx.moveTo(x, y)
                else ctx.lineTo(x, y)
              })
            })
          }
          
          ctx.fill()
          ctx.stroke()
        }
      })
    }

    // Draw graticule
    ctx.strokeStyle = 'rgba(255,255,255,0.1)'
    ctx.lineWidth = 0.5
    
    // Draw meridians
    for (let lon = -180; lon <= 180; lon += 30) {
      ctx.beginPath()
      for (let lat = -90; lat <= 90; lat += 5) {
        const [x, y] = project(lon, lat)
        if (lat === -90) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
    }
    
    // Draw parallels
    for (let lat = -90; lat <= 90; lat += 30) {
      ctx.beginPath()
      for (let lon = -180; lon <= 180; lon += 5) {
        const [x, y] = project(lon, lat)
        if (lon === -180) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
    }

  }, [countries])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="text-white/60 text-sm">Loading globe...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="text-red-400 text-sm">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      {countries && (
        <div className="absolute left-2 top-2 rounded bg-green-600/90 px-2 py-1 text-xs text-white z-10">
          {countries.features.length} countries loaded
        </div>
      )}
    </div>
  )
}
