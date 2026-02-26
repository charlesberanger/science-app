import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#0a0a0a] px-4 text-center">
      <p className="font-mono text-label uppercase tracking-ui text-[#4ade80]">404</p>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Page not found</h1>
        <p className="text-sm text-[#888]">The page you're looking for doesn't exist or has been moved.</p>
      </div>
      <Link
        href="/get-started"
        className="border border-[#2a2a2a] bg-[#111] px-6 py-2.5 font-mono text-[11px] uppercase tracking-ui text-[#888] transition-colors hover:text-white"
      >
        ← Back to home
      </Link>
    </div>
  );
}
