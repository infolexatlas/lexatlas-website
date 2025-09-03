#!/usr/bin/env node

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');
const logoPath = path.join(publicDir, 'logo', 'lexatlas.svg');

// Icon specifications
const icons = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'maskable-192.png', size: 192 },
  { name: 'maskable-512.png', size: 512 },
];

// Create maskable icon with padding (safe area)
async function createMaskableIcon(size, outputPath) {
  const padding = Math.floor(size * 0.1); // 10% padding for safe area
  const iconSize = size - (padding * 2);
  
  await sharp(logoPath)
    .resize(iconSize, iconSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: padding,
      bottom: padding,
      left: padding,
      right: padding,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toFile(outputPath);
}

async function generateIcons() {
  console.log('🎨 Generating LexAtlas icons from SVG...');
  
  try {
    // Check if source logo exists
    await fs.access(logoPath);
    console.log(`✅ Found source logo: ${logoPath}`);
    
    // Generate regular icons
    for (const icon of icons) {
      const outputPath = path.join(publicDir, icon.name);
      
      if (icon.name.startsWith('maskable-')) {
        await createMaskableIcon(icon.size, outputPath);
      } else {
        await sharp(logoPath)
          .resize(icon.size, icon.size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .png()
          .toFile(outputPath);
      }
      
      console.log(`✅ Generated: ${icon.name} (${icon.size}x${icon.size})`);
    }
    
    // Generate favicon.ico (multi-size)
    const favicon16 = await sharp(logoPath)
      .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    
    const favicon32 = await sharp(logoPath)
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    
    // For now, we'll use the 32x32 as favicon.ico since creating a true multi-size ICO is complex
    // In production, you might want to use a library like 'ico-endec' for proper ICO generation
    await sharp(favicon32)
      .toFile(path.join(publicDir, 'favicon.ico'));
    
    console.log('✅ Generated: favicon.ico (32x32)');
    console.log('\n🎉 All icons generated successfully!');
    console.log('\nGenerated files:');
    icons.forEach(icon => console.log(`  - ${icon.name}`));
    console.log('  - favicon.ico');
    
  } catch (error) {
    console.error('❌ Error generating icons:', error.message);
    process.exit(1);
  }
}

generateIcons();
