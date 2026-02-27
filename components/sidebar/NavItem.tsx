"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export default function NavItem({ label, href, icon }: NavItemProps) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={`relative flex items-center gap-3 px-4 py-2 transition-colors ${
        active ? "text-foreground" : "text-muted-foreground hover:text-secondary-foreground"
      }`}
    >
      {active && (
        <span className="absolute left-0 top-0 h-full w-0.5 rounded-r bg-white" />
      )}
      {icon && <span className="shrink-0 text-sm opacity-60">{icon}</span>}
      <span
        className="text-[11px] uppercase tracking-ui"
        style={{ fontFamily: "var(--font-dm-mono), monospace" }}
      >
        {label}
      </span>
    </Link>
  );
}
