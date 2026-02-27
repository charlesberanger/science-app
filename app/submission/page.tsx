import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Submission",
  description: "Track the status of your Science Fluid Dynamics Challenge submission.",
};
import AppShell from "@/components/layout/AppShell";
import SubmissionStatusBanner from "@/components/submission/SubmissionStatusBanner";
import SubmissionCard from "@/components/submission/SubmissionCard";
import { Button } from "@/components/ui/button";

const submission = {
  title: "Turbulence Mitigation via Adaptive Surface Geometry",
  submittedAt: "Submitted Feb 13, 2026  ·  14:32 UTC",
  status: "pending" as const,
  meta: [
    { label: "Category", value: "Fluid Dynamics" },
    { label: "Institution", value: "MiT Applied Sciences" },
    { label: "Submitted", value: "Feb 13, 2026" },
    { label: "Assets", value: "CAD File" },
  ],
  description:
    "This project investigates passive turbulence suppression through micro-textured surface geometries inspired by shark-skin denticles. By optimising riblet geometry for varying Reynolds numbers, we demonstrate a 14.2% reduction in skin-friction drag.",
};

export default function MySubmissionPage() {
  return (
    <AppShell badgeLabel="CHALLENGE LIVE">
      {/* Page header */}
      <div className="flex flex-col gap-4 border-b border-border pb-8">
        <div className="flex flex-col gap-1">
          <h1
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            My Submission
          </h1>
          <p
            className="text-xs text-muted-foreground"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            312 submissions &nbsp;·&nbsp; Fluid Dynamics Challenge
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/leaderboard">View on Leaderboard</Link>
          </Button>
        </div>
      </div>

      {/* Status banner */}
      <SubmissionStatusBanner status={submission.status} />

      {/* Submission card */}
      <SubmissionCard
        title={submission.title}
        submittedAt={submission.submittedAt}
        status={submission.status}
        meta={submission.meta}
        description={submission.description}
      />
    </AppShell>
  );
}
