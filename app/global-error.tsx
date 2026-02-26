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
        <p className="text-label uppercase tracking-ui text-[#888]">
          Something went wrong
        </p>
        <p className="max-w-md text-center text-sm text-[#999]">
          {error.message ?? "An unexpected error occurred."}
        </p>
        <button
          onClick={reset}
          className="border border-[#2a2a2a] px-4 py-2 text-label uppercase tracking-ui text-white transition-colors hover:bg-[#1c1c1c]"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
