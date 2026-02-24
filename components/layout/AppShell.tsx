"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import TopBar from "@/components/topbar/TopBar";
import { useAuth } from "@/contexts/AuthContext";

export default function AppShell({
  children,
  badgeLabel,
}: {
  children: React.ReactNode;
  badgeLabel?: string;
}) {
  const { isAuthenticated } = useAuth();
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

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isAuthenticated={isAuthenticated} />
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
