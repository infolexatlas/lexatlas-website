# Required Fixes - Code Examples

## 🚨 **CRITICAL FIX 1: Dynamic Metadata for Kit Pages**

### **File**: `/src/app/kits/[slug]/page.tsx`

**Add this function after the existing imports:**

```typescript
// Add helper functions
function getCountryName(slug: string): string {
  const countryMap: Record<string, string> = {
    'usa': 'United States',
    'gbr': 'United Kingdom', 
    'can': 'Canada',
    'mar': 'Morocco',
    'deu': 'Germany',
    'che': 'Switzerland',
    'bel': 'Belgium',
    'esp': 'Spain',
    'ita': 'Italy',
    'prt': 'Portugal'
  };
  return countryMap[slug.split('-')[1]] || slug.split('-')[1].toUpperCase();
}

function getProcessType(slug: string): string {
  const processMap: Record<string, string> = {
    'usa': 'CCAM/recognition',
    'gbr': 'CNI/recognition',
    'can': 'recognition',
    'mar': 'transcription',
    'deu': 'reconnaissance',
    'che': 'reconnaissance',
    'bel': 'reconnaissance',
    'esp': 'reconnaissance',
    'ita': 'reconnaissance',
    'prt': 'reconnaissance'
  };
  return processMap[slug.split('-')[1]] || 'reconnaissance';
}

// Add this function before the existing Page component
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const norm = normalizeSlug(slug);
  if (!norm) return {};
  
  const kit = kitsDetail[norm];
  if (!kit) return {};
  
  const countryName = getCountryName(norm);
  const processType = getProcessType(norm);
  
  const title = `France ⇄ ${countryName} Marriage Guide (2025) | LexAtlas`;
  const description = `Documents, ${processType}, étapes légales pour un mariage France–${countryName}. Kit PDF prêt à l'emploi, téléchargement instantané.`;
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lex-atlas.com';
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/kits/${norm}`,
      siteName: 'LexAtlas',
      images: [
        {
          url: `${baseUrl}/og/kits/${norm}.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/og/kits/${norm}.png`],
      site: '@lexatlas',
      creator: '@lexatlas',
    },
  };
}
```

---

## 🚨 **CRITICAL FIX 2: Complete JSON-LD Product Schema**

### **File**: `/src/components/la/KitDetail/JsonLd.tsx`

**Replace the entire file with:**

```typescript
import React from 'react'

function getOptimizedDescription(slug: string): string {
  const descriptions: Record<string, string> = {
    'fra-usa': 'Documents, CCAM/recognition, étapes légales pour un mariage France–USA. Kit PDF prêt à l\'emploi, téléchargement instantané.',
    'fra-gbr': 'Documents, CNI/recognition, étapes légales pour un mariage France–UK. Kit PDF prêt à l\'emploi, téléchargement instantané.',
    'fra-can': 'Documents, recognition, étapes légales pour un mariage France–Canada. Kit PDF prêt à l\'emploi, téléchargement instantané.',
    'fra-mar': 'Documents, transcription, étapes légales pour un mariage France–Maroc. Kit PDF prêt à l\'emploi, téléchargement instantané.',
    'fra-deu': 'Documents, reconnaissance, étapes légales pour un mariage France–Allemagne. Kit PDF prêt à l\'emploi, téléchargement instantané.',
    'fra-che': 'Documents, reconnaissance, étapes légales pour un mariage France–Suisse. Kit PDF prêt à l\'emploi, téléchargement instantané.',
    'fra-bel': 'Documents, reconnaissance, étapes légales pour un mariage France–Belgique. Kit PDF prêt à l\'emploi, téléchargement instantané.',
    'fra-esp': 'Documents, reconnaissance, étapes légales pour un mariage France–Espagne. Kit PDF prêt à l\'emploi, téléchargement instantané.',
    'fra-ita': 'Documents, reconnaissance, étapes légales pour un mariage France–Italie. Kit PDF prêt à l\'emploi, téléchargement instantané.',
    'fra-prt': 'Documents, reconnaissance, étapes légales pour un mariage France–Portugal. Kit PDF prêt à l\'emploi, téléchargement instantané.',
  };
  return descriptions[slug] || 'Kit PDF prêt à l\'emploi, téléchargement instantané.';
}

export function JsonLd({ name, url, price, slug }: { name: string; url: string; price: number; slug: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lex-atlas.com';
  
  const data = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": name,
    "description": getOptimizedDescription(slug),
    "sku": `KIT-${slug.toUpperCase().replace('-', '-')}-2025`,
    "brand": {
      "@type": "Brand",
      "name": "LexAtlas"
    },
    "image": `${baseUrl}/images/kits/${slug}-cover.jpg`,
    "url": `${baseUrl}${url}`,
    "offers": {
      "@type": "Offer",
      "price": price.toString(),
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "url": `${baseUrl}${url}`,
      "validFrom": "2025-09-17"
    }
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function BreadcrumbsJsonLd({ name, url }: { name: string; url: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lex-atlas.com';
  
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${baseUrl}/` },
      { "@type": "ListItem", "position": 2, "name": "Kits", "item": `${baseUrl}/kits` },
      { "@type": "ListItem", "position": 3, "name": name, "item": `${baseUrl}${url}` },
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
```

**Update the JsonLd call in the Page component:**

```typescript
// In the Page component, update this line:
<JsonLd name={title} url={url} price={kit.priceEUR} slug={norm} />
```

---

## ⚠️ **MAJOR FIX 3: Font Preloading**

### **File**: `/src/app/layout.tsx`

**Add these preload links in the `<head>` section (after the existing preload links):**

```html
{/* Add after the existing preload links */}
<link 
  rel="preload" 
  href="/fonts/inter-var.woff2" 
  as="font" 
  type="font/woff2" 
  crossorigin
