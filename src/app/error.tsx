"use client";
import * as React from "react";
import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Props) {
  // Show verbose details in development; concise in production
  const isDev = process.env.NODE_ENV !== "production";
  const [errorId, setErrorId] = React.useState<string | null>(null);

  useEffect(() => {
    // Report client-side so we also capture route
    const report = async () => {
      try {
        const res = await fetch("/api/dev/errors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            kind: "page",
            route: window.location?.pathname ?? null,
            message: error?.message ?? null,
            name: error?.name ?? null,
            stack: error?.stack ?? null,
            digest: (error as any)?.digest ?? null
          })
        });
        const data = await res.json().catch(() => ({}));
        if (data?.id) setErrorId(String(data.id));
      } catch {}
    };
    report();
    console.error("[App Error Boundary]", error);
  }, [error]);

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-semibold text-slate-900">Something went wrong</h1>
      <p className="mt-2 text-slate-600">
        We encountered an unexpected error. Please try again.
      </p>
      {errorId && (
        <p className="mt-2 text-slate-500">
          Error ID: <span className="font-mono">{errorId}</span>
        </p>
      )}

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => reset()}
          className="rounded-md bg-[#1A2E4F] px-4 py-2 text-white hover:bg-[#132237] transition"
        >
          Try again
        </button>
        <a
          href="/api/dev/errors"
          className="rounded-md border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50 transition"
        >
          View error log
        </a>
      </div>

      {isDev && (
        <details className="mt-8 rounded-lg border border-amber-300 bg-amber-50 p-4">
          <summary className="cursor-pointer font-medium text-amber-900">
            Developer details (visible only in development)
          </summary>
          <pre className="mt-3 whitespace-pre-wrap text-sm text-amber-900">
{error.stack || `${error.name}: ${error.message}`}
          </pre>
        </details>
      )}
    </main>
  );
}
