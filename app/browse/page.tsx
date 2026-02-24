import AppShell from "@/components/layout/AppShell";
import BrowseHeader from "@/components/browse/BrowseHeader";
import StatsBar from "@/components/project/StatsBar";
import ProjectCard from "@/components/browse/ProjectCard";
import type { StatItem } from "@/components/project/StatsBar";

const THUMBNAIL =
  "https://www.figma.com/api/mcp/asset/f145ebcc-6bae-4ef0-b09a-5f238f44cacf";

const browseStats: StatItem[] = [
  { label: "TOTAL SUBMISSIONS", value: "312", trend: "↑ +14 this week" },
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

const projects = [
  {
    title: "Fluid Dynamics in Microgravity",
    author: "C. Laurent",
    votes: 512,
    rank: 1,
  },
  {
    title: "Fluid Dynamics in Microgravity",
    author: "C. Laurent",
    votes: 512,
    rank: 1,
  },
  {
    title: "Fluid Dynamics in Microgravity",
    author: "C. Laurent",
    votes: 512,
    rank: 1,
  },
  {
    title: "Fluid Dynamics in Microgravity",
    author: "C. Laurent",
    votes: 512,
    rank: 1,
  },
  {
    title: "Fluid Dynamics in Microgravity",
    author: "C. Laurent",
    votes: 512,
    rank: 1,
  },
  {
    title: "Fluid Dynamics in Microgravity",
    author: "C. Laurent",
    votes: 512,
    rank: 1,
  },
  {
    title: "Fluid Dynamics in Microgravity",
    author: "C. Laurent",
    votes: 512,
    rank: 1,
  },
  {
    title: "Fluid Dynamics in Microgravity",
    author: "C. Laurent",
    votes: 512,
    rank: 1,
  },
];

export default function BrowseProjectsPage() {
  return (
    <AppShell badgeLabel="CHALLENGE LIVE">
      <BrowseHeader />
      <StatsBar stats={browseStats} />

      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 xl:grid-cols-4">
        {projects.map((project, i) => (
          <ProjectCard
            key={i}
            {...project}
            href="/project"
            imageSrc={THUMBNAIL}
          />
        ))}
      </div>
    </AppShell>
  );
}
