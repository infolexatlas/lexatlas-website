#!/usr/bin/env tsx

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const PUBLIC_DIR = path.join(process.cwd(), 'public')
const LOGO_PATH = path.join(PUBLIC_DIR, 'logo-lexatlas.svg')

async function generateIcons() {
  console.log('🎨 Generating icons from logo...')
  
  try {
    // Create a square version of the logo for icons
    const squareLogoSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#D4AF37;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#FFD700;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background circle with gold border -->
  <circle cx="256" cy="256" r="240" fill="#0A2342" stroke="url(#goldGradient)" stroke-width="8"/>
  
  <!-- LexAtlas text -->
  <text x="256" y="280" font-family="Inter, Arial, sans-serif" font-size="72" font-weight="700" text-anchor="middle" fill="white">
    Lex<tspan fill="url(#goldGradient)">Atlas</tspan>
  </text>
  
  <!-- Subtitle -->
  <text x="256" y="340" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="400" text-anchor="middle" fill="#94A3B8">
    Legal Compass
  </text>
</svg>`

    // Generate favicon.ico (32x32)
    await sharp(Buffer.from(squareLogoSvg))
      .resize(32, 32)
      .png()
      .toFile(path.join(PUBLIC_DIR, 'favicon.ico'))
    console.log('✅ Generated favicon.ico')

    // Generate apple-touch-icon.png (180x180)
    await sharp(Buffer.from(squareLogoSvg))
      .resize(180, 180)
      .png()
      .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'))
    console.log('✅ Generated apple-touch-icon.png')

    // Generate icon-192.png
    await sharp(Buffer.from(squareLogoSvg))
      .resize(192, 192)
      .png()
      .toFile(path.join(PUBLIC_DIR, 'icon-192.png'))
    console.log('✅ Generated icon-192.png')

    // Generate icon-512.png
    await sharp(Buffer.from(squareLogoSvg))
      .resize(512, 512)
      .png()
      .toFile(path.join(PUBLIC_DIR, 'icon-512.png'))
    console.log('✅ Generated icon-512.png')

    // Generate android-chrome-192x192.png
    await sharp(Buffer.from(squareLogoSvg))
      .resize(192, 192)
      .png()
      .toFile(path.join(PUBLIC_DIR, 'android-chrome-192x192.png'))
    console.log('✅ Generated android-chrome-192x192.png')

    // Generate android-chrome-512x512.png
    await sharp(Buffer.from(squareLogoSvg))
      .resize(512, 512)
      .png()
      .toFile(path.join(PUBLIC_DIR, 'android-chrome-512x512.png'))
    console.log('✅ Generated android-chrome-512x512.png')

    console.log('🎉 All icons generated successfully!')

  } catch (error) {
    console.error('❌ Error generating icons:', error)
  }
}

generateIcons().catch(console.error)
