"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import UserAvatar from "@/components/ui/UserAvatar";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfileSection() {
  const { isAuthenticated, currentUser, signOut } = useAuth();
  const router = useRouter();

  function handleSignOut() {
    signOut();
    router.push("/auth/sign-in?signedOut=true");
  }

  if (!isAuthenticated) {
    return (
      <div className="border-t border-border">
        <Link
          href="/auth/sign-in"
          className="flex items-center gap-2 px-4 py-3 font-mono text-label text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <span aria-hidden="true">→</span>
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="border-t border-border">
      <Link
        href="/profile"
        className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <UserAvatar name={currentUser.name} size="sm" />
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-xs font-medium text-foreground">{currentUser.name}</span>
          <span className="truncate font-mono text-label text-muted-foreground">{currentUser.role}</span>
        </div>
      </Link>

      <button
        onClick={handleSignOut}
        className="flex w-full items-center gap-2 border-t border-border px-4 py-2.5 font-mono text-label text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <span aria-hidden="true">→</span>
        Sign out
      </button>
    </div>
  );
}
