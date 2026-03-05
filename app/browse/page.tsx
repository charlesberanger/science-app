"use client";

import { useState, useMemo } from "react";
import AppShell from "@/components/layout/AppShell";
import BrowseHeader from "@/components/browse/BrowseHeader";
import StatsBar from "@/components/project/StatsBar";
import ProjectCard from "@/components/browse/ProjectCard";
import { FilterTabs } from "@/components/ui/filter-tabs";
import CountdownTimer from "@/components/layout/CountdownTimer";
import type { StatItem } from "@/components/project/StatsBar";

const browseStats: StatItem[] = [
  { label: "TOTAL SUBMISSIONS", value: "312", trend: "↑ +14 this week" },
  { label: "APPROVED PROJECTS", value: "187", trend: "/ 312", trendMuted: true },
  { label: "TOTAL VOTES CAST",  value: "18.4k", trend: "↑ +2.1k this week" },
  { label: "DAYS REMAINING",    value: <CountdownTimer />, trend: "Closes Apr 12", trendMuted: true },
];

const THUMBNAIL = "/placeholder-project.svg";

const CATEGORIES = ["All", "Fluid Dynamics", "Thermodynamics", "Materials"];

type ProjectStatus = "approved" | "pending" | "rejected";

const allProjects = [
  {
    id: "p1", title: "Fluid Dynamics in Microgravity",        author: "C. Laurent",  votes: 512, rank: 1,
    category: "Fluid Dynamics", status: "approved" as ProjectStatus,
    description: "Capillary-dominated flow regimes under microgravity conditions, with propellant management applications.",
  },
  {
    id: "p2", title: "Thermodynamic Cycle Optimisation",       author: "A. Patel",    votes: 480, rank: 2,
    category: "Thermodynamics", status: "approved" as ProjectStatus,
    description: "Entropy-minimisation approach to closed-loop Brayton cycles for small satellite power systems.",
  },
  {
    id: "p3", title: "Quantum Turbulence Simulation",          author: "J. Smith",    votes: 467, rank: 3,
    category: "Fluid Dynamics", status: "approved" as ProjectStatus,
    description: "Vortex tangle dynamics in superfluid helium-4, benchmarked against cryogenic pipe-flow experiments.",
  },
  {
    id: "p4", title: "Electromagnetic Flow Control",           author: "D. Kim",      votes: 450, rank: 4,
    category: "Fluid Dynamics", status: "approved" as ProjectStatus,
    description: "Lorentz-force actuation for drag reduction in weakly conducting saltwater boundary layers.",
  },
  {
    id: "p5", title: "Statistical Mechanics of Vortex Sheets", author: "S. Johnson",  votes: 441, rank: 5,
    category: "Fluid Dynamics", status: "approved" as ProjectStatus,
    description: "Point-vortex model predicting coherent structure formation in geophysical shear flows.",
  },
  {
    id: "p6", title: "Classical Shock Wave Interaction",       author: "F. Nguyen",   votes: 428, rank: 6,
    category: "Fluid Dynamics", status: "approved" as ProjectStatus,
    description: "Mach reflection patterns at oblique shock intersections in supersonic wind tunnel tests.",
  },
  {
    id: "p7", title: "Optics-Based Flow Visualisation",        author: "B. Davis",    votes: 415, rank: 7,
    category: "Materials", status: "approved" as ProjectStatus,
    description: "Schlieren and shadowgraph techniques adapted for high-speed reacting flow diagnostics.",
  },
  {
    id: "p8", title: "Adaptive Mesh Refinement for CFD",       author: "L. Chen",     votes: 398, rank: 8,
    category: "Fluid Dynamics", status: "approved" as ProjectStatus,
    description: "Error-driven AMR strategy reducing compute cost by 40% on turbulent channel flow problems.",
  },
];

// Only approved projects are visible on Browse
const projects = allProjects.filter((p) => p.status === "approved");

export default function BrowseProjectsPage() {
  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return projects.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesSearch   = !q || p.title.toLowerCase().includes(q) || p.author.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <AppShell badgeLabel="CHALLENGE LIVE">
      <BrowseHeader search={search} onSearchChange={setSearch} count={projects.length} />
      <StatsBar stats={browseStats} />

      {/* Filters */}
      <FilterTabs options={CATEGORIES} value={category} onChange={setCategory} />

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 border border-dashed border-border py-20 text-center">
          <span className="font-mono text-3xl text-muted-foreground" aria-hidden="true">⊘</span>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-muted-foreground">No projects found</p>
            <p className="font-mono text-label text-muted-foreground">Try adjusting your filters or check back later.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 xl:grid-cols-4">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className="animate-enter"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <ProjectCard
                {...project}
                href="/project"
                imageSrc={THUMBNAIL}
              />
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}
