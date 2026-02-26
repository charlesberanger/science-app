import Link from "next/link";

export default function ChallengeHeader() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Fluid Dynamics in Microgravity</h1>
        <p className="mt-1 text-xs text-[#888]">
          <Link href="/profile/c-laurent" className="text-[#999] transition-colors hover:text-white hover:underline">
            by C. Laurent
          </Link>
          {" · "}
          <span style={{ fontFamily: "var(--font-dm-mono), monospace" }}>
            Fluid Dynamics Challenge
          </span>
        </p>
      </div>

      <div className="flex items-center gap-2 rounded border border-[#2a2a2a] bg-[#111] px-3 py-2 sm:shrink-0">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <circle cx="5" cy="5" r="3.5" stroke="#555" strokeWidth="1" />
          <path d="M8 8L10.5 10.5" stroke="#555" strokeWidth="1" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Search coming soon…"
          disabled
          aria-label="Search (coming soon)"
          className="w-full bg-transparent text-[11px] text-[#999] placeholder-[#555] outline-none sm:w-48 cursor-not-allowed"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        />
      </div>
    </div>
  );
}
