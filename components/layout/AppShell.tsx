"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import TopBar from "@/components/topbar/TopBar";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function AppShell({
  children,
  badgeLabel,
}: {
  children: React.ReactNode;
  badgeLabel?: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-20 w-full cursor-default bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
          tabIndex={-1}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <TopBar
        onMenuClick={() => setSidebarOpen(true)}
        badgeLabel={badgeLabel}
      />

      <main
        id="main-content"
        className="flex flex-col gap-5 p-4 pt-20 sm:p-6 sm:pt-20 lg:ml-[220px]"
      >
        {children}
      </main>

      <ThemeToggle />
    </div>
  );
}
