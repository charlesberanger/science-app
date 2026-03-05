import Link from "next/link";

export default function ProfileHeader() {
  return (
    <div className="border-b border-border pb-8">
      <Link
        href="/profile"
        className="mb-3 inline-flex items-center gap-1 font-mono text-label uppercase tracking-ui text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <span aria-hidden="true">←</span> Back to profile
      </Link>
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Edit Profile
        </h1>
        <p className="text-sm text-secondary-foreground">
          Your public profile is shown alongside your submission on the
          leaderboard.
        </p>
      </div>
    </div>
  );
}
