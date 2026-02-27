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
      <body className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-8 font-mono text-foreground">
        <p className="text-label uppercase tracking-ui text-muted-foreground">
          Something went wrong
        </p>
        <p className="max-w-md text-center text-sm text-secondary-foreground">
          {error.message ?? "An unexpected error occurred."}
        </p>
        <button
          onClick={reset}
          className="border border-border px-4 py-2 text-label uppercase tracking-ui text-foreground transition-colors hover:bg-secondary"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
