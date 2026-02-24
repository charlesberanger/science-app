"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#0a0a0a] p-8 font-mono text-white">
        <p className="text-[9px] uppercase tracking-widest text-[#555]">
          Something went wrong
        </p>
        <p className="max-w-md text-center text-sm text-[#777]">
          {error.message ?? "An unexpected error occurred."}
        </p>
        <button
          onClick={reset}
          className="border border-[#2a2a2a] px-4 py-2 text-[10px] uppercase tracking-widest text-white transition-colors hover:bg-[#1c1c1c]"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
