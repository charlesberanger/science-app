import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SubmissionStatusBanner from "@/components/submission/SubmissionStatusBanner";
import SubmissionCard from "@/components/submission/SubmissionCard";
import { MetricBlock, InfoCell } from "@/components/profile/ProfileMetrics";

// ── Static mock data ──────────────────────────────────────────────────────────
const user = {
  name: "Alice S.",
  initials: "AS",
  role: "Researcher",
  institution: "MiT Applied Sciences",
  email: "alice.s@mit.edu",
  memberSince: "Jan 2026",
  status: "approved" as const,
  bio: "This project investigates passive turbulence suppression through micro-textured surface geometries inspired by shark-skin denticles. By optimising riblet geometry for varying Reynolds numbers, we demonstrate a 14.2% reduction in skin-friction drag.",
  stats: [
    { label: "Votes", value: "512", highlight: true },
    { label: "Views", value: "2.1k", highlight: false },
    { label: "Comments", value: "24", highlight: false },
  ],
};

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

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  return (
    <AppShell badgeLabel="CHALLENGE LIVE">
      {/* Header */}
      <div className="border-b border-[#2a2a2a] pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          My Profile
        </h1>
      </div>

      {/* User info card */}
      <div className="flex flex-col gap-4 border border-[#2a2a2a] bg-[#111] p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <Avatar className="h-[52px] w-[52px] rounded-none">
            <AvatarFallback className="rounded-none bg-[#1c1c1c] font-mono text-base text-[#999]">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <p className="text-xl font-bold text-white">{user.name}</p>
            <p className="font-mono text-label uppercase tracking-ui text-[#777]">
              {user.role}
            </p>
            <p className="font-mono text-label tracking-ui text-[#555]">
              {user.institution}
            </p>
            <Badge variant="success" className="mt-1.5 w-fit">
              APPROVED
            </Badge>
          </div>
        </div>
        <Button variant="outline" className="w-full sm:w-auto" asChild>
          <Link href="/profile/edit">Edit Profile</Link>
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3">
        {user.stats.map((s) => (
          <MetricBlock key={s.label} {...s} />
        ))}
      </div>

      {/* About */}
      <div className="flex flex-col gap-3">
        <p className="font-mono text-label uppercase tracking-ui text-[#555]">
          About
        </p>
        <div className="h-px bg-[#2a2a2a]" />
        <div className="border border-[#2a2a2a] bg-[#111] p-4">
          <p className="text-xs leading-[1.6] text-[#777]">{user.bio}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3">
          <InfoCell label="Email" value={user.email} />
          <InfoCell label="Institution" value={user.institution} />
          <InfoCell label="Member Since" value={user.memberSince} />
        </div>
      </div>

      {/* My Submission */}
      <div className="flex flex-col gap-3">
        <p className="font-mono text-label uppercase tracking-ui text-[#555]">
          My Submission
        </p>
        <div className="h-px bg-[#2a2a2a]" />
        <SubmissionStatusBanner status={submission.status} />
        <SubmissionCard {...submission} />
      </div>
    </AppShell>
  );
}
