import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "Leaderboard",
  description:
    "Top-ranked projects in the Science Fluid Dynamics Challenge, sorted by community votes.",
};
import LeaderboardHeader from "@/components/leaderboard/LeaderboardHeader";
import StatsBar from "@/components/project/StatsBar";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import CountdownTimer from "@/components/layout/CountdownTimer";

export default function LeaderboardPage() {
  const leaderboardStats = [
    { label: "TOP PROJECT VOTES", value: "512",   trend: "↑ Clara L." },
    { label: "APPROVED PROJECTS", value: "187",   trend: "/ 312", trendMuted: true },
    { label: "TOTAL VOTES CAST",  value: "18.4k", trend: "↑ +2.1k this week" },
    { label: "DAYS REMAINING",    value: <CountdownTimer />, trend: "Closes Apr 12", trendMuted: true },
  ];

  return (
    <AppShell badgeLabel="CHALLENGE LIVE">
      <LeaderboardHeader />
      <StatsBar stats={leaderboardStats} />
      <LeaderboardTable />
    </AppShell>
  );
}
