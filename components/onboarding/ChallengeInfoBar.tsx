export default function ChallengeInfoBar() {
  return (
    <div className="relative border-t border-border bg-card px-8 py-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <span
            className="font-mono text-label uppercase tracking-ui text-muted-foreground"
          >
            Current Challenge
          </span>
          <span className="text-base font-bold text-foreground">
            Fluid Dynamics Challenge
          </span>
        </div>
        <span
          className="font-mono text-sm text-feedback-success"
        >
          $24,000 prize pool · 312 submissions · 46 days remaining
        </span>
      </div>
    </div>
  );
}
