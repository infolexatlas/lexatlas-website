export async function POST(request: Request) {
  try {
    await request.json();
  } catch {
    // ignore malformed or empty bodies
  }
  return new Response(null, { status: 204 });
}


