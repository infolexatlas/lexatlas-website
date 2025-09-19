import type { FeatureCollection } from 'geojson'
import { feature } from 'topojson-client'

// Robust fetch that works in browser; Next.js will serve /public assets
async function fetchJSON<T = any>(path: string): Promise<T> {
  const res = await fetch(path, { cache: 'force-cache' })
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`)
  return res.json() as Promise<T>
}

export async function loadCountries(): Promise<FeatureCollection> {
  // Prefer 110m; if fails, try 50m
  const tryPaths = ['/data/world-110m.json', '/data/world-50m.json']
  let topo: any | null = null
  
  for (const p of tryPaths) {
    try { 
      console.log(`[Globe] Trying to load ${p}...`)
      topo = await fetchJSON<any>(p)
      console.log(`[Globe] Successfully loaded ${p}`)
      break 
    } catch (e) {
      console.warn(`[Globe] Failed to load ${p}:`, e)
    }
  }
  
  if (!topo) throw new Error('No world topojson available at /public/data')

  // Some packages use `topology.objects.countries` or `topology.objects.land`
  const obj =
    topo.objects?.countries ??
    topo.objects?.land ??
    null
    
  if (!obj) throw new Error('Invalid topojson: missing objects.countries or objects.land')

  const geo = feature(topo, obj) as unknown as FeatureCollection
  if (!geo.features?.length) throw new Error('Empty countries feature collection')
  
  console.log(`[Globe] Loaded ${geo.features.length} country features`)
  return geo
}

// Utility to get country count for validation
export async function getCountryCount(): Promise<number> {
  try {
    const geo = await loadCountries()
    return geo.features.length
  } catch {
    return 0
  }
}
