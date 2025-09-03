#!/usr/bin/env node

import { execSync } from 'child_process';

const BASE_URL = 'http://localhost:3000';

console.log('🔍 Testing PWA Implementation');
console.log('============================');

// Helper function to make HTTP requests
function fetchUrl(url) {
  try {
    const response = execSync(`curl -s -w "%{http_code}" -o /tmp/response ${url}`, { encoding: 'utf8' });
    const statusCode = response.trim();
    const content = execSync('cat /tmp/response', { encoding: 'utf8' });
    return { statusCode: parseInt(statusCode), content };
  } catch (error) {
    return { statusCode: 0, content: '', error: error.message };
  }
}

// Test manifest
console.log('\n📋 Testing manifest.webmanifest...');
const manifestResponse = fetchUrl(`${BASE_URL}/manifest.webmanifest`);

if (manifestResponse.statusCode === 200) {
  console.log('✅ Manifest loads successfully');
  
  try {
    const manifest = JSON.parse(manifestResponse.content);
    
    // Check required fields
    const requiredFields = ['name', 'short_name', 'description', 'start_url', 'display', 'theme_color'];
    const missingFields = requiredFields.filter(field => !manifest[field]);
    
    if (missingFields.length === 0) {
      console.log('✅ All required manifest fields present');
    } else {
      console.log(`❌ Missing required fields: ${missingFields.join(', ')}`);
    }
    
    // Check icons
    if (manifest.icons && Array.isArray(manifest.icons)) {
      const iconSizes = manifest.icons.map(icon => icon.sizes).filter(Boolean);
      const has192 = iconSizes.some(size => size.includes('192'));
      const has512 = iconSizes.some(size => size.includes('512'));
      const hasMaskable = manifest.icons.some(icon => icon.purpose && icon.purpose.includes('maskable'));
      
      console.log(`✅ Icons: 192px=${has192}, 512px=${has512}, maskable=${hasMaskable}`);
    } else {
      console.log('❌ No icons found in manifest');
    }
    
    // Check theme color
    if (manifest.theme_color === '#0A2342') {
      console.log('✅ Theme color matches brand');
    } else {
      console.log(`❌ Theme color mismatch: expected #0A2342, got ${manifest.theme_color}`);
    }
    
  } catch (error) {
    console.log('❌ Invalid JSON in manifest:', error.message);
  }
} else {
  console.log(`❌ Manifest failed to load: ${manifestResponse.statusCode}`);
}

// Test icon files
console.log('\n🎨 Testing icon files...');
const iconFiles = [
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/apple-touch-icon.png',
  '/icon-192.png',
  '/icon-512.png',
  '/maskable-192.png',
  '/maskable-512.png'
];

let iconSuccessCount = 0;
for (const iconFile of iconFiles) {
  const response = fetchUrl(`${BASE_URL}${iconFile}`);
  if (response.statusCode === 200) {
    console.log(`✅ ${iconFile} loads successfully`);
    iconSuccessCount++;
  } else {
    console.log(`❌ ${iconFile} failed to load: ${response.statusCode}`);
  }
}

console.log(`\n📊 Icon Summary: ${iconSuccessCount}/${iconFiles.length} icons load successfully`);

// Test HTML metadata
console.log('\n🏷️  Testing HTML metadata...');
const homeResponse = fetchUrl(`${BASE_URL}/`);

if (homeResponse.statusCode === 200) {
  const html = homeResponse.content;
  
  // Check for manifest link
  if (html.includes('manifest.webmanifest')) {
    console.log('✅ Manifest link found in HTML');
  } else {
    console.log('❌ Manifest link not found in HTML');
  }
  
  // Check for theme color
  if (html.includes('#0A2342') || html.includes('theme-color')) {
    console.log('✅ Theme color found in HTML');
  } else {
    console.log('❌ Theme color not found in HTML');
  }
  
  // Check for apple touch icon
  if (html.includes('apple-touch-icon')) {
    console.log('✅ Apple touch icon found in HTML');
  } else {
    console.log('❌ Apple touch icon not found in HTML');
  }
  
  // Check for favicon
  if (html.includes('favicon') || html.includes('icon')) {
    console.log('✅ Favicon links found in HTML');
  } else {
    console.log('❌ Favicon links not found in HTML');
  }
} else {
  console.log(`❌ Home page failed to load: ${homeResponse.statusCode}`);
}

console.log('\n🎉 PWA testing complete!');
console.log('\nNext steps:');
console.log('1. Run Lighthouse PWA audit');
console.log('2. Test on mobile device');
console.log('3. Verify "Add to Home Screen" functionality');
