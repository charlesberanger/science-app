interface BrowseHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  count: number;
}

export default function BrowseHeader({ search, onSearchChange, count }: BrowseHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Browse Projects
        </h1>
        <p className="text-sm text-muted-foreground">
          <span className="text-secondary-foreground">{count} submissions</span>
          {" · "}
          <span style={{ fontFamily: "var(--font-dm-mono), monospace" }}>
            Fluid Dynamics Challenge
          </span>
        </p>
      </div>

      <div className="flex items-center gap-2 border border-border bg-secondary px-3 py-2.5 sm:w-64 sm:shrink-0 focus-within:border-foreground transition-colors">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0 text-muted-foreground">
          <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.2" />
          <path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search projects…"
          aria-label="Search projects"
          className="w-full bg-transparent text-[13px] text-secondary-foreground placeholder:text-muted-foreground outline-none"
        />
        {search.length > 0 ? (
          <button
            onClick={() => onSearchChange("")}
            className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Clear search"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
}
