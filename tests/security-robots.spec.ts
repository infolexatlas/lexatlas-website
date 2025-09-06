import { test, expect } from '@playwright/test';

test.describe('prod headers, robots, sitemap @prod-headers-robots', () => {
  test('GET / returns 200 and has security headers', async ({ request }) => {
    const res = await request.get('/');
    expect(res.status()).toBe(200);
    const headers = res.headers();
    const has = (name: string) => Object.keys(headers).some((k) => k.toLowerCase() === name.toLowerCase());
    expect(has('strict-transport-security')).toBeTruthy();
    expect(has('x-content-type-options')).toBeTruthy();
    expect(has('referrer-policy')).toBeTruthy();
    expect(has('permissions-policy')).toBeTruthy();
    expect(has('content-security-policy') || has('content-security-policy-report-only')).toBeTruthy();
  });

  test('robots.txt contents', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('Disallow: /checkout');
    const base = (process.env.BASE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '');
    expect(body).toContain(`Sitemap: ${base}/sitemap.xml`);
  });

  test('wp-sitemap.xml redirects to /sitemap.xml', async ({ request }) => {
    const res = await request.get('/wp-sitemap.xml', { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    const loc = res.headers()['location'] as string;
    // Normalize to pathname+query (ignore host differences)
    const u = new URL(loc, process.env.BASE_URL || 'http://127.0.0.1:3000');
    expect(u.pathname + u.search).toBe('/sitemap.xml');
  });
});


