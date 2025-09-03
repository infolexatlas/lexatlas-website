# Robots.txt Configuration

## Overview

The LexAtlas website uses a dynamic robots.txt configuration that adapts to different environments (development vs production) based on the `NEXT_PUBLIC_BASE_URL` environment variable.

## Implementation

### Dynamic Route
- **File**: `src/app/robots.txt/route.ts`
- **Purpose**: Generates robots.txt content dynamically with environment-specific sitemap URLs

### Configuration

The robots.txt includes:

```txt
User-agent: *
Allow: /

# Disallow internal API and preview routes
Disallow: /api/
Disallow: /preview/

# Disallow admin and API routes
Disallow: /admin/
Disallow: /_next/
Disallow: /checkout
Disallow: /kits/*/success
Disallow: /kits/*/cancel

# Allow marriage kit pages
Allow: /kits/marriage-kit/

# Crawl delay
Crawl-delay: 1

# Sitemap
Sitemap: {BASE_URL}/sitemap.xml
```

## Environment Variables

- **Development**: `NEXT_PUBLIC_BASE_URL=http://localhost:3000`
- **Production**: `NEXT_PUBLIC_BASE_URL=https://lexatlas.com`

## Testing

Run the test script to verify configuration:

```bash
npm run test:robots
```

This will test:
- ✅ robots.txt accessibility
- ✅ sitemap.xml accessibility and validity
- ✅ Environment variable handling
- ✅ URL count in sitemap

## Verification

### Manual Testing

1. **Development**:
   ```bash
   curl http://localhost:3000/robots.txt
   curl http://localhost:3000/sitemap.xml
   ```

2. **Production**:
   ```bash
   curl https://lexatlas.com/robots.txt
   curl https://lexatlas.com/sitemap.xml
   ```

### Expected Output

- **robots.txt**: Should return the robots.txt content with correct sitemap URL
- **sitemap.xml**: Should return valid XML with all site URLs

## Disallowed Routes

The following routes are blocked from crawling:
- `/api/*` - Internal API endpoints
- `/preview/*` - Preview pages
- `/admin/*` - Admin routes
- `/_next/*` - Next.js internal files
- `/checkout` - Checkout pages
- `/kits/*/success` - Success pages
- `/kits/*/cancel` - Cancel pages

## Allowed Routes

- `/kits/marriage-kit/*` - Marriage kit pages (explicitly allowed)

## Crawl Delay

Set to 1 second to be respectful to search engine crawlers.
