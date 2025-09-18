# Post-Deployment QA Checklist

This checklist should be completed after each production deployment to ensure the site is functioning correctly.

## Pre-Deployment Checklist

- [ ] All tests pass in CI/CD pipeline
- [ ] Environment variables are properly set in Vercel
- [ ] Database migrations (if any) are completed
- [ ] Third-party services are configured and tested

## Post-Deployment Verification

### 1. DNS & SSL Verification

- [ ] **DNS Resolution**: `lex-atlas.com` resolves to correct IP
- [ ] **SSL Certificate**: Valid SSL certificate for `lex-atlas.com`
- [ ] **WWW Redirect**: `www.lex-atlas.com` redirects to `lex-atlas.com`
- [ ] **HTTPS Enforcement**: All HTTP requests redirect to HTTPS
- [ ] **Certificate Chain**: SSL certificate chain is complete

**Commands to verify:**
```bash
# Check DNS
nslookup lex-atlas.com
dig lex-atlas.com

# Check SSL
openssl s_client -connect lex-atlas.com:443 -servername lex-atlas.com

# Check redirects
curl -I http://www.lex-atlas.com
curl -I http://lex-atlas.com
```

### 2. Google Search Console (GSC)

- [ ] **Property Verification**: GSC property is verified for `lex-atlas.com`
- [ ] **Sitemap Submission**: Sitemap is submitted and indexed
  - [ ] `/sitemap.xml` is accessible
  - [ ] Sitemap contains all 10 kit pages
  - [ ] Sitemap is error-free in GSC
- [ ] **Index Request**: Request indexing for all 10 kit pages
- [ ] **URL Inspection**: Test 3 random kit URLs in GSC URL inspection tool

**Kit URLs to request indexing:**
- `/kits/france-usa-marriage-guide`
- `/kits/france-uk-marriage-guide`
- `/kits/france-canada-marriage-guide`
- `/kits/france-morocco-marriage-guide`
- `/kits/france-germany-marriage-guide`
- `/kits/france-switzerland-marriage-guide`
- `/kits/france-belgium-marriage-guide`
- `/kits/france-spain-marriage-guide`
- `/kits/france-italy-marriage-guide`
- `/kits/france-portugal-marriage-guide`

### 3. Rich Results Testing

- [ ] **Google Rich Results Test**: Test 3 kit pages for Product JSON-LD
  - [ ] `/kits/france-usa-marriage-guide`
  - [ ] `/kits/france-uk-marriage-guide`
  - [ ] `/kits/france-canada-marriage-guide`
- [ ] **JSON-LD Validation**: No errors in Product structured data
- [ ] **Required Fields**: All required Product fields are present
  - [ ] `@type`: "Product"
  - [ ] `name`: Kit title
  - [ ] `description`: Kit description
  - [ ] `price`: "29.00"
  - [ ] `currency`: "EUR"
  - [ ] `sku`: Kit SKU
  - [ ] `url`: Canonical URL
  - [ ] `validFrom`: Valid from date

**Tools to use:**
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

### 4. Core Web Vitals (CWV)

- [ ] **PageSpeed Insights**: Test Home + 3 kit pages
  - [ ] Homepage (`/`)
  - [ ] `/kits/france-usa-marriage-guide`
  - [ ] `/kits/france-uk-marriage-guide`
  - [ ] `/kits/france-canada-marriage-guide`

**Performance Targets:**
- [ ] **LCP (Largest Contentful Paint)**: ≤ 2.5 seconds
- [ ] **INP (Interaction to Next Paint)**: < 200ms
- [ ] **CLS (Cumulative Layout Shift)**: < 0.1
- [ ] **FCP (First Contentful Paint)**: ≤ 1.8 seconds
- [ ] **TTI (Time to Interactive)**: ≤ 3.8 seconds

