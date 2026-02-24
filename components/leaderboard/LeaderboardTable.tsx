import Link from "next/link";

interface LeaderboardEntry {
  rank: number;
  project: string;
  author: string;
  category: string;
  approval: number;
  votes: number;
}

const entries: LeaderboardEntry[] = [
  { rank: 1, project: "Fluid Dynamics", author: "C. Laurent", category: "FLUID DYNAMICS", approval: 94, votes: 512 },
  { rank: 2, project: "Thermodynamics", author: "A. Patel", category: "FLUID DYNAMICS", approval: 88, votes: 480 },
  { rank: 3, project: "Quantum Mechanics", author: "J. Smith", category: "FLUID DYNAMICS", approval: 91, votes: 530 },
  { rank: 4, project: "Electromagnetism", author: "D. Kim", category: "FLUID DYNAMICS", approval: 87, votes: 450 },
  { rank: 5, project: "Statistical Mechanics", author: "S. Johnson", category: "FLUID DYNAMICS", approval: 80, votes: 470 },
  { rank: 6, project: "Classical Mechanics", author: "F. Nguyen", category: "FLUID DYNAMICS", approval: 90, votes: 495 },
  { rank: 7, project: "Optics", author: "B. Davis", category: "FLUID DYNAMICS", approval: 95, votes: 510 },
];

function RankBadge({ rank }: { rank: number }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border border-[#4ade80] px-2.5 py-0.5"
      style={{ fontFamily: "var(--font-dm-mono), monospace" }}
    >
      <span className="h-1 w-1 rounded-full bg-[#4ade80]" />
      <span className="text-[10px] text-[#4ade80] tracking-wider">#{rank}</span>
    </span>
  );
}

function ApprovalBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1 w-20 rounded-full bg-[#555]">
        <div
          className="h-1 rounded-full bg-[#acffaf]"
          style={{ width: `${value}%` }}
        />
      </div>
      <span
        className="text-[9px] text-[#555] tracking-wider"
        style={{ fontFamily: "var(--font-dm-mono), monospace" }}
      >
        {value}%
      </span>
    </div>
  );
}

export default function LeaderboardTable() {
  return (
    <div className="overflow-hidden border border-[#2a2a2a]">
      {/* Table header */}
      <div className="hidden border-b border-[#2a2a2a] sm:grid sm:grid-cols-[60px_1fr_160px_160px_80px]">
        {["RANK", "PROJECT / AUTHOR", "CATEGORY", "APPROVAL", "VOTES"].map((col) => (
          <div
            key={col}
            className="px-4 py-2.5 text-[9px] uppercase tracking-widest text-[#555]"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            {col}
          </div>
        ))}
      </div>

      {/* Rows */}
      {entries.map((entry) => (
        <Link
          key={entry.rank}
          href="/project"
          className={`relative grid grid-cols-[40px_1fr_80px] border-b border-[#2a2a2a] bg-[#161616] transition-colors hover:bg-[#1c1c1c] sm:grid-cols-[60px_1fr_160px_160px_80px] ${
            entry.rank === 1 ? "border-l-2 border-l-[#4ade80]" : ""
          }`}
        >
          {/* Rank */}
          <div className="flex items-center px-3 py-3 sm:px-4">
            <RankBadge rank={entry.rank} />
          </div>

          {/* Project / Author */}
          <div className="flex items-center gap-3 py-3 pr-4">
            <div className="h-7 w-7 shrink-0 rounded-full bg-[#3a3a3a]" />
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-[13px] font-medium text-white">
                {entry.project}
              </span>
              <span className="text-[11px] text-[#555]">{entry.author}</span>
            </div>
          </div>

          {/* Category — hidden on mobile */}
          <div className="hidden items-center sm:flex">
            <span
              className="border border-[#2a2a2a] bg-[#1c1c1c] px-3 py-1.5 text-[9px] uppercase tracking-widest text-[#999]"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              {entry.category}
            </span>
          </div>

          {/* Approval — hidden on mobile */}
          <div className="hidden items-center sm:flex">
            <ApprovalBar value={entry.approval} />
          </div>

          {/* Votes */}
          <div className="flex items-center justify-end px-4">
            <span
              className="text-[14px] font-medium text-[#4ade80] tracking-wider"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              {entry.votes}
            </span>
          </div>
        </Link>
      ))}

      {/* Footer */}
      <div className="flex items-center justify-between bg-[#111] px-4 py-3">
        <span
          className="text-[10px] text-[#555] tracking-wider"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          Showing {entries.length} of 187 approved projects
        </span>
        <button className="border border-[#2a2a2a] bg-[#1c1c1c] px-4 py-1.5 text-[11px] text-[#777] transition-colors hover:text-white">
          Load more →
        </button>
      </div>
    </div>
  );
}
