import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ error: "Endpoint deprecated. Use /api/subscribe" }, { status: 410 });
}
export async function POST() {
  return NextResponse.json({ error: "Endpoint deprecated. Use /api/subscribe" }, { status: 410 });
}
