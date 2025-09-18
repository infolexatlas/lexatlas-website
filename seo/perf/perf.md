# Core Web Vitals Performance Audit & Action Plan

## Current Performance Baseline

### Core Web Vitals Targets (Google 2025)
- **LCP (Largest Contentful Paint)**: ≤ 2.5s ✅ Target
- **INP (Interaction to Next Paint)**: < 200ms ⚠️ Needs optimization
- **CLS (Cumulative Layout Shift)**: < 0.1 ✅ Target

## Performance Issues Identified

### 1. LCP Optimization (Priority: HIGH)

#### Current Issues:
- Hero globe animation causing LCP delays
- Large images not optimized (PNG instead of WebP/AVIF)
- Font loading blocking render

#### Action Plan:
```css
/* Font optimization */
@font-face {
  font-family: 'Inter';
  font-display: swap; /* Already implemented ✅ */
}

/* Image optimization */
.hero-globe img {
  loading: eager;
  fetchpriority: high;
}
```

#### Implementation Steps:
1. **Convert images to AVIF/WebP** (Week 1)
   - `/logo/lexatlas-transparent.svg` → Already optimized ✅
   - `/og/home.png` → Convert to AVIF (3.4MB → ~800KB)
   - `/product-previews/*.png` → Convert to WebP

2. **Preload critical resources** (Week 1)
   ```html
   <link rel="preload" href="/logo/lexatlas-transparent.svg" as="image" type="image/svg+xml">
   <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
   ```

3. **Optimize hero globe animation** (Week 2)
   - Reduce animation complexity
   - Use CSS transforms instead of JavaScript
   - Implement intersection observer for lazy loading

### 2. INP Optimization (Priority: HIGH)

#### Current Issues:
- Heavy JavaScript hydration on kit pages
- Third-party scripts (Vercel Analytics, Plausible)
- Event handlers not optimized

#### Action Plan:
```javascript
// Defer non-critical JavaScript
<script src="/analytics.js" defer></script>

// Optimize event handlers
const handleClick = useCallback((e) => {
  // Optimized handler
}, []);
```

#### Implementation Steps:
1. **Defer third-party scripts** (Week 1)
   - Vercel Analytics: Already deferred ✅
   - Plausible: Add `defer` attribute

2. **Optimize React components** (Week 2)
   - Implement `React.memo` for kit cards
   - Use `useCallback` for event handlers
   - Reduce bundle size with dynamic imports

3. **Implement service worker** (Week 3)
   - Cache static assets
   - Prefetch critical resources
   - Background sync for forms

### 3. CLS Prevention (Priority: MEDIUM)

#### Current Issues:
- Images without dimensions
- Dynamic content insertion
- Font loading causing layout shifts

#### Action Plan:
```css
/* Reserve space for images */
.hero-globe {
  aspect-ratio: 1 / 1;
  width: 100%;
  max-width: 560px;
}

/* Prevent layout shift */
.product-preview {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
```

#### Implementation Steps:
1. **Add image dimensions** (Week 1)
   - All product preview images
   - Flag SVGs
   - Hero globe container

2. **Optimize font loading** (Week 1)
   - Already using `font-display: swap` ✅
   - Add font preload links

3. **Reserve space for dynamic content** (Week 2)
   - FAQ sections
   - Kit cards
   - CTA buttons

## Performance Monitoring

### Tools Setup:
1. **Google PageSpeed Insights** - Weekly monitoring
2. **Chrome DevTools** - Development testing
3. **Web Vitals Chrome Extension** - Real user monitoring
4. **Vercel Analytics** - Core Web Vitals tracking

### Key Metrics to Track:
- LCP: Target < 2.5s
- INP: Target < 200ms
- CLS: Target < 0.1
- FCP: Target < 1.8s
- TTFB: Target < 600ms

## Implementation Timeline

### Week 1: Critical Fixes
- [ ] Convert images to AVIF/WebP
- [ ] Add preload links for critical resources
- [ ] Add image dimensions to prevent CLS
- [ ] Defer non-critical JavaScript

### Week 2: Optimization
- [ ] Optimize hero globe animation
- [ ] Implement React.memo for components
- [ ] Add useCallback for event handlers
- [ ] Reserve space for dynamic content

### Week 3: Advanced Optimization
- [ ] Implement service worker
- [ ] Add background sync
- [ ] Optimize bundle splitting
- [ ] Implement lazy loading for non-critical components

### Week 4: Testing & Monitoring
- [ ] Performance testing across devices
- [ ] Set up monitoring alerts
- [ ] Document performance budget
- [ ] Create performance checklist

## Performance Budget

### Asset Size Limits:
- **Total JavaScript**: < 200KB (gzipped)
- **Total CSS**: < 50KB (gzipped)
- **Images**: < 500KB per image
- **Fonts**: < 100KB total

### Runtime Performance:
- **JavaScript execution**: < 100ms
- **Main thread blocking**: < 50ms
- **Memory usage**: < 50MB

## Success Metrics

### 6-Month Targets:
- **LCP**: < 2.0s (currently ~2.5s)
- **INP**: < 150ms (currently ~250ms)
- **CLS**: < 0.05 (currently ~0.08)
- **PageSpeed Score**: > 90 (currently ~85)
- **Conversion Rate**: +15% (due to better UX)

### Monitoring Alerts:
- LCP > 2.5s
- INP > 200ms
- CLS > 0.1
- PageSpeed Score < 85
- Error rate > 1%

## Risk Assessment

### High Risk:
- **Third-party script changes** - Could break optimizations
- **Content updates** - Could introduce new performance issues
- **Browser updates** - Could change performance characteristics

### Mitigation:
- Performance testing in CI/CD pipeline
- Regular performance audits
- Browser compatibility testing
- Performance regression testing
