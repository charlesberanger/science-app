"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SECTION_LABELS: Record<string, string> = {
  "/get-started": "Get Started",
  "/browse": "Browse",
  "/leaderboard": "Leaderboard",
  "/project": "Project",
  "/submission": "Submission",
  "/profile": "Profile",
  "/auth/sign-in": "Sign In",
  "/auth/verify": "Verify",
};

function useSectionLabel() {
  const pathname = usePathname();
  // Exact match first
  if (SECTION_LABELS[pathname]) return SECTION_LABELS[pathname];
  // Prefix match (e.g. /profile/alice-s, /profile/edit)
  const prefix = Object.keys(SECTION_LABELS).find((key) => pathname.startsWith(key + "/"));
  return prefix ? SECTION_LABELS[prefix] : "Dashboard";
}

interface TopBarProps {
  onMenuClick: () => void;
  badgeLabel?: string;
  isAuthenticated?: boolean;
}

export default function TopBar({ onMenuClick, badgeLabel, isAuthenticated = false }: TopBarProps) {
  const section = useSectionLabel();

  return (
    <header className="fixed right-0 top-0 z-10 flex h-14 items-center justify-between border-b border-[#2a2a2a] bg-[#0a0a0a] px-4 sm:px-6 lg:left-[220px] left-0">
      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuClick}
        className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 lg:hidden"
        aria-label="Open menu"
      >
        <span className="h-px w-4 bg-[#555]" />
        <span className="h-px w-4 bg-[#555]" />
        <span className="h-px w-4 bg-[#555]" />
      </button>

      <span className="hidden font-mono text-[11px] tracking-widest text-[#555] lg:block">
        Science <span className="text-[#333]">/</span>{" "}
        <span className="text-[#999]">{section}</span>
      </span>

      <span className="absolute left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-widest text-[#555] lg:hidden">
        Science
      </span>

      {isAuthenticated ? (
        badgeLabel && <Badge variant="success">{badgeLabel}</Badge>
      ) : (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/auth/sign-in">Sign In</Link>
          </Button>
          <Button variant="default" size="sm" asChild className="hidden sm:inline-flex">
            <Link href="/auth/sign-in?mode=register">Create Account</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
