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
  const [bumped, setBumped] = useState(false);

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
    setBumped(true);
    setTimeout(() => setBumped(false), 300);
  }

  return (
    <div className="flex flex-col gap-0 rounded border border-border bg-card">
      {/* Vote */}
      <div className="p-5">
        <span
          className="text-label tracking-ui text-muted-foreground uppercase"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          Community Vote
        </span>
        <button
          onClick={handleVote}
          className={`mt-3 flex w-full items-center justify-between rounded border px-4 py-2.5 transition-all duration-150 active:scale-[0.97] ${
            voted
              ? "border-feedback-success bg-feedback-success/10 text-feedback-success"
              : "border-feedback-success bg-feedback-success text-black hover:bg-feedback-success-hover"
          }`}
        >
          <span
            className="text-[11px] uppercase tracking-ui"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            {voted ? "▲ Voted" : "▲ Vote"}
          </span>
          <span
            className="text-[11px] transition-transform duration-150"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              transform: bumped ? "scale(1.3)" : "scale(1)",
            }}
          >
            {voteCount}
          </span>
        </button>
        {!isAuthenticated && (
          <p className="mt-2 text-label text-muted-foreground">
            Sign in to vote for this project
          </p>
        )}
      </div>

      <div className="border-t border-border" />

      {/* Challenge info */}
      <div className="p-5">
        <span
          className="text-label tracking-ui text-muted-foreground uppercase"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          Challenge
        </span>
        <h2 className="mt-2 text-sm font-semibold leading-snug text-foreground">
          Fluid Dynamics Challenge
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">Turbulent Boundary Layer Modelling Track</p>

        <div className="mt-4 flex flex-col gap-3">
          <div className="flex flex-col gap-0.5">
            <span
              className="text-label tracking-ui text-muted-foreground uppercase"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              Prize Pool
            </span>
            <span className="text-sm font-semibold text-feedback-success">$25,000</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span
              className="text-label tracking-ui text-muted-foreground uppercase"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              Deadline
            </span>
            <span className="text-xs text-secondary-foreground">April 12, 2026 — 23:59 UTC</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span
              className="text-label tracking-ui text-muted-foreground uppercase"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              Submissions
            </span>
            <span className="text-xs text-secondary-foreground">312 total · 87 active teams</span>
          </div>
        </div>
      </div>

      <div className="border-t border-border" />

      {/* Discussion */}
      <div className="p-5">
        <span
          className="text-label tracking-ui text-muted-foreground uppercase"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          Discussion (12)
        </span>
        <div className="mt-3 flex flex-col gap-2">
          {DISCUSSION_TOPICS.map((t) => (
            <a
              key={t}
              href="#comments"
              className="text-xs text-muted-foreground transition-colors hover:text-secondary-foreground"
            >
              → {t}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
