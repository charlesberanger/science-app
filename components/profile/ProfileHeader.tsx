export default function ProfileHeader() {
  return (
    <div className="border-b border-[#2a2a2a] pb-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Create your profile
        </h1>
        <p className="text-xs text-[#777]">
          Your public profile is shown alongside your submission on the
          leaderboard.
        </p>
      </div>
    </div>
  );
}
