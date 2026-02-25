"use client";

import NavItem from "./NavItem";
import ProfileSection from "./ProfileSection";
import ScienceLogo from "@/components/icons/ScienceLogo";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { isAuthenticated } = useAuth();
  return (
    <aside
      className={`
        fixed left-0 top-0 z-30 flex h-screen w-[220px] flex-col
        border-r border-[#2a2a2a] bg-[#111]
        transition-transform duration-200 ease-in-out
        lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Brand */}
      <div className="flex items-center justify-between border-b border-[#2a2a2a] px-4 py-4">
        <div className="flex items-center gap-2.5">
          <ScienceLogo className="h-7 w-7" />
          <span
            className="text-xs uppercase tracking-ui text-white"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            Science
          </span>
        </div>
        <button
          onClick={onClose}
          className="flex h-6 w-6 items-center justify-center text-[#555] transition-colors hover:text-white lg:hidden"
          aria-label="Close menu"
        >
          ✕
        </button>
      </div>

      {/* Nav */}
      <div className="flex flex-1 flex-col gap-5 overflow-y-auto py-5">
        <div>
          <span
            className="mb-1 block px-4 text-label uppercase tracking-ui text-[#333]"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            Navigation
          </span>
          <NavItem label="Get Started" href="/get-started" icon="⊞" />
        </div>

        <div>
          <span
            className="mb-1 block px-4 text-label uppercase tracking-ui text-[#333]"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            Challenge
          </span>
          <NavItem
            label="Submit Project"
            href={isAuthenticated ? "/submit" : "/auth/sign-in?redirect=/submit"}
            icon="↑"
          />
          <NavItem label="My Submission" href="/submission" icon="◐" />
        </div>

        <div>
          <span
            className="mb-1 block px-4 text-label uppercase tracking-ui text-[#333]"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            Explore
          </span>
          <NavItem label="Browse Projects" href="/browse" icon="⊞" />
          <NavItem label="Leaderboard" href="/leaderboard" icon="▲" />
        </div>
      </div>

      <ProfileSection />
    </aside>
  );
}
