import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function ChallengeHeader() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Badge variant="success">Approved</Badge>
        <span className="font-mono text-label text-muted-foreground">
          Submitted Jan 28, 2026
        </span>
      </div>
      <h1 className="font-doto font-bold text-3xl text-foreground sm:text-4xl">
        Fluid Dynamics in Microgravity
      </h1>
      <p className="text-sm text-muted-foreground">
        <Link
          href="/profile/c-laurent"
          className="text-secondary-foreground transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          by C. Laurent
        </Link>
        {" · "}
        <span className="font-mono">Fluid Dynamics Challenge</span>
      </p>
    </div>
  );
}