**Tools to use:**
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [GTmetrix](https://gtmetrix.com/)

### 5. SEO Meta Tags Verification

- [ ] **Title Tags**: Unique and descriptive for all pages
  - [ ] Homepage: Contains "LexAtlas"
  - [ ] Kit pages: Contain "Marriage Guide" and country names
  - [ ] No duplicate titles across pages
- [ ] **Meta Descriptions**: Present and unique for all pages
  - [ ] Length: 150-160 characters
  - [ ] Descriptive and compelling
  - [ ] No duplicate descriptions
- [ ] **Canonical URLs**: Exact absolute URLs
  - [ ] Homepage: `https://lex-atlas.com`
  - [ ] Kit pages: `https://lex-atlas.com/kits/[slug]`
  - [ ] No trailing slashes
- [ ] **Open Graph Tags**: Present and correct
  - [ ] `og:title`: Matches page title
  - [ ] `og:description`: Matches meta description
  - [ ] `og:url`: Canonical URL
  - [ ] `og:type`: "website" for pages, "product" for kits
  - [ ] `og:image`: Present and accessible
- [ ] **Twitter Card Tags**: Present and correct
  - [ ] `twitter:card`: "summary_large_image"
  - [ ] `twitter:title`: Matches page title
  - [ ] `twitter:description`: Matches meta description
  - [ ] `twitter:image`: Present and accessible

### 6. Internal Linking Structure

- [ ] **Homepage Links**: Links to popular kits
  - [ ] France-USA kit link
  - [ ] France-UK kit link
  - [ ] France-Canada kit link
- [ ] **Kit Page Links**: Each kit links to 2 related kits
  - [ ] Related kits are relevant
  - [ ] Links are descriptive
  - [ ] No broken internal links
- [ ] **Navigation**: Main navigation works correctly
  - [ ] All menu items are clickable
  - [ ] Dropdown menus function properly
  - [ ] Mobile navigation works

### 7. Error Pages

- [ ] **404 Page**: Custom 404 page renders correctly
  - [ ] Accessible at `/non-existent-page`
  - [ ] Contains helpful navigation
  - [ ] Returns 404 status code
- [ ] **500 Page**: Custom 500 page renders correctly
  - [ ] Accessible when server errors occur
  - [ ] Contains helpful information
  - [ ] Returns 500 status code
- [ ] **Error Handling**: Graceful error handling
  - [ ] No exposed error messages
  - [ ] User-friendly error pages
  - [ ] Proper HTTP status codes

### 8. Security Headers

- [ ] **Security Headers**: All security headers are present
  - [ ] `Strict-Transport-Security`: HSTS enabled
  - [ ] `X-Content-Type-Options`: "nosniff"
  - [ ] `X-Frame-Options`: "DENY"
  - [ ] `X-XSS-Protection`: "1; mode=block"
  - [ ] `Referrer-Policy`: "strict-origin-when-cross-origin"
  - [ ] `Permissions-Policy`: Restrictive permissions
  - [ ] `Content-Security-Policy`: Proper CSP header

**Command to verify:**
```bash
curl -I https://lex-atlas.com
```

### 9. Performance & Caching

- [ ] **Static Assets**: Proper caching headers
  - [ ] CSS/JS files: `Cache-Control: public, max-age=31536000, immutable`
  - [ ] Images: `Cache-Control: public, max-age=86400`
  - [ ] HTML: `Cache-Control: no-store`
- [ ] **CDN**: Vercel CDN is serving assets
- [ ] **Compression**: Gzip/Brotli compression enabled
- [ ] **Image Optimization**: Next.js image optimization working
  - [ ] WebP/AVIF formats served when supported
  - [ ] Responsive images with proper sizes

### 10. Analytics & Monitoring

- [ ] **Analytics**: Analytics tracking is working
  - [ ] Google Analytics 4 (if configured)
  - [ ] Plausible Analytics (if configured)
  - [ ] Vercel Analytics
- [ ] **Error Monitoring**: Error tracking is working
  - [ ] Sentry (if configured)
  - [ ] Vercel error monitoring
- [ ] **Performance Monitoring**: Performance tracking is working
  - [ ] Web Vitals reporting
  - [ ] Core Web Vitals monitoring

### 11. Third-Party Integrations

- [ ] **Stripe**: Payment processing works
  - [ ] Test payment flow
  - [ ] Webhook endpoints respond correctly
  - [ ] Error handling for failed payments
- [ ] **Email**: Email functionality works
  - [ ] Contact form submissions
  - [ ] Email notifications
  - [ ] Email templates render correctly
- [ ] **APIs**: All API endpoints respond correctly
  - [ ] `/api/vitals` endpoint
  - [ ] Other custom API endpoints
  - [ ] Proper error responses

### 12. Mobile & Accessibility

- [ ] **Mobile Responsiveness**: Site works on mobile devices
  - [ ] Navigation works on mobile
  - [ ] Content is readable
  - [ ] Touch targets are appropriate size
- [ ] **Accessibility**: Basic accessibility checks
  - [ ] Alt text for images
  - [ ] Proper heading structure
  - [ ] Keyboard navigation works
  - [ ] Screen reader compatibility

## Automated Testing

- [ ] **Smoke Tests**: Run automated smoke tests
  ```bash
  BASE_URL=https://lex-atlas.com bash scripts/smoke-tests.sh
  ```
- [ ] **Post-Deploy Script**: Run post-deployment verification
  ```bash
  bash scripts/post-deploy.sh https://lex-atlas.com
  ```

## Sign-off

- [ ] **QA Lead**: All checks completed and passed
- [ ] **Dev Lead**: Technical verification completed
- [ ] **Product Owner**: Business requirements met
- [ ] **Deployment**: Marked as successful in deployment tracking

---

**Date**: ___________  
**Deployment Version**: ___________  
**QA Lead**: ___________  
**Sign-off**: ___________
