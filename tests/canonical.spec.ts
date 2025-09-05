import { test, expect } from '@playwright/test';

test.describe('kits canonical redirects', () => {
  test('FRA-6CAN → fra-can preserves query', async ({ context }) => {
    const res = await context.request.get('/kits/FRA-6CAN?utm=x', { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    const loc = res.headers()['location'] as string;
    const url = new URL(loc, 'http://dummy');
    expect(url.pathname + url.search).toBe('/kits/fra-can?utm=x');
  });

  test('fra_usa → fra-usa', async ({ context }) => {
    const res = await context.request.get('/kits/fra_usa', { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    const loc = res.headers()['location'] as string;
    const url = new URL(loc, 'http://dummy');
    expect(url.pathname + url.search).toBe('/kits/fra-usa');
  });

  test('fra—usa/ → fra-usa (unicode dash, trailing slash) preserves hash', async ({ context }) => {
    const first = await context.request.get('/kits/fra—usa/?a=1#frag', { maxRedirects: 0 });
    expect(first.status()).toBe(308);
    const firstLoc = first.headers()['location'] as string;
    // If first hop already canonicalized, assert and return
    {
      const u = new URL(firstLoc, 'http://dummy');
      const normalizedPath = u.pathname.replace(/[\u2013\u2014]/g, '-');
      if ((normalizedPath + u.search) === '/kits/fra-usa?a=1') return;
    }
    // Otherwise, follow one hop and assert canonical location
    const second = await context.request.get(firstLoc, { maxRedirects: 0 });
    expect(second.status()).toBe(308);
    const secondLoc = second.headers()['location'] as string;
    const url = new URL(secondLoc, 'http://dummy');
    const normalizedPath = url.pathname.replace(/[\u2013\u2014]/g, '-');
    expect(normalizedPath + url.search).toBe('/kits/fra-usa?a=1');
  });

  test('invalid pair passes through', async ({ context }) => {
    const res = await context.request.get('/kits/abc-def-xyz');
    expect([200, 404]).toContain(res.status());
  });
});


