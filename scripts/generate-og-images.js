const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateOGImages() {
  try {
    // Read the SVG file
    const svgBuffer = fs.readFileSync(path.join(__dirname, '../public/og/home.svg'));
    
    // Convert SVG to PNG with the correct dimensions
    const pngBuffer = await sharp(svgBuffer)
      .resize(1200, 630)
      .png()
      .toBuffer();
    
    // Write the PNG file
    fs.writeFileSync(path.join(__dirname, '../public/og/home.png'), pngBuffer);
    
    console.log('✅ Generated home.png successfully');
    
    // Create variations for other pages
    const aboutSvg = svgBuffer.toString().replace('Your Global Legal Compass', 'About LexAtlas');
    const aboutPngBuffer = await sharp(Buffer.from(aboutSvg))
      .resize(1200, 630)
      .png()
      .toBuffer();
    
    fs.writeFileSync(path.join(__dirname, '../public/og/about.png'), aboutPngBuffer);
    console.log('✅ Generated about.png successfully');
    
    const kitsSvg = svgBuffer.toString().replace('Your Global Legal Compass', 'Marriage Kits');
    const kitsPngBuffer = await sharp(Buffer.from(kitsSvg))
      .resize(1200, 630)
      .png()
      .toBuffer();
    
    fs.writeFileSync(path.join(__dirname, '../public/og/kits.png'), kitsPngBuffer);
    console.log('✅ Generated kits.png successfully');
    
    console.log('🎉 All Open Graph images generated successfully!');
    
  } catch (error) {
    console.error('❌ Error generating OG images:', error);
    process.exit(1);
  }
}

generateOGImages();
