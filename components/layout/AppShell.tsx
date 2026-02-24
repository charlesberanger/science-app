"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import TopBar from "@/components/topbar/TopBar";

export default function AppShell({
  children,
  badgeLabel,
  isAuthenticated = false,
}: {
  children: React.ReactNode;
  badgeLabel?: string;
  isAuthenticated?: boolean;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <TopBar
        onMenuClick={() => setSidebarOpen(true)}
        badgeLabel={badgeLabel}
        isAuthenticated={isAuthenticated}
      />

      <main className="flex flex-col gap-5 p-4 pt-20 sm:p-6 sm:pt-20 lg:ml-[220px]">
        {children}
      </main>
    </div>
  );
}
