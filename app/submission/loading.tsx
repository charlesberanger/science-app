import AppShell from "@/components/layout/AppShell";

export default function SubmissionLoading() {
  return (
    <AppShell badgeLabel="CHALLENGE LIVE">
      {/* Page header */}
      <div className="flex flex-col gap-4 border-b border-border pb-8">
        <div className="flex flex-col gap-2">
          <div className="h-8 w-44 animate-pulse bg-secondary" />
          <div className="h-3 w-56 animate-pulse bg-secondary" />
        </div>
        <div className="h-9 w-40 animate-pulse bg-secondary" />
      </div>

      {/* Status banner skeleton */}
      <div className="h-12 w-full animate-pulse border border-border bg-secondary" />

      {/* Submission card skeleton */}
      <div className="flex flex-col border border-border bg-card">
        <div className="flex flex-col gap-1 border-b border-border p-5">
          <div className="h-5 w-72 animate-pulse bg-secondary" />
          <div className="h-3 w-40 animate-pulse bg-secondary" />
        </div>
        <div className="grid grid-cols-2 gap-px border-b border-border bg-border sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1.5 bg-card p-4">
              <div className="h-2.5 w-16 animate-pulse bg-secondary" />
              <div className="h-3 w-24 animate-pulse bg-secondary" />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 p-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-3 w-full animate-pulse bg-secondary last:w-3/4"
            />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
