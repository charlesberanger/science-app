"use client";

import { useState } from "react";
import Link from "next/link";

interface LeaderboardEntry {
  rank: number;
  project: string;
  author: string;
  category: string;
  approval: number;
  votes: number;
}

const ALL_ENTRIES: LeaderboardEntry[] = [
  {
    rank: 1,
    project: "Fluid Dynamics in Microgravity",
    author: "C. Laurent",
    category: "FLUID DYNAMICS",
    approval: 94,
    votes: 512,
  },
  {
    rank: 2,
    project: "Thermodynamic Cycle Optimisation",
    author: "A. Patel",
    category: "THERMODYNAMICS",
    approval: 88,
    votes: 480,
  },
  {
    rank: 3,
    project: "Quantum Turbulence Simulation",
    author: "J. Smith",
    category: "FLUID DYNAMICS",
    approval: 91,
    votes: 467,
  },
  {
    rank: 4,
    project: "Electromagnetic Flow Control",
    author: "D. Kim",
    category: "FLUID DYNAMICS",
    approval: 87,
    votes: 450,
  },
  {
    rank: 5,
    project: "Statistical Mechanics of Vortex Sheets",
    author: "S. Johnson",
    category: "FLUID DYNAMICS",
    approval: 80,
    votes: 441,
  },
  {
    rank: 6,
    project: "Classical Shock Wave Interaction",
    author: "F. Nguyen",
    category: "FLUID DYNAMICS",
    approval: 90,
    votes: 428,
  },
  {
    rank: 7,
    project: "Optics-Based Flow Visualisation",
    author: "B. Davis",
    category: "EXPERIMENTAL",
    approval: 95,
    votes: 415,
  },
  {
    rank: 8,
    project: "Adaptive Mesh Refinement for CFD",
    author: "L. Chen",
    category: "FLUID DYNAMICS",
    approval: 82,
    votes: 398,
  },
  {
    rank: 9,
    project: "Turbulent Boundary Layer Modelling",
    author: "M. Okafor",
    category: "FLUID DYNAMICS",
    approval: 89,
    votes: 374,
  },
  {
    rank: 10,
    project: "Cavitation in Micro-channels",
    author: "R. Müller",
    category: "FLUID DYNAMICS",
    approval: 85,
    votes: 361,
  },
  {
    rank: 11,
    project: "Reynolds-Averaged Navier-Stokes Study",
    author: "T. Andersen",
    category: "FLUID DYNAMICS",
    approval: 78,
    votes: 342,
  },
  {
    rank: 12,
    project: "Direct Numerical Simulation of Jets",
    author: "Y. Tanaka",
    category: "FLUID DYNAMICS",
    approval: 93,
    votes: 329,
  },
  {
    rank: 13,
    project: "Passive Flow Separation Control",
    author: "E. Rossi",
    category: "EXPERIMENTAL",
    approval: 86,
    votes: 314,
  },
  {
    rank: 14,
    project: "Lattice Boltzmann Method for Droplets",
    author: "P. Novak",
    category: "FLUID DYNAMICS",
    approval: 81,
    votes: 298,
  },
];

const PAGE_SIZE = 7;

function RankBadge({ rank }: { rank: number }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border border-feedback-success px-2.5 py-0.5"
      style={{ fontFamily: "var(--font-dm-mono), monospace" }}
    >
      <span className="h-1 w-1 rounded-full bg-feedback-success" />
      <span className="text-label text-feedback-success tracking-ui">#{rank}</span>
    </span>
  );
}

function ApprovalBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1 w-20 rounded-full bg-muted-foreground/30">
        <div
          className="h-1 rounded-full bg-lime-400"
          style={{ width: `${value}%` }}
        />
      </div>
      <span
        className="text-label text-muted-foreground tracking-ui"
        style={{ fontFamily: "var(--font-dm-mono), monospace" }}
      >
        {value}%
      </span>
    </div>
  );
}

export default function LeaderboardTable() {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = ALL_ENTRIES.slice(0, visible);
  const hasMore = visible < ALL_ENTRIES.length;

  return (
    <div className="overflow-hidden border border-border">
      {/* Table header */}
      <div className="hidden border-b border-border sm:grid sm:grid-cols-[60px_1fr_160px_160px_80px]">
        {["RANK", "PROJECT / AUTHOR", "CATEGORY", "APPROVAL", "VOTES"].map(
          (col) => (
            <div
              key={col}
              className="px-4 py-2.5 text-label uppercase tracking-ui text-muted-foreground"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              {col}
            </div>
          ),
        )}
      </div>

      {/* Rows */}
      {shown.map((entry) => (
        <Link
          key={entry.rank}
          href="/project"
          className={`relative grid grid-cols-[40px_1fr_80px] border-b border-border bg-card transition-colors hover:bg-secondary sm:grid-cols-[60px_1fr_160px_160px_80px] ${
            entry.rank === 1 ? "border-l-2 border-l-feedback-success" : ""
          }`}
        >
          <div className="flex items-center px-3 py-3 sm:px-4">
            <RankBadge rank={entry.rank} />
          </div>
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="h-7 w-7 shrink-0 rounded-full bg-secondary" />
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-[13px] font-medium text-foreground">
                {entry.project}
              </span>
              <span className="text-[11px] text-muted-foreground">{entry.author}</span>
            </div>
          </div>
          <div className="hidden items-center sm:flex">
            <span
              className="border border-border bg-secondary px-3 py-1.5 text-label uppercase tracking-ui text-secondary-foreground"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              {entry.category}
            </span>
          </div>
          <div className="hidden items-center sm:flex">
            <ApprovalBar value={entry.approval} />
          </div>
          <div className="flex items-center justify-end px-4">
            <span
              className="text-[14px] font-medium text-feedback-success tracking-ui"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              {entry.votes}
            </span>
          </div>
        </Link>
      ))}

      {/* Footer */}
      <div className="flex items-center justify-between bg-card px-4 py-3">
        <span
          className="text-label text-muted-foreground tracking-ui"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          Showing {shown.length} of {ALL_ENTRIES.length} approved projects
        </span>
        {hasMore && (
          <button
            onClick={() =>
              setVisible((v) => Math.min(v + PAGE_SIZE, ALL_ENTRIES.length))
            }
            className="border border-border bg-secondary px-4 py-1.5 text-[11px] text-secondary-foreground transition-colors hover:text-foreground"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            Load more →
          </button>
        )}
      </div>
    </div>
  );
}
