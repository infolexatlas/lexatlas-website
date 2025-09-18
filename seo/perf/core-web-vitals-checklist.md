# Core Web Vitals Optimization Checklist - LexAtlas

## Performance Targets (Google 2025)
- **LCP (Largest Contentful Paint)**: ≤ 2.5s ✅ Target
- **INP (Interaction to Next Paint)**: < 200ms ⚠️ Needs optimization
- **CLS (Cumulative Layout Shift)**: < 0.1 ✅ Target

## 1. Image Optimization

### ✅ **Modern Format Conversion**
- [ ] Convert all kit cover images to AVIF format
  - `/images/kits/fra-usa-cover.jpg` → `fra-usa-cover.avif`
  - `/images/kits/fra-gbr-cover.jpg` → `fra-gbr-cover.avif`
  - `/images/kits/fra-can-cover.jpg` → `fra-can-cover.avif`
  - `/images/kits/fra-mar-cover.jpg` → `fra-mar-cover.avif`
  - `/images/kits/fra-deu-cover.jpg` → `fra-deu-cover.avif`
  - `/images/kits/fra-che-cover.jpg` → `fra-che-cover.avif`
  - `/images/kits/fra-bel-cover.jpg` → `fra-bel-cover.avif`
  - `/images/kits/fra-esp-cover.jpg` → `fra-esp-cover.avif`
  - `/images/kits/fra-ita-cover.jpg` → `fra-ita-cover.avif`
  - `/images/kits/fra-prt-cover.jpg` → `fra-prt-cover.avif`

- [ ] Convert product preview images to WebP format
  - `/product-previews/1.png` → `1.webp`
  - `/product-previews/2.png` → `2.webp`
  - `/product-previews/3.png` → `3.webp`
  - `/product-previews/4.png` → `4.webp`

### ✅ **LCP Image Preloading**
```html
<!-- Add to <head> for hero images -->
<link rel="preload" href="/images/kits/fra-usa-cover.avif" as="image" type="image/avif">
<link rel="preload" href="/logo/lexatlas-transparent.svg" as="image" type="image/svg+xml">
```

### ✅ **Lazy Loading Implementation**
```html
<!-- For images below the fold -->
<img src="/product-previews/1.webp" loading="lazy" alt="Kit preview 1">
<img src="/product-previews/2.webp" loading="lazy" alt="Kit preview 2">
<img src="/product-previews/3.webp" loading="lazy" alt="Kit preview 3">
<img src="/product-previews/4.webp" loading="lazy" alt="Kit preview 4">
```

## 2. Font Optimization

### ✅ **Font Display Optimization**
```css
/* Already implemented ✅ */
@font-face {
  font-family: 'Inter';
  font-display: swap; /* Prevents FOIT */
}
```

### ✅ **Critical Font Preloading**
```html
<!-- Add to <head> -->
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/inter-bold.woff2" as="font" type="font/woff2" crossorigin>
```

### ✅ **Font Optimization**
- [ ] Minimize font imports (currently using Inter only ✅)
- [ ] Use `font-display: swap` for all fonts ✅
- [ ] Preload critical font files
- [ ] Consider system font fallbacks

## 3. JavaScript Optimization

### ✅ **Script Deferring/Async**
```html
<!-- Defer non-critical scripts -->
<script src="/analytics.js" defer></script>
<script src="/chat-widget.js" defer></script>

<!-- Async for third-party scripts -->
<script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" async></script>
```

### ✅ **Event Handler Optimization**
```javascript
// Use passive event listeners for scroll events
document.addEventListener('scroll', handleScroll, { passive: true });

// Optimize click handlers with useCallback
const handleClick = useCallback((e) => {
  // Optimized handler
}, []);

// Debounce input handlers
const debouncedSearch = useCallback(
  debounce((query) => {
    // Search logic
  }, 300),
  []
);
```

### ✅ **Bundle Splitting**
```javascript
// Dynamic imports for non-critical components
const FAQ = dynamic(() => import('./FAQ'), { ssr: false });
const Testimonials = dynamic(() => import('./Testimonials'), { ssr: false });
const ChatWidget = dynamic(() => import('./ChatWidget'), { ssr: false });
```

## 4. CLS Prevention

### ✅ **Image Dimensions**
```html
<!-- Reserve space for images -->
<img src="/product-previews/1.webp" 
     width="300" 
     height="200" 
     alt="Kit preview 1"
     style="aspect-ratio: 3/2;">
```

### ✅ **Container Sizing**
```css
/* Reserve space for dynamic content */
.hero-globe {
  aspect-ratio: 1 / 1;
  width: 100%;
  max-width: 560px;
}

.product-preview {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.faq-item {
  min-height: 60px; /* Prevent layout shift when expanding */
}
```

### ✅ **Dynamic Content Prevention**
```css
/* Reserve space for banners/ads */
.ad-banner {
  min-height: 250px;
  width: 100%;
}

/* Prevent layout shift from loading states */
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}
```

## 5. LCP Optimization

