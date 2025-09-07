import { NextRequest, NextResponse } from "next/server";
import { logError, newErrorId, listErrors, serializeStack, safeString } from "@/lib/error-tools";

export async function GET() {
  const items = await listErrors(100);
  return NextResponse.json({ ok: true, count: items.length, items }, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const id = newErrorId();
    logError({
      id,
      ts: new Date().toISOString(),
      kind: (body?.kind as any) || "client",
      route: (body?.route as string) || null,
      message: safeString(body?.message),
      name: safeString(body?.name),
      stack: safeString(body?.stack) || serializeStack(body?.error),
      digest: safeString(body?.digest),
      meta: body?.meta && typeof body.meta === "object" ? body.meta : undefined,
    });
    return NextResponse.json({ ok: true, id }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "failed_to_log" }, { status: 500 });
  }
}
