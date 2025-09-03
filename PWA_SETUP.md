# LexAtlas PWA Setup

This document explains the Progressive Web App (PWA) implementation for LexAtlas.

## Overview

LexAtlas is configured as a PWA with:
- **Icons**: Generated from `/public/logo/lexatlas.svg`
- **Manifest**: `/public/manifest.webmanifest`
- **Metadata**: Configured via Next.js metadata API in `src/app/layout.tsx`
- **Theme Color**: `#0A2342` (brand deep navy)

## Icon Management

### Icon Locations
All icons are stored in `/public/`:
- `favicon.ico` - Multi-size favicon (16x16, 32x32)
- `favicon-16x16.png` - Small favicon
- `favicon-32x32.png` - Standard favicon
- `apple-touch-icon.png` - iOS home screen icon (180x180)
- `icon-192.png` - Standard PWA icon (192x192)
- `icon-512.png` - Large PWA icon (512x512)
- `maskable-192.png` - Maskable icon with safe area (192x192)
- `maskable-512.png` - Maskable icon with safe area (512x512)

### Regenerating Icons
To regenerate all icons from the source SVG:

```bash
npm run generate:icons
```

This script:
1. Reads `/public/logo/lexatlas.svg`
2. Generates all required PNG sizes
3. Creates maskable icons with 10% padding for safe area
4. Updates `favicon.ico`

## Manifest Configuration

The web app manifest (`/public/manifest.webmanifest`) includes:
- **App Name**: "LexAtlas"
- **Short Name**: "LexAtlas"
- **Description**: "Cross-Border Marriage Kits, Done Right."
- **Display Mode**: Standalone (full-screen app)
- **Theme Color**: `#0A2342` (brand deep navy)
- **Background Color**: `#FFFFFF` (white)
- **Orientation**: Portrait
- **Categories**: Business, Productivity, Reference

## Theme Color Control

The theme color (`#0A2342`) is controlled in two places:
1. **Manifest**: `theme_color` field
2. **Layout Metadata**: `themeColor` in `src/app/layout.tsx`

To change the theme color:
1. Update `theme_color` in `/public/manifest.webmanifest`
2. Update `themeColor` in `src/app/layout.tsx`

## Metadata Configuration

PWA metadata is handled by Next.js metadata API in `src/app/layout.tsx`:
- **Icons**: Multiple sizes for different contexts
- **Apple Touch Icon**: iOS home screen
- **Manifest Link**: Points to web app manifest
- **Theme Color**: Browser UI color

No manual `<link>` tags are needed - Next.js handles this automatically.

## Testing

### Automated Tests
Run the PWA test suite:

```bash
npm run test:pwa
```

This checks:
- Manifest loads correctly (200 status)
- All icon files are accessible
- Required manifest fields are present
- HTML contains proper metadata

### Manual Testing
1. **Lighthouse PWA Audit**: Run Lighthouse and check PWA category
2. **Mobile Testing**: Test "Add to Home Screen" on mobile devices
3. **Browser DevTools**: Check Application tab for manifest and icons

## Future Enhancements

### Service Worker (Planned)
- Offline functionality
- Background sync
- Push notifications
- Runtime caching

### Additional Features
- Splash screens for different orientations
- Shortcuts for common actions
- File handling for PDF downloads

## Troubleshooting

### Icons Not Loading
1. Check file permissions in `/public/`
2. Verify icon files exist
3. Run `npm run generate:icons` to regenerate

### Manifest Issues
1. Validate JSON syntax
2. Check required fields
3. Verify icon paths are correct

### Theme Color Not Applied
1. Check both manifest and layout metadata
2. Clear browser cache
3. Verify color format is `#RRGGBB`

## Development vs Production

- **Development**: Uses `http://localhost:3000` for testing
- **Production**: Uses `NEXT_PUBLIC_BASE_URL` environment variable
- **Icons**: Same across environments
- **Manifest**: Same across environments

## Security Notes

- Icons are served as static files (no security concerns)
- Manifest is public (required for PWA functionality)
- No sensitive data in PWA configuration
