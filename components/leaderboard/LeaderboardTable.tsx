"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { FilterTabs } from "@/components/ui/filter-tabs";

interface LeaderboardEntry {
  rank: number;
  project: string;
  author: string;
  authorKey: string;       // matches mock user key
  category: string;
  approval: number;
  votes: number;
}

const ALL_ENTRIES: LeaderboardEntry[] = [
  { rank: 1,  project: "Fluid Dynamics in Microgravity",           author: "C. Laurent",  authorKey: "",        category: "FLUID DYNAMICS",  approval: 94, votes: 512 },
  { rank: 2,  project: "Thermodynamic Cycle Optimisation",          author: "A. Patel",    authorKey: "",        category: "THERMODYNAMICS",  approval: 88, votes: 480 },
  { rank: 3,  project: "Quantum Turbulence Simulation",             author: "J. Smith",    authorKey: "",        category: "FLUID DYNAMICS",  approval: 91, votes: 467 },
  { rank: 4,  project: "Electromagnetic Flow Control",              author: "D. Kim",      authorKey: "",        category: "FLUID DYNAMICS",  approval: 87, votes: 450 },
  { rank: 5,  project: "Statistical Mechanics of Vortex Sheets",    author: "S. Johnson",  authorKey: "",        category: "FLUID DYNAMICS",  approval: 80, votes: 441 },
  { rank: 6,  project: "Classical Shock Wave Interaction",          author: "F. Nguyen",   authorKey: "",        category: "FLUID DYNAMICS",  approval: 90, votes: 428 },
  { rank: 7,  project: "Optics-Based Flow Visualisation",           author: "B. Davis",    authorKey: "",        category: "EXPERIMENTAL",    approval: 95, votes: 415 },
  { rank: 8,  project: "Adaptive Mesh Refinement for CFD",          author: "L. Chen",     authorKey: "",        category: "FLUID DYNAMICS",  approval: 82, votes: 398 },
  { rank: 9,  project: "Turbulent Boundary Layer Modelling",        author: "M. Okafor",   authorKey: "",        category: "FLUID DYNAMICS",  approval: 89, votes: 374 },
  { rank: 10, project: "Turbulence Mitigation via Adaptive Surface", author: "Alice S.",   authorKey: "alice-s", category: "FLUID DYNAMICS",  approval: 84, votes: 358 },
  { rank: 11, project: "Cavitation in Micro-channels",              author: "R. Müller",   authorKey: "",        category: "FLUID DYNAMICS",  approval: 85, votes: 341 },
  { rank: 12, project: "Reynolds-Averaged Navier-Stokes Study",     author: "T. Andersen", authorKey: "",        category: "FLUID DYNAMICS",  approval: 78, votes: 322 },
  { rank: 13, project: "Direct Numerical Simulation of Jets",        author: "Y. Tanaka",   authorKey: "",        category: "FLUID DYNAMICS",  approval: 93, votes: 309 },
  { rank: 14, project: "Passive Flow Separation Control",           author: "E. Rossi",    authorKey: "",        category: "EXPERIMENTAL",    approval: 86, votes: 294 },
  { rank: 15, project: "Lattice Boltzmann Method for Droplets",     author: "P. Novak",    authorKey: "",        category: "FLUID DYNAMICS",  approval: 81, votes: 278 },
];

const CATEGORIES = ["All", "Fluid Dynamics", "Thermodynamics", "Experimental"];
const PAGE_SIZE = 7;

const MY_AUTHOR_KEY = "alice-s";

function RankBadge({ rank }: { rank: number }) {
  return (
    <span
      className="font-mono inline-flex items-center gap-1 rounded-full border border-feedback-success px-2.5 py-0.5"
    >
      <span className="h-1 w-1 rounded-full bg-feedback-success" aria-hidden="true" />
      <span className="text-label text-feedback-success tracking-ui">#{rank}</span>
    </span>
  );
}

function ApprovalBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2" role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={`${value}% approval`}>
      <div className="h-1 w-20 rounded-full bg-muted-foreground/30">
        <div className="h-1 rounded-full bg-lime-400" style={{ width: `${value}%` }} />
      </div>
      <span
        className="font-mono text-label text-muted-foreground tracking-ui"
      >
        {value}%
      </span>
    </div>
  );
}

