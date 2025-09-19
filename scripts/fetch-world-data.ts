import { writeFile } from 'node:fs/promises'
import https from 'node:https'

function dl(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const data: Uint8Array[] = []
      res.on('data', chunk => data.push(chunk))
      res.on('end', () => resolve(Buffer.concat(data)))
    }).on('error', reject)
  })
}

async function run() {
  console.log('🌍 Downloading world datasets...')
  
  try {
    // Download 110m dataset (higher resolution)
    const url110 = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
    console.log('📥 Downloading 110m dataset...')
    const buf110 = await dl(url110)
    await writeFile('public/data/world-110m.json', buf110)
    console.log('✅ Saved public/data/world-110m.json')
    
    // Download 50m dataset (lower resolution for performance)
    const url50 = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json'
    console.log('📥 Downloading 50m dataset...')
    const buf50 = await dl(url50)
    await writeFile('public/data/world-50m.json', buf50)
    console.log('✅ Saved public/data/world-50m.json')
    
    console.log('🎉 All world datasets downloaded successfully!')
  } catch (error) {
    console.error('❌ Error downloading world data:', error)
    process.exit(1)
  }
}

run().catch((e) => { 
  console.error('❌ Fatal error:', e)
  process.exit(1) 
})
