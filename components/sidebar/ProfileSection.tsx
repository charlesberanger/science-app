"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
      <div className="border-t border-[#2a2a2a]">
        <Link
          href="/auth/sign-in"
          className="flex items-center gap-2 px-4 py-3 font-mono text-label uppercase tracking-ui text-[#888] transition-colors hover:bg-[#1c1c1c] hover:text-white"
        >
          <span aria-hidden="true">→</span>
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="border-t border-[#2a2a2a]">
      <Link
        href="/profile"
        className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-[#1c1c1c]"
      >
        <Avatar className="h-8 w-8 shrink-0 border border-[#3a3a3a]">
          <AvatarFallback className="bg-[#1c1c1c] text-label font-medium text-white font-mono">
            {currentUser.initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-xs font-medium text-white">{currentUser.name}</span>
          <span className="truncate font-mono text-label text-[#888]">{currentUser.role}</span>
        </div>
      </Link>

      <button
        onClick={handleSignOut}
        className="flex w-full items-center gap-2 border-t border-[#2a2a2a] px-4 py-2.5 font-mono text-label uppercase tracking-ui text-[#888] transition-colors hover:bg-[#1c1c1c] hover:text-[#f87171]"
      >
        <span aria-hidden="true">→</span>
        Sign out
      </button>
    </div>
  );
}
