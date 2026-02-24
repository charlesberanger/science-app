import AppShell from "@/components/layout/AppShell";
import ChallengeHeader from "@/components/project/ChallengeHeader";
import StatsBar from "@/components/project/StatsBar";
import CadViewer from "@/components/project/CadViewer";
import Description from "@/components/project/Description";
import ShareLink from "@/components/project/ShareLink";
import CommentsSection from "@/components/project/CommentsSection";
import RightCol from "@/components/project/RightCol";

export default function ProjectPage() {
  return (
    <AppShell>
      <ChallengeHeader />
      <StatsBar />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_280px]">
        {/* Left column */}
        <div className="flex flex-col gap-5">
          <CadViewer />
          <Description />
          <ShareLink />
          <CommentsSection />
        </div>

        {/* Right column — moves above comments on mobile via order */}
        <div className="order-first xl:order-none">
          <RightCol isAuthenticated={false} />
        </div>
      </div>
    </AppShell>
  );
}
