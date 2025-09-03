# LexAtlas Website

Expert-built, country-specific PDF guides to handle international legal procedures with clarity and confidence.

## Features

- **Marriage Kits**: Comprehensive guides for international marriage procedures
- **Multiple Countries**: Support for 10+ country pairs
- **Secure Payments**: Stripe integration for safe transactions
- **Instant Downloads**: Immediate access to purchased guides
- **Lead Generation**: Email collection with free sample downloads
- **Analytics**: Plausible integration for conversion tracking

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Stripe account
- Resend account (for email sending)
- Plausible account (for analytics)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lexatlas-website
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp env.example .env.local
```

4. Configure environment variables in `.env.local`:
```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Email Service (Resend)
RESEND_API_KEY=re_...

# Email Sender Configuration
# In development: you don't need RESEND_FROM; the app will use onboarding@resend.dev
# In production: set RESEND_FROM="LexAtlas <hello@lexatlas.com>" and verify your domain in Resend
RESEND_FROM="LexAtlas <hello@lexatlas.com>"

# Analytics (Plausible)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=lexatlas.com
```

5. Start the development server:
```bash
npm run dev
```

## Development Scripts

### Dev Server Management

If you encounter issues with the development server (hanging, chunk errors, etc.), use these scripts:

- **`npm run dev:kill`** — Kill orphaned processes on ports 3000–3002
- **`npm run dev:reset:only`** — Just clean caches (no restart)
- **`npm run dev:reset`** — Clean caches then start dev server
- **`npm run dev:reset:hard`** — Full nuke (includes dependency reinstall) then starts dev

### Troubleshooting Dev Server Issues

1. **Server hangs on startup**: Run `npm run dev:kill` then `npm run dev:reset`
2. **"Cannot find module './###.js'" errors**: Run `npm run dev:reset:hard`
3. **Port already in use**: Run `npm run dev:kill` then `npm run dev`
4. **Hot reload not working**: Run `npm run dev:reset:only`

### Other Useful Scripts

- **`npm run diagnose:chunks`** — Check for missing webpack chunks
- **`npm run clean`** — Clean build caches using rimraf

## Testing Lead Magnet & Analytics

### Lead Magnet Testing

1. **Home Page Lead Magnet**:
   - Navigate to `/` (home page)
   - Scroll down to find the "Not ready to buy? Get a free checklist sample" banner
   - Enter a valid email address
   - Click "Get Free Sample"
   - Check your email for the download link

2. **Pricing Page Lead Magnet**:
   - Navigate to `/pricing`
   - Scroll down past the pricing cards
   - Test the lead magnet banner with different email addresses

3. **Footer Newsletter**:
   - Scroll to the footer on any page
   - Find the "Stay updated with new country kits" section
   - Enter an email and click "Subscribe"

### Analytics Testing

The following events are tracked automatically:

- **`lead_magnet_submit`**: When someone submits the lead magnet form
  - Props: `source` (banner/footer)
- **`newsletter_submit`**: When someone subscribes to the newsletter
  - Props: `source` (footer)
- **`checkout_click`**: When someone clicks a checkout button
  - Props: `type` (single/bundle3/bundle10)
- **`checkout_success`**: When a purchase is completed
  - Props: `type`, `items_count`, `session_id`

### Testing Analytics Events

1. **Check Plausible Dashboard**:
   - Log into your Plausible account
   - Navigate to your domain dashboard
   - Look for custom events in the "Events" section

2. **Browser Console**:
   - Open browser developer tools
   - Check the console for analytics calls
   - Events are sent to `plausible.io`

3. **Test Event Tracking**:
   ```javascript
   // Manual event testing in browser console
   window.plausible('test_event', { props: { test: true } })
   ```

### Email Testing

#### Development Mode (Save-Only)
When `RESEND_API_KEY` is not set in development:
- ✅ Leads are saved to `.data/leads.jsonl`
- ✅ Success UI is shown to users
- ✅ Non-blocking warning appears: "📬 Email not sent in development (missing RESEND_API_KEY). Your lead is saved."
- ✅ Console warning: `[Email] RESEND_API_KEY not set — emails will NOT be sent in development.`

#### Production Mode
When `RESEND_API_KEY` is missing in production:
- ❌ API returns 500 error
- ❌ User sees friendly error message
- ❌ Lead is still saved but email fails

#### Testing Email Functionality

1. **Development Testing**:
   ```bash
   # Test without API key (save-only mode)
   curl -X POST http://localhost:3000/api/leads \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","source":"test"}'
   
   # Test with API key (full functionality)
   # Set RESEND_API_KEY in your .env.local first
   ```

2. **Debug Endpoint** (dev only):
   ```bash
   # Test email sending directly
   curl "http://localhost:3000/api/dev/ping-email?email=test@example.com"
   ```

3. **Resend Dashboard**:
   - Log into your Resend account
   - Check the "Logs" section for sent emails
   - Verify email delivery and content

4. **Email Templates**:
   - Lead magnet emails include download links
   - Newsletter emails include welcome content
   - Both use responsive HTML templates

### Data Storage

Lead data is stored in `.data/leads.jsonl`:
```json
{"email":"test@example.com","source":"lead_magnet_banner","timestamp":"2024-01-01T00:00:00.000Z","ip":"captured-if-available"}
```

### Troubleshooting

1. **Email Not Sending**:
   - **Development**: Check console for `[Email] RESEND_API_KEY missing` warning
   - **Production**: Check `RESEND_API_KEY` is set correctly in environment
   - Verify Resend account is active
   - Check server logs for API errors
   - Use debug endpoint: `GET /api/dev/ping-email?email=test@example.com` (dev only)

2. **Analytics Not Tracking**:
   - Verify `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set
   - Check browser console for script loading
   - Ensure domain is configured in Plausible

3. **Lead Data Not Saving**:
   - Check `.data/` directory permissions
   - Verify `.gitignore` includes `.data/`
   - Check server logs for file system errors

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run generate:og:pairs` - Generate OG images for kit pairs
- `npm run generate:icons` - Generate favicon and app icons

### Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   │   └── leads/         # Lead collection endpoint
│   ├── about/             # About page
│   ├── kits/              # Kit pages
│   ├── pricing/           # Pricing page
│   └── success/           # Success page
├── components/            # React components
│   ├── layout/           # Layout components
│   │   ├── footer.tsx    # Footer with newsletter
│   │   └── NewsletterForm.tsx
│   └── LeadMagnetBanner.tsx
├── lib/                   # Utility functions
│   ├── email.ts          # Email sending utilities
│   └── stripe.ts         # Stripe integration
└── types/                # TypeScript types
```

## Brand

### Logo Management

To change the logo, replace `/public/logo/lexatlas.svg`. The logo is used consistently across:
- Header (28x28)
- Hero section (48x48) 
- Footer (28x28)

All components import the logo path from `src/lib/brand.ts` to ensure consistency.

## Deployment

The application is configured for deployment on Vercel with the following considerations:

- Environment variables must be set in Vercel dashboard
- `.data/` directory is gitignored (use external database for production)
- OG images are generated at build time
- Analytics script loads conditionally based on domain

## License

MIT License - see LICENSE file for details.

