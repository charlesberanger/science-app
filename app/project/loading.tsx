import AppShell from "@/components/layout/AppShell";

export default function ProjectLoading() {
  return (
    <AppShell>
      {/* Challenge header skeleton */}
      <div className="flex flex-col gap-2">
        <div className="h-6 w-48 animate-pulse bg-secondary" />
        <div className="h-8 w-80 animate-pulse bg-secondary" />
      </div>

      {/* Stats bar skeleton */}
      <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2 bg-card p-4">
            <div className="h-2.5 w-20 animate-pulse bg-secondary" />
            <div className="h-7 w-12 animate-pulse bg-secondary" />
          </div>
        ))}
      </div>

      {/* Two-column layout skeleton */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_280px]">
        {/* Left column */}
        <div className="flex flex-col gap-5">
          <div className="aspect-video w-full animate-pulse bg-secondary" />
          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-3 w-full animate-pulse bg-secondary last:w-2/3" />
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-3">
          <div className="h-48 w-full animate-pulse border border-border bg-secondary" />
          <div className="h-32 w-full animate-pulse border border-border bg-secondary" />
        </div>
      </div>
    </AppShell>
  );
}
