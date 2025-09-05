type HeaderTuple = [key: string, value: string];

function getCspHeaderKey(): 'Content-Security-Policy' | 'Content-Security-Policy-Report-Only' {
  const hardMode = process.env.CONTENT_SECURITY_POLICY_MODE === 'block';
  if (hardMode) return 'Content-Security-Policy';
  return 'Content-Security-Policy-Report-Only';
}

export function getSecurityHeaders(): HeaderTuple[] {
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https:",
    "frame-ancestors 'none'",
  ].join('; ');

  const headers: HeaderTuple[] = [
    ['Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload'],
    ['X-Content-Type-Options', 'nosniff'],
    ['Referrer-Policy', 'strict-origin-when-cross-origin'],
    ['Permissions-Policy', 'geolocation=(), microphone=(), camera=(), fullscreen=(self)'],
    [getCspHeaderKey(), cspDirectives],
  ];

  return headers;
}

export type { HeaderTuple };


