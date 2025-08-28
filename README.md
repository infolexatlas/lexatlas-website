# LexAtlas - Your Global Legal Compass

Expert-built, country-specific PDF guides to handle international legal procedures with clarity and confidence.

## 🌍 Priority Kits System

LexAtlas now supports **10 priority FRA–X country combinations** for international marriage guidance, with centralized EUR pricing and Stripe checkout integration.

### 📊 Coverage

- **10 Priority Kits**: FRA–USA, FRA–GBR, FRA–CAN, FRA–MAR, FRA–DEU, FRA–CHE, FRA–BEL, FRA–ESP, FRA–ITA, FRA–PRT
- Each kit covers marriage procedures between France and another country
- Centralized EUR pricing: 29€ single, 75€ bundle of 3, 200€ full pack



### 🗂️ File Structure

#### Full PDFs (ISO3 upper case)
```
public/kits/
├── FRA-USA.pdf        # France ↔ United States
├── FRA-GBR.pdf        # France ↔ United Kingdom
├── FRA-CAN.pdf        # France ↔ Canada
└── [ISO3]-[ISO3].pdf
```

#### Sample PDFs (Free previews)
```
public/kits/samples/
├── FRA-USA-sample.pdf # France ↔ United States sample
├── FRA-GBR-sample.pdf # France ↔ United Kingdom sample
├── FRA-CAN-sample.pdf # France ↔ Canada sample
└── [ISO3]-[ISO3]-sample.pdf
```

#### Open Graph Images
```
public/og/pairs/
├── fra-usa.svg        # Custom image for FRA-USA
├── fra-usa.png        # PNG version for FRA-USA
├── fra-gbr.svg        # Custom image for FRA-GBR
├── fra-gbr.png        # PNG version for FRA-GBR
└── [slug].{svg,png}
```

### 🔧 Adding New Priority Kits

#### 1. Adding a New Priority Kit

1. **Add to priority slugs**:
   ```typescript
   // src/lib/kits.config.ts
   export const PRIORITY_SLUGS = [
     // ... existing slugs
     'fra-new' // Add new FRA-X combination
   ]
   ```

2. **Add ISO mappings**:
   ```typescript
   // src/lib/kits.config.ts
   export const ISO3_TO_2: Record<string,string> = {
     // ... existing mappings
     NEW: 'NE' // Add new country mapping
   }
   
   export const ISO2_NAMES: Record<string,string> = {
     // ... existing names
     NE: 'New Country' // Add new country name
   }
   ```

#### 2. Adding Content Files

**Full PDFs** (for paid downloads):
```bash
# Create PDF file for the pair
public/kits/FRA-NEW.pdf
```

**Sample PDFs** (for free previews):
```bash
# Create sample PDF file for the pair
public/kits/samples/FRA-NEW-sample.pdf
```

#### 3. Content Structure

**Full PDFs** should include:
- Complete step-by-step procedures
- All document requirements
- Embassy/consulate information
- Processing timelines
- Common pitfalls and tips
- Professional, branded design
- Optimized for printing

**Sample PDFs** should include:
- Overview of the marriage process
- Key document requirements
- Important timelines
- Contact information for authorities
- Preview of full content

#### 4. Testing & Deployment

1. **Run tests**:
   ```bash
   npm run test:all
   ```

2. **Verify routes**:
   - Check `/kits/fra-new`
   - Verify pricing displays correctly (29€)
   - Test download functionality
   - Test preview functionality

3. **Deploy**:
   - Push to main branch
   - CI/CD will automatically deploy
   - New routes will be generated

#### 5. Missing Content Handling

For kits without content:
- System shows "Preview coming soon" for missing samples
- Full kit pages still display with pricing
- Maintains consistent user experience
- Graceful degradation for missing PDFs

### 🚀 Features

