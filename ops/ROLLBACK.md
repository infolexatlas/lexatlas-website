# Rollback Procedures

This document outlines the procedures for rolling back deployments in case of production issues.

## Emergency Contacts

- **Dev Lead**: [Name] - [Phone] - [Email]
- **DevOps Lead**: [Name] - [Phone] - [Email]
- **Product Owner**: [Name] - [Phone] - [Email]

## Rollback Decision Matrix

| Issue Severity | Response Time | Rollback Method | Approval Required |
|----------------|---------------|-----------------|-------------------|
| Critical (Site down, data loss) | < 5 minutes | Immediate rollback | Dev Lead |
| High (Major functionality broken) | < 15 minutes | Quick rollback | Dev Lead |
| Medium (Minor issues) | < 1 hour | Planned rollback | Product Owner |
| Low (Cosmetic issues) | < 24 hours | Next deployment | Product Owner |

## Rollback Methods

### Method 1: Vercel Dashboard (Recommended)

**Use when**: You have access to Vercel dashboard and need immediate rollback.

1. **Access Vercel Dashboard**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Navigate to the `lexatlas-website` project

2. **View Deployments**
   - Click on "Deployments" tab
   - Find the last successful deployment (green checkmark)
   - Note the deployment URL and commit SHA

3. **Promote Previous Deployment**
   - Click on the three dots menu next to the last successful deployment
   - Select "Promote to Production"
   - Confirm the promotion

4. **Verify Rollback**
   - Wait 2-3 minutes for propagation
   - Test the site: `https://lex-atlas.com`
   - Run smoke tests: `BASE_URL=https://lex-atlas.com bash scripts/smoke-tests.sh`

### Method 2: Vercel CLI (Command Line)

**Use when**: You have Vercel CLI access and need programmatic rollback.

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm install -g vercel@latest
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **List Deployments**
   ```bash
   vercel ls --scope=your-org-id
   ```

4. **Promote Previous Deployment**
   ```bash
   # Find the deployment ID of the last successful deployment
   vercel promote [DEPLOYMENT_ID] --prod
   ```

5. **Verify Rollback**
   ```bash
   # Test the site
   curl -I https://lex-atlas.com
   
   # Run smoke tests
   BASE_URL=https://lex-atlas.com bash scripts/smoke-tests.sh
   ```

### Method 3: GitHub Actions (Automated)

**Use when**: You want to trigger a rollback through GitHub Actions.

1. **Create Rollback Branch**
   ```bash
   git checkout -b hotfix/rollback-$(date +%Y%m%d-%H%M%S)
   git push origin hotfix/rollback-$(date +%Y%m%d-%H%M%S)
   ```

2. **Create Pull Request**
   - Create a PR from the rollback branch to main
   - Title: "🚨 HOTFIX: Rollback to [COMMIT_SHA]"
   - Description: Include reason for rollback and impact assessment

3. **Merge PR**
   - Get approval from Dev Lead
   - Merge PR to trigger automatic deployment

### Method 4: Manual Redeploy (Last Resort)

**Use when**: All other methods fail and you need to redeploy from a specific commit.

1. **Identify Last Good Commit**
   ```bash
   git log --oneline -10
   # Find the commit SHA of the last working deployment
   ```

2. **Redeploy from Commit**
   ```bash
   # Checkout the last good commit
   git checkout [COMMIT_SHA]
   
   # Deploy to production
   vercel deploy --prod --prebuilt -m "Rollback to [COMMIT_SHA]"
   ```

3. **Verify Deployment**
   ```bash
   # Test the site
   curl -I https://lex-atlas.com
   
   # Run smoke tests
   BASE_URL=https://lex-atlas.com bash scripts/smoke-tests.sh
   ```

## Rollback Checklist

### Before Rollback

- [ ] **Assess Impact**: Determine severity and scope of the issue
- [ ] **Notify Team**: Alert relevant team members
- [ ] **Document Issue**: Record the problem and steps to reproduce
- [ ] **Backup Data**: Ensure no data loss will occur
- [ ] **Choose Method**: Select appropriate rollback method
- [ ] **Get Approval**: Obtain necessary approvals based on severity

### During Rollback

- [ ] **Execute Rollback**: Follow chosen rollback method
- [ ] **Monitor Progress**: Watch deployment status
- [ ] **Test Critical Paths**: Verify key functionality works
- [ ] **Check Dependencies**: Ensure third-party services are working
- [ ] **Monitor Logs**: Watch for any new errors

### After Rollback

