"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/toast";

const DISCUSSION_TOPICS = [
  "Mesh refinement trade-offs",
  "Memory vs speed benchmarks",
  "NACA validation dataset",
];

export default function RightCol() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [voted, setVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(512);
  const [bumped, setBumped] = useState(false);

  function handleVote() {
    if (!isAuthenticated) {
      router.push("/auth/sign-in?redirect=/project");
      return;
    }
    if (voted) {
      setVoted(false);
      setVoteCount((n) => n - 1);
      toast({ message: "Vote removed", variant: "neutral" });
    } else {
      setVoted(true);
      setVoteCount((n) => n + 1);
      toast({ message: "Vote recorded ✓", variant: "success" });
    }
    setBumped(true);
    setTimeout(() => setBumped(false), 300);
  }

  return (
    <div className="flex flex-col gap-0 rounded border border-border bg-card">
      {/* Vote */}
      <div className="p-5">
        <span
          className="font-mono text-label text-muted-foreground"
        >
          Community Vote
        </span>
        <button
          onClick={handleVote}
          className={`mt-3 flex w-full items-center justify-between rounded border px-4 py-2.5 transition-all duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
            voted
              ? "border-feedback-success bg-feedback-success/10 text-feedback-success"
              : "border-feedback-success bg-feedback-success text-black hover:bg-feedback-success-hover"
          }`}
        >
          <span
            className="font-mono text-ui"
          >
            {voted ? "▲ Voted" : "▲ Vote"}
          </span>
          <span
            className={`font-mono text-ui transition-transform duration-150 ${bumped ? "scale-125" : "scale-100"}`}
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
          className="font-mono text-label text-muted-foreground"
        >
          Challenge
        </span>
        <h2 className="mt-2 text-sm font-semibold leading-snug text-foreground">
          Fluid Dynamics Challenge
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">Turbulent Boundary Layer Modelling Track</p>

        <div className="mt-4 flex flex-col gap-3">
          <div className="flex flex-col gap-0.5">
            <span
              className="font-mono text-label text-muted-foreground"
            >
              Prize Pool
            </span>
            <span className="text-sm font-semibold text-feedback-success">$24,000</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span
              className="font-mono text-label text-muted-foreground"
            >
              Deadline
            </span>
            <span className="text-sm text-secondary-foreground">April 12, 2026 — 23:59 UTC</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span
              className="font-mono text-label text-muted-foreground"
            >
              Submissions
            </span>
            <span className="text-sm text-secondary-foreground">312 total · 87 active teams</span>
          </div>
        </div>
      </div>

      <div className="border-t border-border" />

      {/* Discussion */}
      <div className="p-5">
        <span
          className="font-mono text-label text-muted-foreground"
        >
          Discussion (3)
        </span>
        <div className="mt-3 flex flex-col gap-2">
          {DISCUSSION_TOPICS.map((t) => (
            <a
              key={t}
              href="#comments"
              className="text-sm text-muted-foreground transition-colors hover:text-secondary-foreground"
            >
              → {t}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
