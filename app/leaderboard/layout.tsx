import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard",
  description: "Top-ranked projects in the Science Fluid Dynamics Challenge.",
};

export default function LeaderboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
