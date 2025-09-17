export function getSuccessCancelUrls(req: Request) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || new URL(req.url).origin;
  return {
    success_url: `${base}/checkout/success`,
    cancel_url: `${base}/checkout/cancel`
  }
}
