"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

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
}

export default function TopBar({ onMenuClick, badgeLabel }: TopBarProps) {
  const { isAuthenticated } = useAuth();
  const section = useSectionLabel();

  return (
    <header className="fixed right-0 top-0 z-10 flex h-14 items-center justify-between border-b border-border bg-background px-4 sm:px-6 lg:left-[220px] left-0">
      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuClick}
        className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 lg:hidden"
        aria-label="Open menu"
      >
        <span className="h-px w-4 bg-muted-foreground" aria-hidden="true" />
        <span className="h-px w-4 bg-muted-foreground" aria-hidden="true" />
        <span className="h-px w-4 bg-muted-foreground" aria-hidden="true" />
      </button>

      <nav aria-label="Breadcrumb" className="hidden lg:block">
        <span className="font-mono text-ui tracking-ui text-muted-foreground">
          Science <span className="text-muted-foreground">/</span>{" "}
          <span className="text-secondary-foreground">{section}</span>
        </span>
      </nav>

      <nav aria-label="Breadcrumb" className="absolute left-1/2 -translate-x-1/2 lg:hidden">
        <span className="font-mono text-ui tracking-ui text-muted-foreground">
          Science <span className="text-muted-foreground">/</span>{" "}
          <span className="text-secondary-foreground">{section}</span>
        </span>
      </nav>

      {isAuthenticated ? (
        badgeLabel && <Badge variant="success">{badgeLabel}</Badge>
      ) : (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/auth/sign-in">Sign In</Link>
          </Button>
          <Button variant="default" size="sm" asChild className="hidden sm:inline-flex bg-feedback-success text-black hover:bg-feedback-success-hover">
            <Link href="/auth/sign-in?mode=register">Create Account</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
