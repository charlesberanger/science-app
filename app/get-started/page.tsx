"use client";

import { useAuth } from "@/contexts/AuthContext";
import AppShell from "@/components/layout/AppShell";
import IntentHeader from "@/components/onboarding/IntentHeader";
import PathCard from "@/components/onboarding/PathCard";
import ChallengeInfoBar from "@/components/onboarding/ChallengeInfoBar";

export default function GetStartedPage() {
  const { isAuthenticated } = useAuth();

  const paths = [
    {
      icon: "⊞",
      title: "Browse Projects",
      description:
        "Explore all submissions, view CAD models, and discover innovative fluid dynamics solutions. Vote on your favorites.",
      cta: "View submissions →",
      note: "No sign-up required",
      href: "/browse",
    },
    {
      icon: "▲",
      title: "Leaderboard",
      description:
        "See the top-ranked projects competing for $24,000 in prizes. View approved projects only, sorted by votes.",
      cta: "See rankings →",
      note: "Pre-approved projects",
      href: "/leaderboard",
    },
    {
      icon: "↑",
      title: "Submit a Project",
      description:
        "Upload your CAD file and compete for prizes. Share your innovative fluid dynamics research with the community.",
      cta: "Submit Project →",
      note: "Sign-up required",
      href: isAuthenticated ? "/submit" : "/auth/sign-in?redirect=/submit",
    },
  ];

  return (
    <AppShell badgeLabel="CHALLENGE LIVE">
      <div className="-mx-4 -mt-5 flex flex-col sm:-mx-6">
        <div className="px-6 pt-6 pb-0">
          <IntentHeader />
        </div>

        <div className="grid grid-cols-1 gap-px bg-secondary sm:grid-cols-3">
          {paths.map((path) => (
            <PathCard key={path.title} {...path} />
          ))}
        </div>

        <ChallengeInfoBar />
      </div>
    </AppShell>
  );
}
