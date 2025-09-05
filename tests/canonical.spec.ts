import { test, expect } from '@playwright/test';

test.describe('kits canonical redirects', () => {
  test('FRA-6CAN → fra-can preserves query', async ({ context }) => {
    const res = await context.request.get('/kits/FRA-6CAN?utm=x');
    expect(res.status()).toBe(308);
    const loc = res.headers()['location'];
    expect(loc).toBe('/kits/fra-can?utm=x');
  });

  test('fra_usa → fra-usa', async ({ context }) => {
    const res = await context.request.get('/kits/fra_usa');
    expect(res.status()).toBe(308);
    expect(res.headers()['location']).toBe('/kits/fra-usa');
  });

  test('invalid pair passes through', async ({ context }) => {
    const res = await context.request.get('/kits/abc-def-xyz');
    expect([200, 404]).toContain(res.status());
  });
});


