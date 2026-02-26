"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Sentry will capture this automatically via instrumentation
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#0a0a0a] px-4 text-center">
      <p className="font-mono text-label uppercase tracking-ui text-[#f87171]">Error</p>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Something went wrong</h1>
        <p className="text-sm text-[#888]">An unexpected error occurred. Please try again.</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="border border-[#4ade80] bg-[#4ade80] px-6 py-2.5 font-mono text-[11px] uppercase tracking-ui text-black transition-colors hover:bg-feedback-success-hover"
        >
          Try again
        </button>
        <a
          href="/get-started"
          className="border border-[#2a2a2a] bg-[#111] px-6 py-2.5 font-mono text-[11px] uppercase tracking-ui text-[#888] transition-colors hover:text-white"
        >
          ← Home
        </a>
      </div>
    </div>
  );
}
