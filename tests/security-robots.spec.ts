import { test, expect, request } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:3000';

test.describe('prod headers, robots, sitemap @prod-headers-robots', () => {
  test('GET / returns 200 and has security headers', async ({}) => {
    const api = await request.newContext();
    const res = await api.get(`${BASE_URL}/`);
    expect(res.status()).toBe(200);
    const headers = res.headers();
    const has = (name: string) => Object.keys(headers).some((k) => k.toLowerCase() === name.toLowerCase());
    expect(has('strict-transport-security')).toBeTruthy();
    expect(has('x-content-type-options')).toBeTruthy();
    expect(has('referrer-policy')).toBeTruthy();
    expect(has('permissions-policy')).toBeTruthy();
    expect(has('content-security-policy') || has('content-security-policy-report-only')).toBeTruthy();
  });

  test('robots.txt contents', async () => {
    const api = await request.newContext();
    const res = await api.get(`${BASE_URL}/robots.txt`);
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('Disallow: /checkout');
    expect(body).toContain('Sitemap: https://lexatlas.com/sitemap.xml');
  });

  test('wp-sitemap.xml redirects to /sitemap.xml', async () => {
    const api = await request.newContext();
    const res = await api.get(`${BASE_URL}/wp-sitemap.xml`, { maxRedirects: 0 });
    expect([301, 308]).toContain(res.status());
    const loc = res.headers()['location'] || res.headers()['Location'] || '';
    expect(loc).toBe('/sitemap.xml');
  });
});


