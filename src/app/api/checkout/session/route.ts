// src/app/api/checkout/session/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

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

// Mapping exact slug → Price ID from environment variables
const PRICE_BY_SLUG: Record<string, string | undefined> = {
  "fra-usa": process.env.STRIPE_PRICE_FRA_USA,
  "fra-can": process.env.STRIPE_PRICE_FRA_CAN,
  "fra-gbr": process.env.STRIPE_PRICE_FRA_GBR,
  "fra-deu": process.env.STRIPE_PRICE_FRA_DEU,
  "fra-esp": process.env.STRIPE_PRICE_FRA_ESP,
  "fra-ita": process.env.STRIPE_PRICE_FRA_ITA,
  "fra-prt": process.env.STRIPE_PRICE_FRA_PRT,
  "fra-che": process.env.STRIPE_PRICE_FRA_CHE,
  "fra-bel": process.env.STRIPE_PRICE_FRA_BEL,
  "fra-aus": process.env.STRIPE_PRICE_FRA_AUS,
};

// Helper: safe base URL
function getBaseUrl() {
  // Prefer explicit env; fallback to production domain if you want, else throw in handler
  return process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, '') || '';
}

type CreateSessionBody = {
  kitSlug: string;               // Required: e.g., 'fra-usa' (for price lookup)
  quantity?: number;             // default 1
  successPath?: string;          // optional override, default `/kits/${slug}?checkout=success`
  cancelPath?: string;           // optional override, default `/kits/${slug}?checkout=cancelled`
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
    const body = (await req.json().catch(() => ({}))) as CreateSessionBody;

    // Get kit slug from body
    const slug = body?.kitSlug;
    if (!slug) {
      return NextResponse.json(
        { error: 'Missing kitSlug in request body' },
        { status: 400 }
      );
    }

    // Get price ID from environment mapping
    const priceIdFromEnv = PRICE_BY_SLUG[slug];
    if (!priceIdFromEnv) {
      return NextResponse.json(
        { error: "Price configuration error. Please contact support." },
        { status: 500 }
      );
    }

    // Build URLs
    const successPath = body.successPath || `/kits/${slug}?checkout=success`;
    const cancelPath = body.cancelPath || `/kits/${slug}?checkout=cancelled`;
    const success_url = `${baseUrl}${successPath}&session_id={CHECKOUT_SESSION_ID}`;
    const cancel_url = `${baseUrl}${cancelPath}`;

    // Build line items with the price ID from environment
    const quantity = Math.max(1, Number(body?.quantity ?? 1));
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price: priceIdFromEnv,
        quantity: quantity,
      }
    ];

    // Create Session - IMPORTANT: one-time payment only
    const session = await stripe.checkout.sessions.create({
      mode: "payment", // <— IMPORTANT: one-time payment, not subscription
      line_items,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      success_url,
      cancel_url,
      metadata: {
        source: 'lexatlas',
        kitSlug: slug,
      },
      // Optional: add description for better tracking
      payment_intent_data: { 
        description: `LexAtlas Kit ${slug.toUpperCase()}` 
      },
    });

    // Return minimal info to client
    return NextResponse.json(
      { id: session.id, url: session.url },
      { status: 200 }
    );
  } catch (err: any) {
    // Handle specific Stripe errors
    if (err.type === 'StripeInvalidRequestError' && err.code === 'resource_missing') {
      // Log the specific price ID that failed (server-side only)
      console.error(`Stripe price ID not found: ${err.param || 'unknown'}`);
      return NextResponse.json(
        { error: 'Price configuration error. Please contact support.' },
        { status: 400 }
      );
    }
    
    // Do NOT log secrets; log minimal error
    console.error('Stripe session creation failed:', err.message);
    return NextResponse.json(
      { error: err?.message || 'Stripe session creation failed' },
      { status: 500 }
    );
  }
}
