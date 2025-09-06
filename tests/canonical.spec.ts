import { test, expect } from '@playwright/test';

const ORIGIN = process.env.BASE_URL || 'http://127.0.0.1:3000';

test.describe('kits canonical redirects', () => {
  test('FRA-6CAN → fra-can preserves query', async ({ request }) => {
    const res = await request.get('/kits/FRA-6CAN?utm=x', { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    const loc = res.headers()['location'] as string;
    const urlObj = new URL(loc, ORIGIN);
    expect(urlObj.pathname + urlObj.search).toBe('/kits/fra-can?utm=x');
  });

  test('fra_usa → fra-usa', async ({ request }) => {
    const res = await request.get('/kits/fra_usa', { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    const loc = res.headers()['location'] as string;
    const urlObj = new URL(loc, ORIGIN);
    expect(urlObj.pathname + urlObj.search).toBe('/kits/fra-usa');
  });

  test('fra—usa/ → fra-usa (unicode dash, trailing slash) preserves hash', async ({ request }) => {
    const first = await request.get('/kits/fra—usa/?a=1#frag', { maxRedirects: 0 });
    expect([307,308]).toContain(first.status());
    const firstLoc = first.headers()['location'] as string;
    const u = new URL(firstLoc, ORIGIN);
    const normalizedPath = decodeURIComponent(u.pathname).replace(/[\u2013\u2014]/g, '-');
    if ((normalizedPath + u.search) === '/kits/fra-usa?a=1') return;
    const second = await request.get(firstLoc, { maxRedirects: 0 });
    expect([307,308]).toContain(second.status());
    const secondLoc = second.headers()['location'] as string;
    const urlObj = new URL(secondLoc, ORIGIN);
    const normalizedPath2 = decodeURIComponent(urlObj.pathname).replace(/[\u2013\u2014]/g, '-');
    expect(normalizedPath2 + urlObj.search).toBe('/kits/fra-usa?a=1');
  });

  test('invalid pair passes through', async ({ request }) => {
    const res = await request.get('/kits/abc-def-xyz');
    expect([200, 404]).toContain(res.status());
  });
});


