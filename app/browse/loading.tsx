import AppShell from "@/components/layout/AppShell";

export default function BrowseLoading() {
  return (
    <AppShell badgeLabel="CHALLENGE LIVE">
      {/* Header skeleton */}
      <div className="h-8 w-40 animate-pulse bg-secondary" />

      {/* Stats bar skeleton */}
      <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2 bg-card p-4">
            <div className="h-2.5 w-24 animate-pulse bg-secondary" />
            <div className="h-7 w-16 animate-pulse bg-secondary" />
          </div>
        ))}
      </div>

      {/* Project grid skeleton */}
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="aspect-square animate-pulse bg-secondary" />
            <div className="h-3 w-3/4 animate-pulse bg-secondary" />
            <div className="h-2.5 w-1/2 animate-pulse bg-secondary" />
          </div>
        ))}
      </div>
    </AppShell>
  );
}
