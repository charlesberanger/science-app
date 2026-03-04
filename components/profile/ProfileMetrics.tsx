export function MetricBlock({
  value,
  label,
  highlight,
}: {
  value: string;
  label: string;
  highlight: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 border border-border bg-card px-4 py-3">
      <p
        className={`text-2xl font-bold tracking-tight ${highlight ? "text-lime-400" : "text-secondary-foreground"}`}
      >
        {value}
      </p>
      <p className="font-mono text-[8px] uppercase tracking-ui text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

export function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex h-16 flex-col justify-center gap-1 border border-border bg-background px-4">
      <span className="font-mono text-sm uppercase tracking-ui text-muted-foreground">
        {label}
      </span>
      <span className="text-xs text-foreground">{value}</span>
    </div>
  );
}