/>
<link 
  rel="preload" 
  href="/fonts/inter-bold.woff2" 
  as="font" 
  type="font/woff2" 
  crossorigin
/>
```

---

## ⚠️ **MAJOR FIX 4: Web Vitals Tracking**

### **File**: `/src/lib/web-vitals.ts` (create new file)

```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB, getINP } from 'web-vitals';

function sendToAnalytics(metric: any) {
  // Send to Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
  
  // Send to Vercel Analytics
  if (typeof analytics !== 'undefined') {
    analytics.track('web-vitals', {
      name: metric.name,
      value: metric.value,
      id: metric.id,
      delta: metric.delta,
    });
  }
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric.name, metric.value);
  }
}

// Initialize Web Vitals tracking
export function initWebVitals() {
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
  getINP(sendToAnalytics);
}
```

### **File**: `/src/app/layout.tsx`

**Add the import and initialization:**

```typescript
// Add import at the top
import { initWebVitals } from '@/lib/web-vitals';

// Add this script in the <body> section (before closing </body>)
<script
  dangerouslySetInnerHTML={{
    __html: `
      if (typeof window !== 'undefined') {
        import('/lib/web-vitals').then(({ initWebVitals }) => {
          initWebVitals();
        });
      }
    `,
  }}
/>
```

---

## ⚠️ **MAJOR FIX 5: Image Optimization**

### **File**: `/src/lib/image-optimization.ts` (create new file)

```typescript
// Image optimization utilities
export function getOptimizedImageUrl(src: string, width?: number, quality?: number): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lex-atlas.com';
  
  // Convert to WebP/AVIF format
  const formats = ['avif', 'webp'];
  const originalFormat = src.split('.').pop();
  
  // For now, return original URL
  // TODO: Implement actual image optimization
  return `${baseUrl}${src}`;
}

export function preloadCriticalImages() {
  const criticalImages = [
    '/logo/lexatlas.svg',
    '/og/home.png',
    '/og/kits.png',
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.type = src.endsWith('.svg') ? 'image/svg+xml' : 'image/png';
    document.head.appendChild(link);
  });
}
```

---

## 📝 **IMPLEMENTATION CHECKLIST**

### **Critical Fixes (Must Do Before Deployment)**
- [ ] Add `generateMetadata` function to kit pages
- [ ] Update JSON-LD Product schema with complete fields
- [ ] Add font preloading links
- [ ] Test all changes in staging environment

### **Major Fixes (Should Do Before Deployment)**
- [ ] Implement Web Vitals tracking
- [ ] Create image optimization utilities
- [ ] Add critical image preloading
- [ ] Test performance improvements

### **Minor Fixes (Can Do Post-Launch)**
- [ ] Convert images to AVIF/WebP format
- [ ] Implement service worker for caching
- [ ] Add advanced robots.txt directives
- [ ] Create blog posts from content briefs

---

## 🧪 **Testing Instructions**

### **After Implementing Fixes:**

1. **Test Kit Page Metadata:**
   ```bash
   curl -s http://localhost:3000/kits/fra-usa | grep -i "title\|meta description"
   ```

2. **Validate JSON-LD Schema:**
   - Use Google's Rich Results Test: https://search.google.com/test/rich-results
   - Test URL: `http://localhost:3000/kits/fra-usa`

3. **Check Performance:**
   - Use Chrome DevTools Lighthouse
   - Target: LCP ≤2.5s, INP <200ms, CLS <0.1

4. **Verify Font Preloading:**
   - Check Network tab for font preloads
   - Verify no layout shifts during font loading

### **Expected Results After Fixes:**
- ✅ Kit pages show optimized titles and descriptions
- ✅ Complete JSON-LD Product schemas
- ✅ Faster font loading (better LCP)
- ✅ Web Vitals tracking active
- ✅ All critical SEO elements in place

---

**Note**: These fixes address the critical blockers identified in the audit. Once implemented and tested, the site will be ready for deployment with proper SEO optimization.
