"use client";
import * as React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isDev = process.env.NODE_ENV !== "production";
  return (
    <html>
      <body>
        <main className="mx-auto max-w-2xl px-6 py-16">
          <h1 className="text-2xl font-semibold text-slate-900">Something went wrong</h1>
          <p className="mt-2 text-slate-600">
            A global error occurred. Please try again.
          </p>
          <div className="mt-6">
            <button
              onClick={() => reset()}
              className="rounded-md bg-[#1A2E4F] px-4 py-2 text-white hover:bg-[#132237] transition"
            >
              Try again
            </button>
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
      </body>
    </html>
  );
}
