"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const DISCUSSION_TOPICS = [
  "Mesh refinement trade-offs",
  "Memory vs speed benchmarks",
  "NACA validation dataset",
];

export default function RightCol() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [voted, setVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(284);

  function handleVote() {
    if (!isAuthenticated) {
      router.push("/auth/sign-in?redirect=/project");
      return;
    }
    if (voted) {
      setVoted(false);
      setVoteCount((n) => n - 1);
    } else {
      setVoted(true);
      setVoteCount((n) => n + 1);
    }
  }

  return (
    <div className="flex flex-col gap-0 rounded border border-[#2a2a2a] bg-[#111]">
      {/* Vote */}
      <div className="p-5">
        <span
          className="text-label tracking-ui text-[#888] uppercase"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          Community Vote
        </span>
        <button
          onClick={handleVote}
          className={`mt-3 flex w-full items-center justify-between rounded border px-4 py-2.5 transition-colors ${
            voted
              ? "border-[#4ade80] bg-[#4ade80]/10 text-[#4ade80]"
              : "border-[#4ade80] bg-[#4ade80] text-black hover:bg-feedback-success-hover"
          }`}
        >
          <span
            className="text-[11px] uppercase tracking-ui"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            {voted ? "▲ Voted" : "▲ Vote"}
          </span>
          <span
            className="text-[11px]"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            {voteCount}
          </span>
        </button>
        {!isAuthenticated && (
          <p className="mt-2 text-label text-[#888]">
            Sign in to vote for this project
          </p>
        )}
      </div>

      <div className="border-t border-[#2a2a2a]" />

      {/* Challenge info */}
      <div className="p-5">
        <span
          className="text-label tracking-ui text-[#888] uppercase"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          Challenge
        </span>
        <h2 className="mt-2 text-sm font-semibold leading-snug text-white">
          Fluid Dynamics Challenge
        </h2>
        <p className="mt-1 text-xs text-[#888]">Turbulent Boundary Layer Modelling Track</p>

        <div className="mt-4 flex flex-col gap-3">
          <div className="flex flex-col gap-0.5">
            <span
              className="text-label tracking-ui text-[#888] uppercase"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              Prize Pool
            </span>
            <span className="text-sm font-semibold text-[#4ade80]">$25,000</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span
              className="text-label tracking-ui text-[#888] uppercase"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              Deadline
            </span>
            <span className="text-xs text-[#999]">April 12, 2026 — 23:59 UTC</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span
              className="text-label tracking-ui text-[#888] uppercase"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              Submissions
            </span>
            <span className="text-xs text-[#999]">312 total · 87 active teams</span>
          </div>
        </div>
      </div>

      <div className="border-t border-[#2a2a2a]" />

      {/* Discussion */}
      <div className="p-5">
        <span
          className="text-label tracking-ui text-[#888] uppercase"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          Discussion (12)
        </span>
        <div className="mt-3 flex flex-col gap-2">
          {DISCUSSION_TOPICS.map((t) => (
            <a
              key={t}
              href="#comments"
              className="text-xs text-[#888] transition-colors hover:text-[#999]"
            >
              → {t}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
