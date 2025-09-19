import { readFileSync } from 'node:fs'
import { feature } from 'topojson-client'
import { expect, test, describe } from 'vitest'

describe('World Data Validation', () => {
  test('world topojson contains countries (110m)', () => {
    const raw = readFileSync('public/data/world-110m.json', 'utf-8')
    const topo = JSON.parse(raw)
    const obj = topo.objects?.countries ?? topo.objects?.land
    expect(obj).toBeTruthy()
    const geo = feature(topo, obj) as any
    // Natural Earth should have > 150 features (depending on dataset)
    expect(geo.features?.length || 0).toBeGreaterThan(150)
    console.log(`✅ 110m dataset has ${geo.features?.length || 0} features`)
  })

  test('world topojson contains countries (50m)', () => {
    const raw = readFileSync('public/data/world-50m.json', 'utf-8')
    const topo = JSON.parse(raw)
    const obj = topo.objects?.countries ?? topo.objects?.land
    expect(obj).toBeTruthy()
    const geo = feature(topo, obj) as any
    // 50m should have fewer features but still substantial
    expect(geo.features?.length || 0).toBeGreaterThan(100)
    console.log(`✅ 50m dataset has ${geo.features?.length || 0} features`)
  })

  test('topojson structure is valid', () => {
    const raw = readFileSync('public/data/world-110m.json', 'utf-8')
    const topo = JSON.parse(raw)
    
    // Check basic TopoJSON structure
    expect(topo.type).toBe('Topology')
    expect(topo.objects).toBeDefined()
    expect(topo.arcs).toBeDefined()
    
    // Check that we have either countries or land
    const hasCountries = topo.objects?.countries !== undefined
    const hasLand = topo.objects?.land !== undefined
    expect(hasCountries || hasLand).toBe(true)
    
    console.log(`✅ TopoJSON structure valid - countries: ${hasCountries}, land: ${hasLand}`)
  })
})
