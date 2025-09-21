import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

async function main() {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("❌ STRIPE_SECRET_KEY missing");
    process.exit(1);
  }
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("❌ STRIPE_WEBHOOK_SECRET missing");
    process.exit(1);
  }

  console.log("✅ Keys present");

  try {
    // Check a known Price (replace FRA_USA by one of your kits)
    const priceId = process.env.STRIPE_PRICE_FRA_USA;
    if (!priceId) {
      console.warn("⚠️ STRIPE_PRICE_FRA_USA missing");
    } else {
      const price = await stripe.prices.retrieve(priceId);
      console.log(`✅ Price ${price.id} loaded (amount: ${price.unit_amount} ${price.currency})`);
    }

    // List webhook endpoints (should contain your Vercel endpoint)
    const wh = await stripe.webhookEndpoints.list({ limit: 3 });
    console.log("🔗 Webhook endpoints:");
    wh.data.forEach(w => {
      console.log(`- ${w.url} [${w.status}]`);
    });

    console.log("✅ Stripe check complete");
  } catch (err: any) {
    console.error("❌ Stripe API check failed:", err.message);
    process.exit(1);
  }
}

main();
