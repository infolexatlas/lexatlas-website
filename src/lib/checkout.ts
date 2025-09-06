export function getSuccessCancelUrls(req: Request) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || new URL(req.url).origin;
  return {
    success_url: `${base}/success`,
    cancel_url: `${base}/cancel`
  }
}
