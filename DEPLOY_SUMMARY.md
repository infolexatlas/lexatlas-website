# LexAtlas Production Deployment Summary

This document provides a comprehensive guide for deploying the LexAtlas Next.js application to Vercel with production best practices.

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ installed
- Vercel CLI installed (`npm install -g vercel@latest`)
- GitHub repository with proper permissions
- Vercel account with project access

### Initial Setup

1. **Clone and Install**
   ```bash
   git clone [repository-url]
   cd lexatlas-website
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp env.production.template .env.production
   # Edit .env.production with your actual values
   ```

3. **Set GitHub Secrets**
   - Go to GitHub repository → Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `VERCEL_TOKEN`: Your Vercel API token
     - `VERCEL_ORG_ID`: Your Vercel organization ID
     - `VERCEL_PROJECT_ID`: Your Vercel project ID
     - `NEXT_PUBLIC_GA4_ID`: (Optional) Google Analytics 4 ID
     - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`: (Optional) Plausible domain

4. **Deploy**
   ```bash
   # For production deployment
   git push origin main
   
   # For manual deployment
   vercel deploy --prod
   ```

## 📁 File Structure

```
├── vercel.json                          # Vercel configuration
├── .github/workflows/deploy.yml         # CI/CD pipeline
├── env.production.template              # Environment variables template
├── scripts/
│   ├── post-deploy.sh                   # Post-deployment verification
│   └── smoke-tests.sh                   # Automated smoke tests
├── ops/
│   ├── POST_DEPLOY_QA.md                # QA checklist
│   └── ROLLBACK.md                      # Rollback procedures
└── DEPLOY_SUMMARY.md                    # This file
```

## 🔧 Configuration Files

### vercel.json

Production-ready Vercel configuration with:
- Security headers (HSTS, CSP, X-Frame-Options, etc.)
- Performance optimizations (caching, compression)
- Domain redirects (www → apex)
- Function configuration
- Environment variables

### .github/workflows/deploy.yml

Comprehensive CI/CD pipeline with:
- **PR Testing**: Build, lint, type check, smoke tests
- **Preview Deployments**: Automatic preview URLs for PRs
- **Production Deployments**: Automatic deployment on main branch
- **Release Deployments**: Tagged release deployments
- **Post-deploy Verification**: Automated health checks

## 🧪 Testing & Verification

### Smoke Tests

Run comprehensive smoke tests to verify deployment:

```bash
# Test production site
BASE_URL=https://lex-atlas.com bash scripts/smoke-tests.sh

# Test local build
BASE_URL=http://localhost:3000 bash scripts/smoke-tests.sh
```

**What it tests:**
- All 10 kit pages (connectivity, titles, JSON-LD, canonical URLs)
- Key pages (home, kits, pricing)
- API endpoints
- Sitemap and robots.txt
- Meta tags and Open Graph
- Security headers

### Post-Deploy Verification

Run post-deployment verification:

```bash
# Verify production deployment
bash scripts/post-deploy.sh https://lex-atlas.com

# Verify local deployment
bash scripts/post-deploy.sh http://localhost:3000
```

**What it verifies:**
- Basic connectivity
- API endpoints
- Sitemap accessibility
- Search engine pinging
- Security headers
- Performance metrics

## 🔐 Security Configuration

### Security Headers

The deployment includes comprehensive security headers:

- **HSTS**: `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- **CSP**: Content Security Policy with strict rules
- **X-Frame-Options**: `DENY`
- **X-Content-Type-Options**: `nosniff`
- **Referrer-Policy**: `strict-origin-when-cross-origin`
- **Permissions-Policy**: Restrictive permissions for sensitive APIs

### HTTPS Enforcement

- All HTTP requests redirect to HTTPS
- HSTS preload enabled
- SSL certificate validation

## ⚡ Performance Optimizations

### Caching Strategy

- **Static Assets**: 1 year cache with immutable flag
- **Images**: 24 hour cache
- **HTML**: No cache (always fresh)
- **API Responses**: Appropriate cache headers

### Image Optimization

- Next.js Image component with WebP/AVIF support
- Responsive images with proper sizing
- Lazy loading for better performance

### Core Web Vitals Targets

- **LCP**: ≤ 2.5 seconds
- **INP**: < 200ms
- **CLS**: < 0.1

## 📊 Monitoring & Analytics

### Built-in Monitoring

- **Vercel Analytics**: Automatic performance monitoring
- **Web Vitals**: Core Web Vitals tracking
- **Error Monitoring**: Automatic error tracking

### Optional Integrations

