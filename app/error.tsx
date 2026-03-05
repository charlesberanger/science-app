"use client";

import { useEffect } from "react";
import Link from "next/link";

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
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 text-center">
      <p className="font-mono text-label uppercase tracking-ui text-destructive">Error</p>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Something went wrong</h1>
        <p className="text-sm text-muted-foreground">An unexpected error occurred. Please try again.</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="border border-feedback-success bg-feedback-success px-6 py-2.5 font-mono text-ui uppercase tracking-ui text-black transition-colors hover:bg-feedback-success-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Try again
        </button>
        <Link
          href="/get-started"
          className="border border-border bg-card px-6 py-2.5 font-mono text-ui uppercase tracking-ui text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span aria-hidden="true">←</span> Home
        </Link>
      </div>
    </div>
  );
}
