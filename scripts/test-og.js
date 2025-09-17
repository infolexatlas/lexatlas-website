const https = require('https');
const http = require('http');

function testOGMetadata(url) {
  const protocol = url.startsWith('https') ? https : http;
  
  protocol.get(url, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      // Extract Open Graph meta tags
      const ogTitle = data.match(/<meta property="og:title" content="([^"]*)"[^>]*>/i);
      const ogDescription = data.match(/<meta property="og:description" content="([^"]*)"[^>]*>/i);
      const ogImage = data.match(/<meta property="og:image" content="([^"]*)"[^>]*>/i);
      const ogUrl = data.match(/<meta property="og:url" content="([^"]*)"[^>]*>/i);
      
      console.log('🔍 Open Graph Metadata Test Results:');
      console.log('=====================================');
      console.log(`Title: ${ogTitle ? ogTitle[1] : '❌ Not found'}`);
      console.log(`Description: ${ogDescription ? ogDescription[1] : '❌ Not found'}`);
      console.log(`Image: ${ogImage ? ogImage[1] : '❌ Not found'}`);
      console.log(`URL: ${ogUrl ? ogUrl[1] : '❌ Not found'}`);
      
      if (ogImage) {
        console.log('\n🖼️  Testing image accessibility...');
        const imageUrl = ogImage[1];
        const imageProtocol = imageUrl.startsWith('https') ? https : http;
        
        imageProtocol.get(imageUrl, (imageRes) => {
          if (imageRes.statusCode === 200) {
            console.log('✅ Image is accessible');
          } else {
            console.log(`❌ Image returned status: ${imageRes.statusCode}`);
          }
        }).on('error', (err) => {
          console.log(`❌ Image error: ${err.message}`);
        });
      }
    });
  }).on('error', (err) => {
    console.error(`❌ Error fetching page: ${err.message}`);
  });
}

// Test the local development server
console.log('Testing Open Graph metadata...\n');
testOGMetadata('http://localhost:3000');
