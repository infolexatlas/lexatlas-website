export const dynamic = 'force-static';

export async function GET() {
  return Response.json({ 
    ok: true, 
    mode: process.env.NEXT_PUBLIC_MINIMAL_BOOT === '1' ? 'minimal' : 'full',
    timestamp: new Date().toISOString()
  });
}
