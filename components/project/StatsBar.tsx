import type { ReactNode } from "react";

export interface StatItem {
  label: string;
  value: ReactNode;
  trend: string;
  trendMuted?: boolean;
}

export default function StatsBar({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 overflow-hidden border border-border sm:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`flex flex-col gap-1.5 bg-card px-4 py-3.5
            ${i % 2 === 0 ? "border-r border-border" : "sm:border-r border-border"}
            ${i < 2 ? "border-b border-border sm:border-b-0" : ""}
            ${i === stats.length - 1 ? "sm:border-r-0" : ""}
          `}
        >
          <span className="font-mono text-label uppercase tracking-ui text-muted-foreground">
            {stat.label}
          </span>
          <span className="text-2xl font-semibold text-foreground">
            {stat.value}
          </span>
          <span
            className={`font-mono text-label ${stat.trendMuted ? "text-muted-foreground" : "text-feedback-success"}`}
          >
            {stat.trend}
          </span>
        </div>
      ))}
    </div>
  );
}