### ✅ **Critical Resource Prioritization**
```html
<!-- Preload critical resources -->
<link rel="preload" href="/css/critical.css" as="style">
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/images/kits/fra-usa-cover.avif" as="image" type="image/avif">
```

### ✅ **Critical CSS Inlining**
```html
<!-- Inline critical CSS for above-the-fold content -->
<style>
  /* Critical styles for hero section */
  .hero {
    display: flex;
    align-items: center;
    min-height: 100vh;
  }
  /* ... other critical styles */
</style>
```

### ✅ **Render-Blocking Resource Elimination**
```html
<!-- Defer non-critical CSS -->
<link rel="preload" href="/css/non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/css/non-critical.css"></noscript>
```

## 6. INP Optimization

### ✅ **Event Handler Optimization**
```javascript
// Use passive event listeners
document.addEventListener('touchstart', handleTouch, { passive: true });
document.addEventListener('touchmove', handleMove, { passive: true });

// Debounce expensive operations
const debouncedResize = debounce(handleResize, 250);
window.addEventListener('resize', debouncedResize);
```

### ✅ **Input Handler Optimization**
```javascript
// Optimize form handlers
const handleInput = useCallback((e) => {
  // Use requestAnimationFrame for DOM updates
  requestAnimationFrame(() => {
    updateUI(e.target.value);
  });
}, []);
```

### ✅ **Long Task Prevention**
```javascript
// Break up long tasks
function processLargeDataset(data) {
  return new Promise((resolve) => {
    const chunkSize = 100;
    let index = 0;
    
    function processChunk() {
      const chunk = data.slice(index, index + chunkSize);
      // Process chunk
      index += chunkSize;
      
      if (index < data.length) {
        setTimeout(processChunk, 0); // Yield to browser
      } else {
        resolve();
      }
    }
    
    processChunk();
  });
}
```

## 7. Service Worker Implementation

### ✅ **Caching Strategy**
```javascript
// sw.js
const CACHE_NAME = 'lexatlas-v1';
const urlsToCache = [
  '/',
  '/kits',
  '/pricing',
  '/css/critical.css',
  '/fonts/inter-var.woff2',
  '/images/kits/fra-usa-cover.avif'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});
```

## 8. Performance Monitoring

### ✅ **Core Web Vitals Tracking**
```javascript
// Add to analytics
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  gtag('event', metric.name, {
    event_category: 'Web Vitals',
    event_label: metric.id,
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    non_interaction: true,
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### ✅ **Performance Budget**
```javascript
// performance-budget.js
const PERFORMANCE_BUDGET = {
  'largest-contentful-paint': 2500, // 2.5s
  'first-input-delay': 200,         // 200ms
  'cumulative-layout-shift': 0.1,   // 0.1
  'first-contentful-paint': 1800,   // 1.8s
  'speed-index': 3000,              // 3s
  'total-blocking-time': 300,       // 300ms
};

function checkPerformanceBudget(metrics) {
  Object.entries(metrics).forEach(([metric, value]) => {
    if (value > PERFORMANCE_BUDGET[metric]) {
      console.warn(`Performance budget exceeded for ${metric}: ${value}ms`);
    }
  });
}
```

## 9. Implementation Timeline

### **Week 1: Critical Fixes**
- [ ] Convert images to AVIF/WebP
- [ ] Add preload links for critical resources
- [ ] Add image dimensions to prevent CLS
- [ ] Defer non-critical JavaScript

### **Week 2: Optimization**
- [ ] Implement React.memo for components
- [ ] Add useCallback for event handlers
- [ ] Reserve space for dynamic content
- [ ] Optimize font loading

### **Week 3: Advanced Optimization**
- [ ] Implement service worker
- [ ] Add background sync
- [ ] Optimize bundle splitting
- [ ] Implement lazy loading

### **Week 4: Testing & Monitoring**
- [ ] Performance testing across devices
- [ ] Set up monitoring alerts
- [ ] Document performance budget
- [ ] Create performance checklist

## 10. Success Metrics

### **Target Improvements**
- **LCP**: < 2.0s (currently ~2.5s)
- **INP**: < 150ms (currently ~250ms)
- **CLS**: < 0.05 (currently ~0.08)
- **PageSpeed Score**: > 90 (currently ~85)
- **Conversion Rate**: +15% (due to better UX)

### **Monitoring Alerts**
- LCP > 2.5s
- INP > 200ms
- CLS > 0.1
- PageSpeed Score < 85
- Error rate > 1%

## 11. Tools & Resources

### **Development Tools**
- Chrome DevTools Lighthouse
- WebPageTest.org
- GTmetrix
- PageSpeed Insights

### **Monitoring Tools**
- Google Search Console
- Vercel Analytics
- Web Vitals Chrome Extension
- Real User Monitoring (RUM)

### **Optimization Tools**
- ImageOptim (for image compression)
- Webpack Bundle Analyzer
- React DevTools Profiler
- Chrome Performance Tab

---

**Note**: This checklist should be implemented incrementally, with performance testing after each major change. Regular monitoring and optimization will ensure sustained performance improvements.
