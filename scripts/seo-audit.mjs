#!/usr/bin/env node

import { JSDOM } from 'jsdom'

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

const staticRoutes = ['/', '/pricing', '/about', '/faq', '/contact']
const kitRoutes = [
  '/kits/fra-usa', '/kits/fra-gbr', '/kits/fra-can', '/kits/fra-mar',
  '/kits/fra-deu', '/kits/fra-che', '/kits/fra-bel', '/kits/fra-esp',
  '/kits/fra-ita', '/kits/fra-prt'
]
const previewRoutes = [
  '/preview/fra-usa', '/preview/fra-gbr', '/preview/fra-can', '/preview/fra-mar',
  '/preview/fra-deu', '/preview/fra-che', '/preview/fra-bel', '/preview/fra-esp',
  '/preview/fra-ita', '/preview/fra-prt'
]
const allRoutes = [...staticRoutes, ...kitRoutes, ...previewRoutes]

// Helper to normalize text for comparison
const normalizeText = (text) => {
  return text?.trim().toLowerCase().replace(/\s+/g, ' ') || ''
}

// Helper to check if URL is absolute
const isAbsoluteUrl = (url) => {
  return url?.startsWith('http://') || url?.startsWith('https://')
}

// Helper to resolve relative URLs
const resolveUrl = (base, url) => {
  if (!url) return null
  if (isAbsoluteUrl(url)) return url
  return new URL(url, base).href
}

// Helper to fetch HEAD request to check if image exists
const checkImageExists = async (imageUrl) => {
  if (!imageUrl) return false
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' })
    return response.ok
  } catch (error) {
    return false
  }
}

// Extract meta tags from HTML
const extractMetaTags = (html) => {
  const dom = new JSDOM(html)
  const document = dom.window.document

  const getMetaContent = (name, property) => {
    let meta = null
    if (name) {
      meta = document.querySelector(`meta[name="${name}"]`)
    }
    if (!meta && property) {
      meta = document.querySelector(`meta[property="${property}"]`)
    }
    return meta?.getAttribute('content') || null
  }

  const title = document.querySelector('title')?.textContent || null
  const description = getMetaContent('description')
  const ogTitle = getMetaContent(null, 'og:title')
  const ogDescription = getMetaContent(null, 'og:description')
  const ogImage = getMetaContent(null, 'og:image')
  const twitterCard = getMetaContent('twitter:card')
  const twitterTitle = getMetaContent('twitter:title')
  const twitterDescription = getMetaContent('twitter:description')
  const twitterImage = getMetaContent('twitter:image')

  return {
    title,
    description,
    ogTitle,
    ogDescription,
    ogImage,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterImage
  }
}