#### Core Functionality
- **Priority Kit Routes**: `/kits/fra-usa` (ISO3 lowercased)
- **Centralized EUR Pricing**: 29€ single, 75€ bundle of 3, 200€ full pack
- **Stripe Checkout Integration**: Test keys in dev, live in production
- **Lead Magnet System**: Free preview with email collection
- **SEO Optimized**: Unique metadata for each kit
- **Download Protection**: Secure PDF delivery after purchase

#### Content Management
- **Centralized Kit System**: Unified content management for PDFs
- **Sample System**: Free preview PDFs for lead generation
- **Smart Fallbacks**: Graceful handling of missing files
- **Content Validation**: Ensures all required files exist

#### User Experience
- **Premium Animations**: Smooth Framer Motion transitions
- **Responsive Design**: Optimized for all devices
- **Loading States**: Professional loading indicators
- **Error Handling**: User-friendly error messages
- **Accessibility**: WCAG compliant components

### 🧪 Testing

#### Test Commands
```bash
# Run unit tests only (Vitest)
npm run test:unit

# Run E2E tests only (Playwright)
npm run test:e2e

# Run all tests sequentially
npm run test:all

# Watch mode for unit tests
npm run test:watch

# E2E tests with UI
npm run test:e2e:ui

# E2E tests in headed mode
npm run test:e2e:headed

# Seed Stripe products/prices (dev only)
npm run dev:seed:stripe

# Generate OG images
npm run generate:og:pairs
```

#### Test Coverage
- **Unit Tests**: Pricing system, country validation, utility functions
- **E2E Tests**: Full user flows, payment integration, download functionality
- **Integration Tests**: API endpoints, Stripe webhooks

### 🚀 CI/CD Pipeline

#### GitHub Actions Workflows

**CI Workflow** (`.github/workflows/ci.yml`):
- Triggers on push and pull requests
- Runs unit tests, type checking, linting
- Builds application
- Runs E2E tests
- Uploads test artifacts

**Deploy Workflow** (`.github/workflows/deploy.yml`):
- Triggers on push to `main` branch
- Deploys to Vercel production
- Requires CI to pass first

#### Required Secrets
```bash
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

### 🛠️ Development

#### Getting Started
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run type checking
npm run typecheck

# Run linting
npm run lint

# Format code
npm run format
```

#### Environment Variables
```bash
# Required for production
NEXT_PUBLIC_BASE_URL=https://your-domain.com
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
RESEND_API_KEY=re_...
NEXT_PUBLIC_FAKE_CHECKOUT=0 # Set to 1 in CI to stub Stripe
```

# Optional
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

#### Project Structure
```
src/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   ├── kits/              # Kit pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   └── layout/           # Layout components
├── content/              # MDX content
├── data/                 # Static data
├── lib/                  # Utility functions
└── types/                # TypeScript types
```

### 📱 API Endpoints

#### Single Kit Checkout
```typescript
POST /api/checkout/single
{
  "slug": "fra-usa",
  "pairKey": "FR-US"
}
```

#### Bundle Checkout
```typescript
POST /api/checkout/bundle3
{
  "slugs": ["fra-usa", "fra-gbr", "fra-can"]
}

POST /api/checkout/bundle10
// No body - fixed list of all priority slugs
```

#### Preview Lead Magnet
```typescript
POST /api/preview/send
{
  "email": "user@example.com",
  "name": "John Doe",
  "slug": "fra-usa"
}
```

### 🔒 Security

- **Hotlink Protection**: Downloads only from authorized domains
- **Payment Verification**: Stripe session validation
- **Country Pair Validation**: Prevents invalid combinations
- **Cookie-based Access**: Temporary download access after payment

### 📈 SEO

Each country pair page includes:
- Unique title: `Marriage Kit — France and United States | LexAtlas`
- Unique description: Specific to the country pair
- Open Graph images: Custom or default fallback
- Structured data: For search engines

### 🎯 URL Structure

