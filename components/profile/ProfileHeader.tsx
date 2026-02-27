export default function ProfileHeader() {
  return (
    <div className="border-b border-border pb-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Create your profile
        </h1>
        <p className="text-xs text-secondary-foreground">
          Your public profile is shown alongside your submission on the
          leaderboard.
        </p>
      </div>
    </div>
  );
}
