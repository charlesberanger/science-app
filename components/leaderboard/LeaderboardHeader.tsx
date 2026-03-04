export default function LeaderboardHeader() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Leaderboard
        </h1>
        <p className="text-xs text-muted-foreground">
          <span style={{ fontFamily: "var(--font-dm-mono), monospace" }}>
            Fluid Dynamics Challenge
          </span>
          {" · "}
          <span className="text-secondary-foreground">187 approved</span>
          {" · "}
          <span className="text-feedback-success">Updates live</span>
        </p>
      </div>

      <div className="flex items-center gap-2 border border-border bg-secondary px-3 py-2.5 sm:w-64 sm:shrink-0">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
          className="text-muted-foreground"
        >
          <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.2" />
          <path
            d="M9.5 9.5L12 12"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="text"
          placeholder="Search coming soon…"
          disabled
          aria-label="Search (coming soon)"
          className="w-full bg-transparent text-sm text-secondary-foreground placeholder:text-muted-foreground outline-none cursor-not-allowed"
        />
      </div>
    </div>
  );
}
