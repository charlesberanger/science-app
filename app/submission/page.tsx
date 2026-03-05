import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Submission",
  description:
    "Track the status of your Science Fluid Dynamics Challenge submission.",
};
import AppShell from "@/components/layout/AppShell";
import SubmissionStatusBanner from "@/components/submission/SubmissionStatusBanner";
import SubmissionCard from "@/components/submission/SubmissionCard";
import { Button } from "@/components/ui/button";

const submission = {
  title: "Turbulence Mitigation via Adaptive Surface Geometry",
  submittedAt: "Submitted Feb 13, 2026  ·  14:32 UTC",
  status: "pending" as "pending" | "approved" | "rejected",
  meta: [
    { label: "Category", value: "Fluid Dynamics" },
    { label: "AI Score", value: "82 / 100" },
    { label: "Submitted", value: "Feb 13, 2026" },
    { label: "Assets", value: "CAD File" },
  ],
  tubeDesignDifferences:
    "This submission presents a modified 1.5 mL microfuge tube featuring a tapered internal wall geometry with 0.3 mm longitudinal riblets inspired by shark-skin denticles. The wall thickness is reduced from 0.8 mm to 0.55 mm in the lower third to accommodate the surface texturing without exceeding the standard outer envelope. Key departures from the stock tube include a reshaped conical tip with a 15° half-angle (vs. the standard 20°), a widened cap hinge to improve one-handed operation in pressurised gloves, and a circumferential ridge at the 0.75 mL mark to aid liquid-level visibility under variable lighting conditions aboard the ISS.",
  technicalRationale:
    "In microgravity, surface tension and capillary forces dominate over buoyancy-driven convection. The riblet geometry exploits this regime by creating preferential wetting paths that guide fluid toward the tube's centre-line during pipette extraction, reducing residual wall-film thickness by an estimated 14.2%. The narrowed tip angle increases capillary pressure at the base, discouraging bubble entrapment during sample loading — a common failure mode observed in parabolic-flight analogue experiments.",
};

export default function MySubmissionPage() {
  return (
    <AppShell badgeLabel="CHALLENGE LIVE">
      {/* Page header */}
      <div className="flex flex-col gap-4 border-b border-border pb-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            My Submission
          </h1>
          <p className="font-mono text-xs text-muted-foreground">
            Fluid Dynamics Challenge
          </p>
        </div>

        {submission.status === "approved" ? (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/leaderboard">View on Leaderboard</Link>
            </Button>
          </div>
        ) : null}
      </div>

      {/* Status banner */}
      <SubmissionStatusBanner status={submission.status} />

      {/* Submission card */}
      <SubmissionCard
        title={submission.title}
        submittedAt={submission.submittedAt}
        status={submission.status}
        meta={submission.meta}
        tubeDesignDifferences={submission.tubeDesignDifferences}
        technicalRationale={submission.technicalRationale}
      />
    </AppShell>
  );
}
