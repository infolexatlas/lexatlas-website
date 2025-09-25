# Deployment Notes

## Email Template Consolidation (v1.0.0)

### Post-Merge Deployment Steps

After merging this PR to main, follow these steps to ensure the new email template is deployed correctly:

1. **Redeploy with Clear Build Cache**
   - Go to Vercel Dashboard → Project → Deployments
   - Click "Redeploy" with **"Clear build cache"** option enabled
   - This ensures the new email template is properly built and cached

2. **Verify Resend Payload in Production Logs**
   - After deployment, test the email subscription form
   - Check Vercel Function logs for: `resend_payload_preview`
   - Confirm the log shows: `version: "v1.0.0"`
   - If you see old version numbers, the build cache wasn't cleared properly

3. **Test Email Health Endpoint**
   - Visit: `https://lex-atlas.com/api/email-health`
   - Verify the response shows:
     - `version: "v1.0.0"`
     - Correct `brandBlue` color
     - Proper `logo` path
     - Subject contains `[v1.0.0]`

4. **Test Email Subscription**
   - Submit the lead magnet form
   - Check that the email subject includes `[v1.0.0]`
   - Verify the email design matches the new template (no fallback links)

5. **If Old Template Still Appears**
   - Check Resend Dashboard → Email logs → View HTML payload
   - If it shows old HTML, search for any remaining Resend template IDs
   - Remove any template ID usage, keep only inline HTML

### Changes Made

- ✅ Created centralized email template in `src/emails/leadmagnet.ts`
- ✅ Updated `/api/subscribe` to use new template with version tracking
- ✅ Deprecated all legacy email endpoints (410 Gone responses)
- ✅ Added email health endpoint at `/api/email-health`
- ✅ Added unit test for template validation
- ✅ Added deployment verification steps

### Legacy Endpoints Deprecated

The following endpoints now return 410 Gone and redirect to `/api/subscribe`:
- `/api/newsletter`
- `/api/leads` 
- `/api/test-email`
- `/api/dev/test-lead`
- `/api/dev/test-newsletter`
- `/api/dev/ping-email`

### Template Version Management

- Version is defined in `LEADMAGNET_TEMPLATE_VERSION = "v1.0.0"`
- Increment this version when making template changes
- Version appears in email subject and logs for tracking
- Unit test validates template content and version format