export default function LeaderboardTable() {
  const { isAuthenticated } = useAuth();
  const [category, setCategory] = useState("All");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    if (category === "All") return ALL_ENTRIES;
    return ALL_ENTRIES.filter(
      (e) => e.category.toLowerCase() === category.toLowerCase()
    );
  }, [category]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const myEntry = isAuthenticated
    ? ALL_ENTRIES.find((e) => e.authorKey === MY_AUTHOR_KEY)
    : null;

  // Reset visible when filter changes
  function handleCategoryChange(val: string) {
    setCategory(val);
    setVisible(PAGE_SIZE);
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Filter tabs */}
      <FilterTabs options={CATEGORIES} value={category} onChange={handleCategoryChange} />

      {/* "Your rank" callout — authenticated only */}
      {myEntry && (
        <div className="flex items-center gap-3 border border-feedback-warning/40 bg-feedback-warning/5 px-4 py-2.5">
          <span
            className="font-mono text-ui uppercase tracking-ui text-feedback-warning"
          >
            Your rank
          </span>
          <span
            className="font-mono inline-flex items-center gap-1 rounded-full border border-feedback-warning px-2 py-0.5"
          >
            <span className="h-1 w-1 rounded-full bg-feedback-warning" aria-hidden="true" />
            <span className="text-label text-feedback-warning tracking-ui">
              #{myEntry.rank}
            </span>
          </span>
          <span className="text-sm font-medium text-foreground truncate">
            {myEntry.project}
          </span>
          <span className="ml-auto font-mono text-ui text-feedback-success">
            <span aria-hidden="true">▲</span> {myEntry.votes}
          </span>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden border border-border">
        <table className="w-full border-collapse">
          <thead className="hidden sm:table-header-group">
            <tr className="border-b border-border">
              {["RANK", "PROJECT / AUTHOR", "CATEGORY", "APPROVAL", "VOTES"].map((col) => (
                <th
                  key={col}
                  scope="col"
                  className="font-mono px-4 py-2.5 text-left text-label font-normal uppercase tracking-ui text-muted-foreground"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {shown.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center font-mono text-label text-muted-foreground">
                  No entries in this category.
                </td>
              </tr>
            ) : (
              shown.map((entry, i) => {
                const isMe = isAuthenticated && entry.authorKey === MY_AUTHOR_KEY;
                return (
                  <tr
                    key={entry.rank}
                    className={`animate-enter border-b border-border transition-colors hover:bg-secondary ${
                      isMe
                        ? "border-l-2 border-l-feedback-warning bg-feedback-warning/5"
                        : entry.rank === 1
                        ? "border-l-2 border-l-feedback-success bg-card"
                        : "bg-card"
                    }`}
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <td className="px-3 py-3 sm:px-4">
                      <RankBadge rank={entry.rank} />
                    </td>
                    <td className="px-4 py-3">
                      <Link href="/project" className="flex items-center gap-3">
                        <div className="h-7 w-7 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
                        <div className="flex min-w-0 flex-col">
                          <span className="truncate text-sm font-medium text-foreground">
                            {entry.project}
                          </span>
                          <span className="flex items-center gap-1.5 text-ui text-muted-foreground">
                            {entry.author}
                            {isMe ? (
                              <span
                                className="font-mono text-ui uppercase tracking-ui text-feedback-warning"
                              >
                                · You
                              </span>
                            ) : null}
                          </span>
                        </div>
                      </Link>
                    </td>
                    <td className="hidden sm:table-cell">
                      <span
                        className="font-mono border border-border bg-secondary px-3 py-1.5 text-label uppercase tracking-ui text-secondary-foreground"
                      >
                        {entry.category}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell">
                      <ApprovalBar value={entry.approval} />
                    </td>
                    <td className="px-4 text-right">
                      <span
                        className="font-mono text-sm font-medium text-feedback-success tracking-ui"
                      >
                        {entry.votes}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex items-center justify-between bg-card px-4 py-3">
          <span
            className="font-mono text-label text-muted-foreground tracking-ui"
          >
            Showing {shown.length} of {filtered.length} approved projects
          </span>
          {hasMore ? (
            <button
              onClick={() => setVisible((v) => Math.min(v + PAGE_SIZE, filtered.length))}
              className="font-mono border border-border bg-secondary px-4 py-1.5 text-ui text-secondary-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Load more <span aria-hidden="true">→</span>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
