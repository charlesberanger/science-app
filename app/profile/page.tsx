import AppShell from "@/components/layout/AppShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SubmissionStatusBanner from "@/components/submission/SubmissionStatusBanner";
import SubmissionCard from "@/components/submission/SubmissionCard";

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
    { label: "Votes",    value: "512",  highlight: true },
    { label: "Views",    value: "2.1k", highlight: false },
    { label: "Comments", value: "24",   highlight: false },
  ],
};

const submission = {
  title: "Turbulence Mitigation via Adaptive Surface Geometry",
  submittedAt: "Submitted Feb 13, 2026  ·  14:32 UTC",
  status: "pending" as const,
  meta: [
    { label: "Category",    value: "Fluid Dynamics" },
    { label: "Institution", value: "MiT Applied Sciences" },
    { label: "Submitted",   value: "Feb 13, 2026" },
    { label: "Assets",      value: "CAD File" },
  ],
  description:
    "This project investigates passive turbulence suppression through micro-textured surface geometries inspired by shark-skin denticles. By optimising riblet geometry for varying Reynolds numbers, we demonstrate a 14.2% reduction in skin-friction drag.",
};

// ── Small local helpers ───────────────────────────────────────────────────────
function MetricBlock({
  value,
  label,
  highlight,
}: {
  value: string;
  label: string;
  highlight: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 border border-[#1c1c1c] bg-[#111] px-4 py-3">
      <p
        className={`text-2xl font-bold tracking-tight ${
          highlight ? "text-[#acffaf]" : "text-[#999]"
        }`}
      >
        {value}
      </p>
      <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#555]">
        {label}
      </p>
    </div>
  );
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex h-16 flex-col justify-center gap-1 border border-[#2a2a2a] bg-[#0a0a0a] px-4">
      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#555]">
        {label}
      </span>
      <span className="text-xs text-white">{value}</span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  return (
    <AppShell badgeLabel="CHALLENGE LIVE">
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-[#2a2a2a] pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          My Profile
        </h1>
        <p className="font-mono text-[11px] tracking-[0.04em] text-[#555]">
          {user.name}&nbsp;&nbsp;·&nbsp;&nbsp;{user.role}&nbsp;&nbsp;·&nbsp;&nbsp;{user.institution}
        </p>
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
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#777]">
              {user.role}
            </p>
            <p className="font-mono text-[10px] tracking-[0.06em] text-[#555]">
              {user.institution}
            </p>
            <Badge variant="success" className="mt-1.5 w-fit">
              APPROVED
            </Badge>
          </div>
        </div>
        <Button variant="outline" className="w-full sm:w-auto">
          Edit Profile
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
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#555]">
          About
        </p>
        <div className="h-px bg-[#2a2a2a]" />
        <div className="border border-[#2a2a2a] bg-[#111] p-4">
          <p className="text-xs leading-[1.6] text-[#777]">{user.bio}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3">
          <InfoCell label="Email"        value={user.email} />
          <InfoCell label="Institution"  value={user.institution} />
          <InfoCell label="Member Since" value={user.memberSince} />
        </div>
      </div>

      {/* My Submission */}
      <div className="flex flex-col gap-3">
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#555]">
          My Submission
        </p>
        <div className="h-px bg-[#2a2a2a]" />
        <SubmissionStatusBanner status={submission.status} />
        <SubmissionCard {...submission} />
      </div>
    </AppShell>
  );
}
