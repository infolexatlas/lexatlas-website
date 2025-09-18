export const runtime = 'nodejs' // avoid edge body streaming pitfalls

export async function POST(req: Request) {
  try {
    // Best-effort consume body; ignore content
    await req.json().catch(() => null)
    return new Response(null, { status: 204 })
  } catch {
    return new Response(null, { status: 204 })
  }
}

// Optional: simple GET for health checks
export async function GET() {
  return new Response('OK', { status: 200 })
}
