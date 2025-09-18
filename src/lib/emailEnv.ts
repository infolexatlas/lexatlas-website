export interface EmailEnv {
  hasKey: boolean
  keyPrefix: string | null
  from: string | null
  baseUrl: string | null
  nodeEnv: string
  resolvedFrom: string
  resolvedReason: string | null
}

export function getResolvedFromStrict() {
  const forceSandbox = process.env.EMAIL_FORCE_SANDBOX === '1';
  const isDev = process.env.NODE_ENV !== 'production';
  const sandbox = 'LexAtlas <onboarding@resend.dev>';

  // If forced: always sandbox sender
  if (forceSandbox) {
    return { from: sandbox, reason: 'sandbox_sender' as const };
  }

  // Check if we have a custom RESEND_FROM configured
  const from = process.env.RESEND_FROM?.trim();
  if (from && !/@(gmail|yahoo|outlook|hotmail)\./i.test(from)) {
    return { from, reason: 'custom_sender' as const };
  }

  // If dev and no custom sender: use sandbox
  if (isDev) {
    return { from: sandbox, reason: 'sandbox_sender' as const };
  }

  // Production mode - require RESEND_FROM
  if (!from) {
    throw new Error('RESEND_FROM must be set to a verified domain sender (e.g. LexAtlas <hello@lexatlas.com>)');
  }
  if (/@(gmail|yahoo|outlook|hotmail)\./i.test(from)) {
    throw new Error('RESEND_FROM cannot be a free mailbox. Use a verified domain sender (e.g. hello@lexatlas.com).');
  }
  return { from, reason: 'prod_sender' as const };
}

export function getEmailEnv(): EmailEnv {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const key = process.env.RESEND_API_KEY || '';
  const from = process.env.RESEND_FROM || null;
  const { from: resolvedFrom, reason: resolvedReason } = getResolvedFromStrict();
  
  return {
    hasKey: !!key && key.length > 0 && key.startsWith('re_'),
    keyPrefix: key && key.length > 0 ? key.slice(0, 4) : null,
    from,
    baseUrl,
    nodeEnv: process.env.NODE_ENV || 'development',
    resolvedFrom,
    resolvedReason,
  };
}
