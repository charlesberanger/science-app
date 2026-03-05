import Link from "next/link";

export default function ChallengeHeader() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Fluid Dynamics in Microgravity</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        <Link href="/profile/c-laurent" className="text-secondary-foreground transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          by C. Laurent
        </Link>
        {" · "}
        <span className="font-mono">
          Fluid Dynamics Challenge
        </span>
      </p>
    </div>
  );
}
