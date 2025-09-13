// src/app/api/diag/stripe/__tests__/route.test.ts
import { POST } from '../route';

// Mock Stripe
jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    prices: {
      retrieve: jest.fn(),
    },
  }));
});

// Mock environment variables
const originalEnv = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...originalEnv };
});

afterAll(() => {
  process.env = originalEnv;
});

describe('/api/diag/stripe', () => {
  it('should return error when STRIPE_SECRET_KEY is missing', async () => {
    delete process.env.STRIPE_SECRET_KEY;
    
    const request = new Request('http://localhost:3000/api/diag/stripe', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toContain('Stripe not configured');
    expect(data.diagnostics).toEqual([]);
  });

  it('should return diagnostics when STRIPE_SECRET_KEY is present', async () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_123';
    process.env.STRIPE_PRICE_FRA_USA = 'price_test_123';
    
    const request = new Request('http://localhost:3000/api/diag/stripe', {
      method: 'POST',
      body: JSON.stringify({ slug: 'fra-usa' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.summary).toBeDefined();
    expect(data.diagnostics).toBeDefined();
    expect(data.timestamp).toBeDefined();
  });

  it('should handle missing price ID gracefully', async () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_123';
    delete process.env.STRIPE_PRICE_FRA_USA;
    
    const request = new Request('http://localhost:3000/api/diag/stripe', {
      method: 'POST',
      body: JSON.stringify({ slug: 'fra-usa' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.diagnostics[0].error).toContain('No price ID configured');
  });
});
