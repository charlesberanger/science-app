import type { ReactNode } from "react";

export interface StatItem {
  label: string;
  value: ReactNode;
  trend: string;
  trendMuted?: boolean;
}

const defaultStats: StatItem[] = [
  { label: "TOTAL SUBMISSIONS", value: "312", trend: "↑ +14 this week" },
  { label: "ACTIVE TEAMS", value: "87", trend: "↑ +3 this week" },
  { label: "AVG SCORE", value: "74.2", trend: "↑ +1.8 this week" },
  { label: "DAYS LEFT", value: "45", trend: "Deadline Apr 12, 2026", trendMuted: true },
];

export default function StatsBar({ stats = defaultStats }: { stats?: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 overflow-hidden rounded border border-border sm:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`flex flex-col gap-1.5 bg-card px-4 py-3.5
            ${i % 2 === 0 ? "border-r border-border" : "sm:border-r border-border"}
            ${i < 2 ? "border-b border-border sm:border-b-0" : ""}
            ${i === stats.length - 1 ? "sm:border-r-0" : ""}
          `}
        >
          <span
            className="text-label uppercase tracking-ui text-muted-foreground"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            {stat.label}
          </span>
          <span className="text-2xl font-semibold text-foreground">{stat.value}</span>
          <span
            className={`text-label ${stat.trendMuted ? "text-muted-foreground" : "text-feedback-success"}`}
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            {stat.trend}
          </span>
        </div>
      ))}
    </div>
  );
}
