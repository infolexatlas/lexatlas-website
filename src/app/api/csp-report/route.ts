export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('[CSP-REPORT]', JSON.stringify(body));
  } catch {}
  return new Response(null, { status: 204 });
}
