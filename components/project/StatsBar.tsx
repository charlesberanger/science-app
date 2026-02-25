export interface StatItem {
  label: string;
  value: string;
  trend: string;
  trendMuted?: boolean;
}

const defaultStats: StatItem[] = [
  { label: "TOTAL SUBMISSIONS", value: "312", trend: "↑ +14 this week" },
  { label: "ACTIVE TEAMS", value: "87", trend: "↑ +3 this week" },
  { label: "AVG SCORE", value: "74.2", trend: "↑ +1.8 this week" },
  { label: "DAYS LEFT", value: "18", trend: "Deadline Apr 12", trendMuted: true },
];

export default function StatsBar({ stats = defaultStats }: { stats?: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 overflow-hidden rounded border border-[#2a2a2a] sm:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`flex flex-col gap-1.5 bg-[#111] px-4 py-3.5
            ${i % 2 === 0 ? "border-r border-[#2a2a2a]" : "sm:border-r border-[#2a2a2a]"}
            ${i < 2 ? "border-b border-[#2a2a2a] sm:border-b-0" : ""}
            ${i === stats.length - 1 ? "sm:border-r-0" : ""}
          `}
        >
          <span
            className="text-label uppercase tracking-ui text-[#888]"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            {stat.label}
          </span>
          <span className="text-2xl font-semibold text-white">{stat.value}</span>
          <span
            className={`text-label ${stat.trendMuted ? "text-[#888]" : "text-[#4ade80]"}`}
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            {stat.trend}
          </span>
        </div>
      ))}
    </div>
  );
}
