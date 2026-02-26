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
    <div className="flex flex-col gap-2 border border-[#1c1c1c] bg-[#111] px-4 py-3">
      <p
        className={`text-2xl font-bold tracking-tight ${highlight ? "text-[#acffaf]" : "text-[#999]"}`}
      >
        {value}
      </p>
      <p className="font-mono text-[8px] uppercase tracking-ui text-[#888]">
        {label}
      </p>
    </div>
  );
}

export function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex h-16 flex-col justify-center gap-1 border border-[#2a2a2a] bg-[#0a0a0a] px-4">
      <span className="font-mono text-label uppercase tracking-ui text-[#888]">
        {label}
      </span>
      <span className="text-xs text-white">{value}</span>
    </div>
  );
}
