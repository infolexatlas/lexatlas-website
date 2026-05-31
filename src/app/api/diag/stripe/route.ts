// src/app/api/diag/stripe/route.ts
// TEMPORARY DIAGNOSTIC ROUTE - REMOVE AFTER FIXING STRIPE PRICE IDS
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { KIT_TO_PRICE_MAP, getStripePriceId } from '@/lib/stripe-prices';

export const runtime = 'nodejs';

// Guard: secret must exist
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = STRIPE_SECRET_KEY
  ? new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2025-08-27.basil' })
  : null;

type DiagnosticBody = {
  slug?: string; // Optional: if provided, only check this slug
};

type PriceDiagnostic = {
  slug: string;
  envVar: string;
  priceId: string | null;
  exists: boolean | null;
  currency?: string;
  unit_amount?: number;
  error?: string;
};

export async function POST(req: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { 
          error: 'Stripe not configured. Missing STRIPE_SECRET_KEY.',
          diagnostics: []
        },
        { status: 500 }
      );
    }

    const body = (await req.json().catch(() => ({}))) as DiagnosticBody;
    const targetSlug = body.slug;

    // Get all slugs to check (either specific one or all)
    const slugsToCheck = targetSlug 
      ? [targetSlug]
      : Object.keys(KIT_TO_PRICE_MAP);

    const diagnostics: PriceDiagnostic[] = [];

    for (const slug of slugsToCheck) {
      const envVar = KIT_TO_PRICE_MAP[slug];
      const priceId = getStripePriceId(slug);
      
      const diagnostic: PriceDiagnostic = {
        slug,
        envVar,
        priceId,
        exists: null,
      };

      if (!priceId) {
        diagnostic.error = 'No price ID configured in environment';
        diagnostics.push(diagnostic);
        continue;
      }

      try {
        // Verify price exists in Stripe
        const price = await stripe.prices.retrieve(priceId);
        diagnostic.exists = true;
        diagnostic.currency = price.currency;
        diagnostic.unit_amount = price.unit_amount || undefined;
      } catch (stripeError: any) {
        diagnostic.exists = false;
        if (stripeError.code === 'resource_missing') {
          diagnostic.error = 'Price ID does not exist in Stripe';
        } else {
          diagnostic.error = `Stripe error: ${stripeError.message}`;
        }
      }

      diagnostics.push(diagnostic);
    }

    // Summary
    const summary = {
      total_checked: diagnostics.length,
      configured: diagnostics.filter(d => d.priceId !== null).length,
      existing: diagnostics.filter(d => d.exists === true).length,
      missing: diagnostics.filter(d => d.exists === false).length,
      unconfigured: diagnostics.filter(d => d.priceId === null).length,
    };

    return NextResponse.json({
      summary,
      diagnostics,
      timestamp: new Date().toISOString(),
    });

  } catch (err: any) {
    return NextResponse.json(
      { 
        error: err?.message || 'Diagnostic failed',
        diagnostics: []
      },
      { status: 500 }
    );
  }
}