- **Google Analytics 4**: Set `NEXT_PUBLIC_GA4_ID`
- **Plausible Analytics**: Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- **Sentry**: Set `SENTRY_DSN` for error monitoring

## 🚨 Rollback Procedures

### Quick Rollback (Vercel Dashboard)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to your project
3. Click "Deployments" tab
4. Find last successful deployment
5. Click "Promote to Production"

### CLI Rollback

```bash
# List deployments
vercel ls --scope=your-org-id

# Promote previous deployment
vercel promote [DEPLOYMENT_ID] --prod
```

### Emergency Rollback

```bash
# Redeploy from specific commit
git checkout [LAST_GOOD_COMMIT_SHA]
vercel deploy --prod --prebuilt -m "Emergency rollback"
```

## 📋 QA Checklist

After each deployment, complete the QA checklist in `ops/POST_DEPLOY_QA.md`:

- [ ] DNS & SSL verification
- [ ] Google Search Console setup
- [ ] Rich Results testing
- [ ] Core Web Vitals validation
- [ ] SEO meta tags verification
- [ ] Internal linking structure
- [ ] Error pages testing
- [ ] Security headers validation
- [ ] Performance & caching
- [ ] Analytics & monitoring
- [ ] Third-party integrations
- [ ] Mobile & accessibility

## 🔄 CI/CD Pipeline

### Automatic Triggers

- **Push to main**: Production deployment
- **Pull Request**: Preview deployment + testing
- **Release tag**: Production deployment
- **Manual trigger**: Workflow dispatch

### Pipeline Stages

1. **Build & Test**
   - Checkout code
   - Install dependencies
   - Type checking
   - Linting
   - Build verification
   - Smoke tests

2. **Deploy**
   - Vercel CLI setup
   - Environment pull
   - Build artifacts
   - Deploy to Vercel

3. **Verify**
   - Post-deploy verification
   - Health checks
   - Status reporting

## 🛠️ Local Development

### Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test:e2e
npm run lint
npm run typecheck

# Build for production
npm run build
npm start
```

### Environment Variables

Copy `env.production.template` to `.env.local` for local development:

```bash
cp env.production.template .env.local
# Edit .env.local with your local values
```

## 📈 SEO Configuration

### Structured Data

All kit pages include Product JSON-LD with:
- Product information
- Pricing details
- SKU and availability
- Canonical URLs

### Meta Tags

- Unique titles for each page
- Descriptive meta descriptions
- Proper canonical URLs
- Open Graph and Twitter Card tags

### Sitemap

- Automatic sitemap generation
- All kit pages included
- Proper priority and change frequency
- XML sitemap at `/sitemap.xml`

## 🚀 Deployment Commands

### Manual Deployment

```bash
# Deploy to preview
vercel deploy

# Deploy to production
vercel deploy --prod

# Deploy with specific commit
vercel deploy --prod --prebuilt -m "Deploy commit abc123"
```

### GitHub Actions

```bash
# Trigger manual deployment
gh workflow run deploy.yml

# Trigger with specific environment
gh workflow run deploy.yml -f environment=production
```

## 📞 Support & Troubleshooting

### Common Issues

1. **Build Failures**
   - Check environment variables
   - Verify Node.js version
   - Review build logs

2. **Deployment Issues**
   - Check Vercel project settings
   - Verify GitHub secrets
   - Review deployment logs

3. **Performance Issues**
   - Run Core Web Vitals audit
   - Check image optimization
   - Review caching headers

### Getting Help

- **Documentation**: Check this file and related docs
- **Logs**: Review Vercel deployment logs
- **Support**: Contact Vercel support for platform issues
- **Team**: Reach out to DevOps team for deployment issues

## 📝 Maintenance

### Regular Tasks

- **Weekly**: Review deployment logs and performance metrics
- **Monthly**: Update dependencies and security patches
- **Quarterly**: Review and update deployment procedures
- **Annually**: Audit security configuration and performance

### Updates

- Keep Vercel CLI updated: `npm install -g vercel@latest`
- Update Node.js version as needed
- Review and update security headers
- Monitor Core Web Vitals trends

---

## 🎯 Success Criteria

A successful deployment should meet these criteria:

- [ ] All smoke tests pass (0 failures)
- [ ] Post-deploy verification passes
- [ ] Core Web Vitals meet targets
- [ ] Security headers are present
- [ ] SEO meta tags are correct
- [ ] All kit pages are accessible
- [ ] JSON-LD structured data is valid
- [ ] Analytics tracking is working
- [ ] Error monitoring is active
- [ ] Rollback procedures are tested

---

**Last Updated**: [DATE]  
**Version**: 1.0  
**Maintained by**: DevOps Team
