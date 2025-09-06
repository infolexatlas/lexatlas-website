import fs from "fs";
import path from "path";

export type ErrorLog = {
  id: string;
  ts: string;               // ISO time
  route?: string | null;
  message?: string | null;
  name?: string | null;
  stack?: string | null;
  digest?: string | null;   // Next.js digest when available
  kind: "global" | "page" | "client" | "api";
  meta?: Record<string, unknown>;
};

const DATA_DIR = path.join(process.cwd(), ".data");
const FILE = path.join(DATA_DIR, "errors.jsonl");

export function ensureStore() {
  try { if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR); } catch {}
}

export function newErrorId(): string {
  // Short friendly id like 397-69-74-94-1
  const parts = Array.from({ length: 5 }, () => Math.floor(Math.random()*999)+1);
  return parts.join("-");
}

export function safeString(v: unknown): string | null {
  if (!v) return null;
  try {
    if (typeof v === "string") return v;
    if (v instanceof Error) return `${v.name}: ${v.message}`;
    return JSON.stringify(v);
  } catch { return "[unserializable]"; }
}

export function serializeStack(err: unknown): string | null {
  try {
    if (err instanceof Error && err.stack) return err.stack;
    return null;
  } catch { return null; }
}

export function logError(entry: ErrorLog) {
  try {
    ensureStore();
    const line = JSON.stringify(entry);
    fs.appendFileSync(FILE, line + "\n", "utf8");
  } catch (e) {
    // best effort; don't crash rendering
    console.warn("[error-tools] failed to persist error:", e);
  }
}

export async function listErrors(limit = 50): Promise<ErrorLog[]> {
  try {
    ensureStore();
    if (!fs.existsSync(FILE)) return [];
    const lines = fs.readFileSync(FILE, "utf8")
      .trim()
      .split("\n")
      .filter(Boolean);
    const parsed = lines.map(l => {
      try { return JSON.parse(l) as ErrorLog; } catch { return null; }
    }).filter(Boolean) as ErrorLog[];
    return parsed.slice(-limit).reverse();
  } catch {
    return [];
  }
}
