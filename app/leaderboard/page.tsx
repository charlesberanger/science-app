import AppShell from "@/components/layout/AppShell";
import LeaderboardHeader from "@/components/leaderboard/LeaderboardHeader";
import StatsBar from "@/components/project/StatsBar";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import type { StatItem } from "@/components/project/StatsBar";

const leaderboardStats: StatItem[] = [
  { label: "TOP PROJECT VOTES", value: "512", trend: "↑ Clara L." },
  {
    label: "APPROVED PROJECTS",
    value: "187",
    trend: "/ 312",
    trendMuted: true,
  },
  { label: "TOTAL VOTES CAST", value: "18.4k", trend: "↑ +2.1k this week" },
  {
    label: "DAYS REMAINING",
    value: "46",
    trend: "Closes Mar 31",
    trendMuted: true,
  },
];

export default function LeaderboardPage() {
  return (
    <AppShell badgeLabel="CHALLENGE LIVE">
      <LeaderboardHeader />
      <StatsBar stats={leaderboardStats} />
      <LeaderboardTable />
    </AppShell>
  );
}