```
/kits/[slug]          # Individual kit page (e.g., /kits/fra-usa)
/preview/[slug]       # Free preview page (e.g., /preview/fra-usa)
/pricing              # Pricing page with all tiers
/success              # Payment success page
/cancel               # Payment cancellation page
```

**Examples:**
- `/kits/fra-usa` (France ↔ United States)
- `/kits/fra-gbr` (France ↔ United Kingdom)
- `/preview/fra-can` (Free preview for France ↔ Canada)

### 📋 Priority Kits

- **FRA–USA**: France ↔ United States
- **FRA–GBR**: France ↔ United Kingdom  
- **FRA–CAN**: France ↔ Canada
- **FRA–MAR**: France ↔ Morocco
- **FRA–DEU**: France ↔ Germany
- **FRA–CHE**: France ↔ Switzerland
- **FRA–BEL**: France ↔ Belgium
- **FRA–ESP**: France ↔ Spain
- **FRA–ITA**: France ↔ Italy
- **FRA–PRT**: France ↔ Portugal

### 🔄 Scalable Architecture

The system is designed for easy expansion:
- Add new priority slugs to `PRIORITY_SLUGS` array
- Add corresponding ISO mappings
- Create PDF files in the correct locations
- System automatically handles routing and pricing

### 🚀 Deploy Checklist

#### Environment Variables (Vercel)
```env
NEXT_PUBLIC_BASE_URL=https://lexatlas.com
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
RESEND_API_KEY=re_...
NEXT_PUBLIC_FAKE_CHECKOUT=0
```

#### Stripe Configuration
- **Products**: Created automatically via `npm run dev:seed:stripe`
- **Lookup Keys**: `single_kit_eur_2900`, `bundle_3_eur_7500`, `bundle_10_eur_20000`
- **Webhook**: `https://lexatlas.com/api/stripe/webhook` (for future use)

### 📁 Assets Drop

#### Production PDFs
Place the 10 production PDFs in `/public/kits/`:
- `FRA-USA.pdf`
- `FRA-GBR.pdf`
- `FRA-CAN.pdf`
- `FRA-MAR.pdf`
- `FRA-DEU.pdf`
- `FRA-CHE.pdf`
- `FRA-BEL.pdf`
- `FRA-ESP.pdf`
- `FRA-ITA.pdf`
- `FRA-PRT.pdf`

#### Sample PDFs
You have two options for sample PDFs:

**Option 1: Per-slug samples** (placed in `/public/kits/samples/`)
- `FRA-USA-sample.pdf`
- `FRA-GBR-sample.pdf`
- etc.

**Option 2: Global sample** (recommended)
- Place `LEXATLAS-global-sample.pdf` in `/public/kits/samples/`
- This will be used as fallback for any slug without a specific sample

#### Verification
Before deploying, run:
```bash
npm run verify:kits
```

This will check that all production PDFs are present and that samples are either specific or global (both acceptable).

#### Testing
- [ ] Run `npm test` - Unit tests pass
- [ ] Run `npm run test:e2e` - E2E tests pass
- [ ] Run `npm run build` - Build succeeds
- [ ] Test kit page functionality (`/kits/fra-usa`)
- [ ] Test pricing page with all tiers
- [ ] Test checkout flow with test card
- [ ] Test preview lead magnet functionality
- [ ] Test download functionality
- [ ] Verify OG images load correctly

#### SEO Verification
- [ ] Check sitemap includes all 10 priority kits
- [ ] Verify metadata for sample kit pages
- [ ] Test Open Graph images
- [ ] Check canonical URLs and redirects

---

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn
- Stripe account (for payments)

### Installation

```bash
npm install
```

### Environment Variables

```env
NEXT_PUBLIC_BASE_URL=https://lexatlas.com
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
RESEND_API_KEY=re_...
NEXT_PUBLIC_FAKE_CHECKOUT=0
```

### Development Server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Testing

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Type checking
npm run type-check
```

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

---

## 📞 Support

For support, email support@lexatlas.com or visit our contact page.