// Validate SEO for a single route
const validateRoute = async (route) => {
  try {
    const url = `${BASE}${route}`
    console.log(`\n🔍 Checking: ${route}`)
    
    const response = await fetch(url)
    if (!response.ok) {
      console.log(`❌ HTTP ${response.status} for ${route}`)
      return { route, error: `HTTP ${response.status}` }
    }

    const html = await response.text()
    const meta = extractMetaTags(html)

    // Validation checks
    const hasTitle = !!meta.title
    const hasDescription = !!meta.description
    const hasOgTitle = !!meta.ogTitle
    const hasOgDescription = !!meta.ogDescription
    const hasOgImage = !!meta.ogImage
    const hasTwitterCard = meta.twitterCard === 'summary_large_image'
    const hasTwitterTitle = !!meta.twitterTitle
    const hasTwitterDescription = !!meta.twitterDescription
    const hasTwitterImage = !!meta.twitterImage

    // Content matching checks (case/whitespace insensitive)
    const titleMatches = normalizeText(meta.title) === normalizeText(meta.ogTitle)
    const descriptionMatches = normalizeText(meta.description) === normalizeText(meta.ogDescription)

    // Image validation
    const resolvedOgImage = resolveUrl(BASE, meta.ogImage)
    const ogImageExists = await checkImageExists(resolvedOgImage)

    // Twitter content matching
    const twitterTitleMatches = normalizeText(meta.title) === normalizeText(meta.twitterTitle)
    const twitterDescriptionMatches = normalizeText(meta.description) === normalizeText(meta.twitterDescription)

    // Results
    const titleOk = hasTitle ? 'ok' : '✗'
    const descOk = hasDescription ? 'ok' : '✗'
    const ogOk = (hasOgTitle && hasOgDescription && titleMatches && descriptionMatches) ? 'ok' : '✗'
    const twOk = (hasTwitterCard && hasTwitterTitle && hasTwitterDescription && hasTwitterImage && 
                  twitterTitleMatches && twitterDescriptionMatches) ? 'ok' : '✗'
    const imgOk = ogImageExists ? '200' : '✗'

    console.log(`Route | TITLE ${titleOk} | DESC ${descOk} | OG ${ogOk} | TW ${twOk} | IMG ${imgOk}`)

    // Detailed issues
    if (!hasTitle) console.log(`  ❌ Missing title`)
    if (!hasDescription) console.log(`  ❌ Missing meta description`)
    if (!hasOgTitle) console.log(`  ❌ Missing og:title`)
    if (!hasOgDescription) console.log(`  ❌ Missing og:description`)
    if (!titleMatches) console.log(`  ❌ Title mismatch: "${meta.title}" vs "${meta.ogTitle}"`)
    if (!descriptionMatches) console.log(`  ❌ Description mismatch`)
    if (!hasOgImage) console.log(`  ❌ Missing og:image`)
    if (!ogImageExists) console.log(`  ❌ og:image not accessible: ${resolvedOgImage}`)
    if (!hasTwitterCard) console.log(`  ❌ twitter:card should be "summary_large_image", got: "${meta.twitterCard}"`)
    if (!hasTwitterTitle) console.log(`  ❌ Missing twitter:title`)
    if (!hasTwitterDescription) console.log(`  ❌ Missing twitter:description`)
    if (!hasTwitterImage) console.log(`  ❌ Missing twitter:image`)
    if (!twitterTitleMatches) console.log(`  ❌ Twitter title mismatch`)
    if (!twitterDescriptionMatches) console.log(`  ❌ Twitter description mismatch`)

    return {
      route,
      hasTitle,
      hasDescription,
      hasOgTitle,
      hasOgDescription,
      hasOgImage,
      ogImageExists,
      hasTwitterCard,
      hasTwitterTitle,
      hasTwitterDescription,
      hasTwitterImage,
      titleMatches,
      descriptionMatches,
      twitterTitleMatches,
      twitterDescriptionMatches
    }

  } catch (error) {
    console.log(`❌ Error checking ${route}: ${error.message}`)
    return { route, error: error.message }
  }
}

// Main audit function
const runAudit = async () => {
  console.log(`🚀 Starting SEO Audit for ${allRoutes.length} routes`)
  console.log(`📍 Base URL: ${BASE}`)
  console.log(`📅 ${new Date().toISOString()}`)

  const results = []
  
  for (const route of allRoutes) {
    const result = await validateRoute(route)
    results.push(result)
    
    // Small delay to be nice to the server
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  // Summary
  console.log(`\n📊 AUDIT SUMMARY`)
  console.log(`================`)
  
  const totalRoutes = results.length
  const errorRoutes = results.filter(r => r.error).length
  const successfulRoutes = totalRoutes - errorRoutes
  
  const criticalIssues = results.filter(r => 
    !r.error && (!r.hasTitle || !r.hasDescription || !r.ogImageExists)
  ).length

  const titleIssues = results.filter(r => !r.error && !r.hasTitle).length
  const descIssues = results.filter(r => !r.error && !r.hasDescription).length
  const ogIssues = results.filter(r => !r.error && (!r.hasOgTitle || !r.hasOgDescription || !r.titleMatches || !r.descriptionMatches)).length
  const twIssues = results.filter(r => !r.error && (!r.hasTwitterCard || !r.hasTwitterTitle || !r.hasTwitterDescription || !r.hasTwitterImage)).length
  const imgIssues = results.filter(r => !r.error && !r.ogImageExists).length

  console.log(`Total routes: ${totalRoutes}`)
  console.log(`Successful checks: ${successfulRoutes}`)
  console.log(`HTTP errors: ${errorRoutes}`)
  console.log(`\nIssues found:`)
  console.log(`  Missing titles: ${titleIssues}`)
  console.log(`  Missing descriptions: ${descIssues}`)
  console.log(`  Open Graph issues: ${ogIssues}`)
  console.log(`  Twitter Card issues: ${twIssues}`)
  console.log(`  Image accessibility issues: ${imgIssues}`)
  console.log(`  Critical issues (missing title/desc or broken image): ${criticalIssues}`)

  // Exit code
  const hasCriticalIssues = criticalIssues > 0
  console.log(`\n${hasCriticalIssues ? '❌' : '✅'} Audit ${hasCriticalIssues ? 'FAILED' : 'PASSED'}`)
  
  process.exit(hasCriticalIssues ? 1 : 0)
}

// Run the audit
runAudit().catch(error => {
  console.error('❌ Audit failed:', error)
  process.exit(1)
})
