import AppShell from "@/components/layout/AppShell";

export default function LeaderboardLoading() {
  return (
    <AppShell badgeLabel="CHALLENGE LIVE">
      {/* Header skeleton */}
      <div className="h-8 w-48 animate-pulse bg-secondary" />

      {/* Stats bar skeleton */}
      <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2 bg-card p-4">
            <div className="h-2.5 w-24 animate-pulse bg-secondary" />
            <div className="h-7 w-16 animate-pulse bg-secondary" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="flex flex-col border border-border">
        {/* Header row */}
        <div className="flex gap-4 border-b border-border bg-secondary/40 px-4 py-2">
          {[16, 48, 32, 20].map((w, i) => (
            <div key={i} className={`h-2.5 w-${w} animate-pulse bg-secondary`} />
          ))}
        </div>
        {/* Data rows */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-b border-border px-4 py-3 last:border-0">
            <div className="h-3 w-6 animate-pulse bg-secondary" />
            <div className="h-3 w-48 animate-pulse bg-secondary" />
            <div className="ml-auto h-3 w-12 animate-pulse bg-secondary" />
          </div>
        ))}
      </div>
    </AppShell>
  );
}
