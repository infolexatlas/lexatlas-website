#!/usr/bin/env tsx

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { PRIORITY_SLUGS } from '../src/lib/kits.config'

const OG_DIR = path.join(process.cwd(), 'public', 'og', 'pairs')

async function generateOGImage(slug: string) {
  const svgPath = path.join(OG_DIR, `${slug}.svg`)
  const pngPath = path.join(OG_DIR, `${slug}.png`)
  
  // Check if SVG exists
  if (!fs.existsSync(svgPath)) {
    console.log(`⚠️  SVG template not found for ${slug}, creating basic template...`)
    await createBasicSVG(slug)
  }
  
  try {
    // Convert SVG to PNG
    await sharp(svgPath)
      .resize(1200, 630)
      .png()
      .toFile(pngPath)
    
    console.log(`✅ Generated ${slug}.png`)
  } catch (error) {
    console.error(`❌ Error generating ${slug}.png:`, error)
  }
}

async function createBasicSVG(slug: string) {
  const svgPath = path.join(OG_DIR, `${slug}.svg`)
  const pairKey = slug.replace('-', '-').toUpperCase()
  
  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .title { font-family: Arial, sans-serif; font-weight: bold; fill: #1f2937; }
      .subtitle { font-family: Arial, sans-serif; fill: #6b7280; }
      .pair-label { font-family: Arial, sans-serif; font-weight: bold; fill: #3b82f6; }
    </style>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="white"/>
  
  <!-- Logo placeholder -->
  <rect x="500" y="100" width="200" height="60" fill="#3b82f6" rx="8"/>
  <text x="600" y="140" text-anchor="middle" class="title" font-size="24" fill="white">LexAtlas</text>
  
  <!-- Subtitle -->
  <text x="600" y="200" text-anchor="middle" class="subtitle" font-size="18">Marriage Kit</text>
  
  <!-- Pair label -->
  <text x="600" y="280" text-anchor="middle" class="pair-label" font-size="48">${pairKey}</text>
  
  <!-- Bottom line -->
  <line x1="200" y1="500" x2="1000" y2="500" stroke="#e5e7eb" stroke-width="2"/>
  
  <!-- Additional info -->
  <text x="600" y="550" text-anchor="middle" class="subtitle" font-size="16">Complete marriage guide • Step-by-step process</text>
</svg>`
  
  // Ensure directory exists
  if (!fs.existsSync(OG_DIR)) {
    fs.mkdirSync(OG_DIR, { recursive: true })
  }
  
  fs.writeFileSync(svgPath, svgContent)
  console.log(`📝 Created basic SVG template for ${slug}`)
}

async function main() {
  console.log('🎨 Generating OG images for priority slugs...')
  
  // Ensure directory exists
  if (!fs.existsSync(OG_DIR)) {
    fs.mkdirSync(OG_DIR, { recursive: true })
  }
  
  for (const slug of PRIORITY_SLUGS) {
    await generateOGImage(slug)
  }
  
  console.log('✅ OG image generation completed!')
}

main().catch(console.error)
