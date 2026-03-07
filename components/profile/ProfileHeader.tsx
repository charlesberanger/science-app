import Link from "next/link";

interface ProfileHeaderProps {
  isSetup?: boolean;
}

export default function ProfileHeader({ isSetup = false }: ProfileHeaderProps) {
  return (
    <div className="border-b border-border pb-8">
      {isSetup ? (
        <Link
          href="/get-started"
          className="mb-3 inline-flex items-center gap-1 font-mono text-label text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Skip for now <span aria-hidden="true">→</span>
        </Link>
      ) : (
        <Link
          href="/profile"
          className="mb-3 inline-flex items-center gap-1 font-mono text-label text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <span aria-hidden="true">←</span> Back to profile
        </Link>
      )}
      <div className="flex flex-col gap-1">
        <h1 className="font-doto font-bold text-3xl text-foreground sm:text-4xl">
          {isSetup ? "Complete your profile" : "Edit Profile"}
        </h1>
        <p className="text-sm text-secondary-foreground">
          {isSetup
            ? "Set up your public profile before submitting a project. This is shown alongside your submission on the leaderboard."
            : "Your public profile is shown alongside your submission on the leaderboard."}
        </p>
      </div>
    </div>
  );
}
