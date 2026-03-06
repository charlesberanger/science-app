import AppShell from "@/components/layout/AppShell";
import UserAvatar from "@/components/ui/UserAvatar";
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
      tubeDesignDifferences: string;
      technicalRationale: string;
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
        { label: "AI Pre-screen", value: "91 / 100" },
        { label: "Submitted", value: "Jan 28, 2026" },
        { label: "Assets", value: "CAD File + Report" },
        { label: "Reviewer Score", value: "94 / 100" },
      ],
      tubeDesignDifferences:
        "This submission presents a modified 1.5 mL microfuge tube featuring a tapered internal wall geometry with 0.3 mm longitudinal riblets inspired by shark-skin denticles. The wall thickness is reduced from 0.8 mm to 0.55 mm in the lower third to accommodate the surface texturing without exceeding the standard outer envelope.",
      technicalRationale:
        "In microgravity, surface tension and capillary forces dominate over buoyancy-driven convection. The riblet geometry exploits this regime by creating preferential wetting paths that guide fluid toward the tube's centre-line during pipette extraction, reducing residual wall-film thickness by an estimated 14.2%.",
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
        { label: "AI Pre-screen", value: "82 / 100" },
        { label: "Submitted", value: "Feb 13, 2026" },
        { label: "Assets", value: "CAD File" },
        { label: "Reviewer Score", value: "—" },
      ],
      tubeDesignDifferences:
        "This submission presents a modified 1.5 mL microfuge tube featuring a tapered internal wall geometry with 0.3 mm longitudinal riblets inspired by shark-skin denticles. The wall thickness is reduced from 0.8 mm to 0.55 mm in the lower third to accommodate the surface texturing without exceeding the standard outer envelope.",
      technicalRationale:
        "In microgravity, surface tension and capillary forces dominate over buoyancy-driven convection. The riblet geometry exploits this regime by creating preferential wetting paths that guide fluid toward the tube's centre-line during pipette extraction, reducing residual wall-film thickness by an estimated 14.2%.",
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
      <div className="flex items-center border border-border bg-card p-6">
        <div className="flex items-center gap-5">
          <UserAvatar name={user.name} size="lg" />
          <div className="flex flex-col gap-0.5">
            <p className="text-xl font-bold text-foreground">{user.name}</p>
            <p className="font-mono text-label text-secondary-foreground">
              {user.role}
            </p>
            <p className="font-mono text-label text-muted-foreground">
              {user.institution}
            </p>
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
        <p className="font-mono text-sm text-muted-foreground">
          About
        </p>
        <div className="h-px bg-secondary" />
        <div className="border border-border bg-card p-4">
          <p className="text-sm leading-relaxed text-secondary-foreground">
            {user.bio}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3">
          <InfoCell label="Email" value={user.email} />
          <InfoCell label="Institution" value={user.institution} />
          <InfoCell label="Member Since" value={user.memberSince} />
        </div>
      </div>

      {/* Submission */}
      <div className="flex flex-col gap-3">
        <p className="font-mono text-sm text-muted-foreground">
          Submission
        </p>
        <div className="h-px bg-secondary" />
        <SubmissionStatusBanner status={submission.status} />
        <SubmissionCard {...submission} />
      </div>
    </AppShell>
  );
}
