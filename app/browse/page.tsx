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
  { id: "p1", title: "Fluid Dynamics in Microgravity",        author: "C. Laurent",  votes: 512, rank: 1 },
  { id: "p2", title: "Thermodynamic Cycle Optimisation",       author: "A. Patel",    votes: 480, rank: 2 },
  { id: "p3", title: "Quantum Turbulence Simulation",          author: "J. Smith",    votes: 467, rank: 3 },
  { id: "p4", title: "Electromagnetic Flow Control",           author: "D. Kim",      votes: 450, rank: 4 },
  { id: "p5", title: "Statistical Mechanics of Vortex Sheets", author: "S. Johnson",  votes: 441, rank: 5 },
  { id: "p6", title: "Classical Shock Wave Interaction",       author: "F. Nguyen",   votes: 428, rank: 6 },
  { id: "p7", title: "Optics-Based Flow Visualisation",        author: "B. Davis",    votes: 415, rank: 7 },
  { id: "p8", title: "Adaptive Mesh Refinement for CFD",       author: "L. Chen",     votes: 398, rank: 8 },
];

export default function BrowseProjectsPage() {
  return (
    <AppShell badgeLabel="CHALLENGE LIVE">
      <BrowseHeader />
      <StatsBar stats={browseStats} />

      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 xl:grid-cols-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
            href="/project"
            imageSrc={THUMBNAIL}
          />
        ))}
      </div>
    </AppShell>
  );
}
