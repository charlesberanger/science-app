import AppShell from "@/components/layout/AppShell";

export default function ProfileLoading() {
  return (
    <AppShell badgeLabel="CHALLENGE LIVE">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <div className="h-8 w-36 animate-pulse bg-secondary" />
      </div>

      {/* User info card */}
      <div className="flex flex-col gap-4 border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <div className="h-13 w-13 animate-pulse bg-secondary" />
          <div className="flex flex-col gap-2">
            <div className="h-5 w-28 animate-pulse bg-secondary" />
            <div className="h-3 w-20 animate-pulse bg-secondary" />
            <div className="h-3 w-36 animate-pulse bg-secondary" />
          </div>
        </div>
        <div className="h-9 w-28 animate-pulse bg-secondary" />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 border border-border">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2 p-4">
            <div className="h-2.5 w-12 animate-pulse bg-secondary" />
            <div className="h-6 w-10 animate-pulse bg-secondary" />
          </div>
        ))}
      </div>

      {/* About */}
      <div className="flex flex-col gap-3">
        <div className="h-2.5 w-12 animate-pulse bg-secondary" />
        <div className="h-px bg-secondary" />
        <div className="flex flex-col gap-2 border border-border bg-card p-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-3 w-full animate-pulse bg-secondary last:w-3/4" />
          ))}
        </div>
      </div>

      {/* Submission */}
      <div className="flex flex-col gap-3">
        <div className="h-2.5 w-28 animate-pulse bg-secondary" />
        <div className="h-px bg-secondary" />
        <div className="h-24 w-full animate-pulse border border-border bg-secondary" />
      </div>
    </AppShell>
  );
}
