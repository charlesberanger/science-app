import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "Project Detail",
  description: "View a submitted project in the Science Fluid Dynamics Challenge, including CAD model, description, and community votes.",
};
import ChallengeHeader from "@/components/project/ChallengeHeader";
import StatsBar from "@/components/project/StatsBar";
import CountdownTimer from "@/components/layout/CountdownTimer";
import CadViewerDynamic from "@/components/project/CadViewerDynamic";
import Description from "@/components/project/Description";
import ShareLink from "@/components/project/ShareLink";
import CommentsSection from "@/components/project/CommentsSection";
import RightCol from "@/components/project/RightCol";

const projectStats = [
  { label: "VOTES", value: "512", trend: "↑ +38 this week" },
  { label: "REVIEWER SCORE", value: "87", trend: "/ 100 pts" },
  { label: "COMMENTS", value: "3", trend: "↑ +1 this week" },
  { label: "DAYS LEFT", value: <CountdownTimer />, trend: "Closes Apr 12", trendMuted: true },
];

export default function ProjectPage() {
  return (
    <AppShell>
      <ChallengeHeader />
      <StatsBar stats={projectStats} />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_280px]">
        {/* Left column */}
        <div className="flex flex-col gap-5">
          <CadViewerDynamic />
          <Description />
          <ShareLink />
          <CommentsSection />
        </div>

        {/* Right column — moves above comments on mobile via order */}
        <div className="order-first xl:order-none">
          <RightCol />
        </div>
      </div>
    </AppShell>
  );
}
