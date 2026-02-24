import Link from "next/link";

interface BrowseHeaderProps {
  isAuthenticated?: boolean;
}

export default function BrowseHeader({ isAuthenticated = false }: BrowseHeaderProps) {
  const submitHref = isAuthenticated ? "/submit" : "/auth/sign-in?redirect=/submit";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Browse Projects
        </h1>
        <p className="text-xs text-[#555]">
          <span className="text-[#999]">312 submissions</span>
          {" · "}
          <span style={{ fontFamily: "var(--font-dm-mono), monospace" }}>
            Fluid Dynamics Challenge
          </span>
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 border border-[#2a2a2a] bg-[#1c1c1c] px-3 py-2.5 sm:w-48 sm:shrink-0">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4" stroke="#3a3a3a" strokeWidth="1.2" />
            <path
              d="M9.5 9.5L12 12"
              stroke="#3a3a3a"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search projects…"
            className="w-full bg-transparent text-[13px] text-[#999] placeholder-[#3a3a3a] outline-none"
          />
        </div>

        <Link
          href={submitHref}
          className="shrink-0 bg-[#4ade80] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-black transition-colors hover:bg-[#6ee7a0]"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          Submit ↑
        </Link>
      </div>
    </div>
  );
}
