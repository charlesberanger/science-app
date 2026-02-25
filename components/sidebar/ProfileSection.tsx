"use client";

import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfileSection() {
  const { currentUser } = useAuth();

  return (
    <Link
      href="/profile"
      className="flex items-center gap-3 border-t border-[#2a2a2a] px-4 py-3.5 transition-colors hover:bg-[#1a1a1a]"
    >
      <Avatar className="h-8 w-8 border border-[#3a3a3a]">
        <AvatarFallback className="bg-[#1c1c1c] text-label font-medium text-white font-mono">
          {currentUser.initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-white">{currentUser.name}</span>
        <span className="font-mono text-label text-[#555]">{currentUser.role}</span>
      </div>
    </Link>
  );
}
