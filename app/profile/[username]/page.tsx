import AppShell from "@/components/layout/AppShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import SubmissionStatusBanner from "@/components/submission/SubmissionStatusBanner";
import SubmissionCard from "@/components/submission/SubmissionCard";
import { MetricBlock, InfoCell } from "@/components/profile/ProfileMetrics";

// ── Mock — replace with real data fetch by username ──────────────────────────
const USERS: Record<
  string,
  {
    name: string;
    initials: string;
    role: string;
    institution: string;
    email: string;
    memberSince: string;
    status: "approved" | "pending";
    bio: string;
    stats: { label: string; value: string; highlight: boolean }[];
    submission: {
      title: string;
      submittedAt: string;
      status: "pending" | "approved";
      meta: { label: string; value: string }[];
      description: string;
    };
  }
> = {
  "c-laurent": {
    name: "C. Laurent",
    initials: "CL",
    role: "PhD Candidate",
    institution: "CNRS — Institut de Mécanique des Fluides",
    email: "c.laurent@imft.fr",
    memberSince: "Dec 2025",
    status: "approved",
    bio: "Research focus on microgravity fluid behaviour and capillary-driven flow regimes aboard orbital platforms. Currently developing a novel experimental rig for ISS deployment in collaboration with ESA's fluid physics team.",
    stats: [
      { label: "Votes", value: "512", highlight: true },
      { label: "Views", value: "3.8k", highlight: false },
      { label: "Comments", value: "41", highlight: false },
    ],
    submission: {
      title: "Fluid Dynamics in Microgravity",
      submittedAt: "Submitted Jan 28, 2026  ·  09:14 UTC",
      status: "approved",
      meta: [
        { label: "Category", value: "Fluid Dynamics" },
        { label: "Institution", value: "CNRS — IMFT" },
        { label: "Submitted", value: "Jan 28, 2026" },
        { label: "Assets", value: "CAD File + Report" },
      ],
      description:
        "Investigation of capillary-dominated flow regimes under microgravity conditions, with applications to propellant management in orbital vehicles. Results validated against parabolic flight data from ESA's 74th campaign.",
    },
  },
  "alice-s": {
    name: "Alice S.",
    initials: "AS",
    role: "Researcher",
    institution: "MiT Applied Sciences",
    email: "alice.s@mit.edu",
    memberSince: "Jan 2026",
    status: "approved",
    bio: "This project investigates passive turbulence suppression through micro-textured surface geometries inspired by shark-skin denticles. By optimising riblet geometry for varying Reynolds numbers, we demonstrate a 14.2% reduction in skin-friction drag.",
    stats: [
      { label: "Votes", value: "284", highlight: true },
      { label: "Views", value: "2.1k", highlight: false },
      { label: "Comments", value: "24", highlight: false },
    ],
    submission: {
      title: "Turbulence Mitigation via Adaptive Surface Geometry",
      submittedAt: "Submitted Feb 13, 2026  ·  14:32 UTC",
      status: "pending",
      meta: [
        { label: "Category", value: "Fluid Dynamics" },
        { label: "Institution", value: "MiT Applied Sciences" },
        { label: "Submitted", value: "Feb 13, 2026" },
        { label: "Assets", value: "CAD File" },
      ],
      description:
        "Passive turbulence suppression through micro-textured surface geometries inspired by shark-skin denticles. Optimised riblet geometry for varying Reynolds numbers demonstrates a 14.2% reduction in skin-friction drag.",
    },
  },
};

const DEFAULT_USER = USERS["alice-s"];

const getUser = (username: string) => USERS[username] ?? DEFAULT_USER;

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PublicProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const user = getUser(params.username);
  const { submission } = user;

  return (
    <AppShell>
      {/* User info card — no Edit Profile button */}
      <div className="flex items-center border border-[#2a2a2a] bg-[#111] p-6">
        <div className="flex items-center gap-5">
          <Avatar className="h-[52px] w-[52px] rounded-none">
            <AvatarFallback className="rounded-none bg-[#1c1c1c] font-mono text-base text-[#999]">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <p className="text-xl font-bold text-white">{user.name}</p>
            <p className="font-mono text-label uppercase tracking-ui text-[#999]">
              {user.role}
            </p>
            <p className="font-mono text-label tracking-ui text-[#888]">
              {user.institution}
            </p>
            <Badge variant="success" className="mt-1.5 w-fit">
              APPROVED
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3">
        {user.stats.map((s) => (
          <MetricBlock key={s.label} {...s} />
        ))}
      </div>

      {/* About */}
      <div className="flex flex-col gap-3">
        <p className="font-mono text-label uppercase tracking-ui text-[#888]">
          About
        </p>
        <div className="h-px bg-[#2a2a2a]" />
        <div className="border border-[#2a2a2a] bg-[#111] p-4">
          <p className="text-xs leading-[1.6] text-[#999]">{user.bio}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3">
          <InfoCell label="Email" value={user.email} />
          <InfoCell label="Institution" value={user.institution} />
          <InfoCell label="Member Since" value={user.memberSince} />
        </div>
      </div>

      {/* Submission */}
      <div className="flex flex-col gap-3">
        <p className="font-mono text-label uppercase tracking-ui text-[#888]">
          Submission
        </p>
        <div className="h-px bg-[#2a2a2a]" />
        <SubmissionStatusBanner status={submission.status} />
        <SubmissionCard {...submission} />
      </div>
    </AppShell>
  );
}
