import { Badge } from "@/components/ui/badge";

interface TopBarProps {
  onMenuClick: () => void;
  badgeLabel?: string;
}

export default function TopBar({ onMenuClick, badgeLabel }: TopBarProps) {
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
        <span className="text-[#999]">Dashboard</span>
      </span>

      <span className="absolute left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-widest text-[#555] lg:hidden">
        Science
      </span>

      {badgeLabel && (
        <Badge variant="success">{badgeLabel}</Badge>
      )}
    </header>
  );
}
