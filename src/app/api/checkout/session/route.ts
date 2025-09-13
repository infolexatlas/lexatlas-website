// src/app/api/checkout/session/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripePriceId } from '@/lib/stripe-prices';

export const runtime = 'nodejs'; // important: Stripe SDK needs Node

// Guard: secret must exist
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_SECRET_KEY) {
  // We don't throw at module load in prod to avoid 500 on build; we'll error inside handler
  // but we still keep this reference for devs reading the file.
}

// Single Stripe client (best practice)
const stripe = STRIPE_SECRET_KEY
  ? new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2025-08-27.basil' })
  : null;

// Helper: safe base URL
function getBaseUrl() {
  // Prefer explicit env; fallback to production domain if you want, else throw in handler
  return process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, '') || '';
}

type CreateSessionBody = {
  mode?: 'payment' | 'subscription';
  priceId?: string;              // A Stripe Price ID (optional, can be derived from kitSlug)
  kitSlug?: string;              // e.g., 'fra-usa' (for metadata and price lookup)
  quantity?: number;             // default 1
  successPath?: string;          // optional override, default '/checkout/success'
  cancelPath?: string;           // optional override, default '/checkout/cancel'
  lineItems?: Array<{ name?: string; price: number; currency: string; quantity?: number }>;
};

export async function POST(req: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe not configured. Missing STRIPE_SECRET_KEY.' },
        { status: 500 }
      );
    }

    const baseUrl = getBaseUrl();
    if (!baseUrl) {
      return NextResponse.json(
        { error: 'Missing NEXT_PUBLIC_BASE_URL. Set it in Vercel env.' },
        { status: 500 }
      );
    }

    // Parse JSON body
    const body = (await req.json().catch(() => ({}))) as Partial<CreateSessionBody>;

    // Defaults
    const mode = body.mode || 'payment';
    const successPath = body.successPath || '/checkout/success';
    const cancelPath = body.cancelPath || '/checkout/cancel';
    const success_url = `${baseUrl}${successPath}?session_id={CHECKOUT_SESSION_ID}`;
    const cancel_url = `${baseUrl}${cancelPath}`;

    // Build line_items either from a single Price ID or custom ad-hoc items
    let line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    // Try to get price ID from body or derive from kitSlug
    let priceId: string | undefined = body?.priceId;
    if (!priceId && body?.kitSlug) {
      priceId = getStripePriceId(body.kitSlug) || undefined;
    }

    if (priceId) {
      const qty = Math.max(1, Number(body?.quantity ?? 1));
      line_items = [{ price: priceId, quantity: qty }];
    } else if (Array.isArray(body?.lineItems) && body.lineItems.length) {
      // Ad-hoc price (not recommended for prod unless you have a clear policy)
      line_items = body.lineItems.map((li) => ({
        quantity: Math.max(1, Number(li.quantity ?? 1)),
        price_data: {
          currency: li.currency,
          product_data: { name: li.name || 'LexAtlas Kit' },
          unit_amount: Math.round(Number(li.price) * 100), // cents
        },
      }));
    } else {
      return NextResponse.json(
        { error: `Price not configured for kit: ${body?.kitSlug || 'unknown'}. Please provide either { priceId }, { kitSlug }, or { lineItems: [...] }` },
        { status: 400 }
      );
    }

    // Create Session
    const session = await stripe.checkout.sessions.create({
      mode,
      line_items,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      success_url,
      cancel_url,
      metadata: {
        source: 'lexatlas',
        kitSlug: (body as any)?.kitSlug || '',
      },
      // If you need invoice creation / tax / shipping — wire them here later.
    });

    // Return minimal info to client
    return NextResponse.json(
      { id: session.id, url: session.url },
      { status: 200 }
    );
  } catch (err: any) {
    // Do NOT log secrets; log minimal error
    return NextResponse.json(
      { error: err?.message || 'Stripe session creation failed' },
      { status: 500 }
    );
  }
}