- [ ] **Verify Site**: Confirm site is accessible and functional
- [ ] **Run Smoke Tests**: Execute automated tests
- [ ] **Check Analytics**: Verify tracking is working
- [ ] **Monitor Performance**: Check Core Web Vitals
- [ ] **Update Team**: Notify team of successful rollback
- [ ] **Document Incident**: Record rollback details and lessons learned
- [ ] **Plan Fix**: Schedule time to fix the original issue

## Post-Rollback Actions

### Immediate (0-1 hour)

- [ ] **Site Verification**: Confirm site is fully functional
- [ ] **User Communication**: Update users if necessary
- [ ] **Team Notification**: Inform team of successful rollback
- [ ] **Incident Documentation**: Record incident details

### Short-term (1-24 hours)

- [ ] **Root Cause Analysis**: Investigate what caused the issue
- [ ] **Fix Development**: Develop fix for the original problem
- [ ] **Testing**: Thoroughly test the fix
- [ ] **Deployment Planning**: Plan re-deployment of the fix

### Long-term (1-7 days)

- [ ] **Process Improvement**: Update deployment processes
- [ ] **Monitoring Enhancement**: Improve monitoring and alerting
- [ ] **Team Training**: Conduct post-incident review
- [ ] **Documentation Update**: Update rollback procedures if needed

## Deployment History Tracking

### Current Production Deployment

- **Deployment URL**: `https://lex-atlas.com`
- **Commit SHA**: `[CURRENT_COMMIT_SHA]`
- **Deployed**: `[DEPLOYMENT_DATE]`
- **Status**: ✅ Active

### Last Successful Deployment

- **Deployment URL**: `https://lex-atlas.com`
- **Commit SHA**: `[LAST_GOOD_COMMIT_SHA]`
- **Deployed**: `[LAST_GOOD_DEPLOYMENT_DATE]`
- **Status**: ✅ Ready for rollback

### Previous Deployments

- **Deployment URL**: `[PREVIOUS_DEPLOYMENT_URL]`
- **Commit SHA**: `[PREVIOUS_COMMIT_SHA]`
- **Deployed**: `[PREVIOUS_DEPLOYMENT_DATE]`
- **Status**: ✅ Available for rollback

## Monitoring and Alerting

### Key Metrics to Monitor

- **Site Availability**: Uptime monitoring
- **Response Time**: Page load times
- **Error Rate**: 4xx/5xx error rates
- **Core Web Vitals**: LCP, INP, CLS
- **API Health**: Endpoint response times
- **Database Performance**: Query response times

### Alert Thresholds

- **Site Down**: 0% availability for 2+ minutes
- **High Error Rate**: >5% error rate for 5+ minutes
- **Slow Response**: >3s average response time for 5+ minutes
- **API Failures**: >10% API failure rate for 5+ minutes

### Alert Channels

- **Critical**: Slack #alerts, SMS, Phone call
- **High**: Slack #alerts, Email
- **Medium**: Slack #dev-notifications
- **Low**: Email digest

## Testing Rollback Procedures

### Monthly Rollback Drill

- [ ] **Schedule**: First Friday of each month
- [ ] **Participants**: Dev Lead, DevOps Lead
- [ ] **Duration**: 30 minutes
- [ ] **Scope**: Test rollback to previous deployment
- [ ] **Documentation**: Record any issues or improvements

### Quarterly Review

- [ ] **Review Procedures**: Update rollback documentation
- [ ] **Test All Methods**: Verify all rollback methods work
- [ ] **Update Contacts**: Refresh emergency contact information
- [ ] **Training**: Conduct team training on rollback procedures

## Common Issues and Solutions

### Issue: Vercel Dashboard Not Accessible

**Solution**: Use Vercel CLI or GitHub Actions method

### Issue: Previous Deployment Also Has Issues

**Solution**: Go back further in deployment history or use manual redeploy

### Issue: Rollback Takes Too Long

**Solution**: Use Vercel CLI for faster rollback, or contact Vercel support

### Issue: Site Still Not Working After Rollback

**Solution**: Check DNS propagation, clear CDN cache, verify environment variables

### Issue: Data Loss During Rollback

**Solution**: Restore from backup, contact database administrator

## Emergency Escalation

### Level 1: Dev Team (0-15 minutes)
- Dev Lead
- DevOps Lead
- On-call developer

### Level 2: Management (15-30 minutes)
- Engineering Manager
- Product Owner
- CTO

### Level 3: External Support (30+ minutes)
- Vercel Support
- Third-party service support
- External consultants

---

**Last Updated**: [DATE]  
**Next Review**: [DATE + 3 months]  
**Document Owner**: DevOps Lead
