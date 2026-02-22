export default function ChallengeInfoBar() {
  return (
    <div className="relative border-t border-[#2a2a2a] bg-[#111] px-8 py-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <span
            className="text-[9px] uppercase tracking-widest text-[#555]"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            Current Challenge
          </span>
          <span className="text-[15px] font-bold text-white">
            Fluid Dynamics Challenge
          </span>
        </div>
        <span
          className="text-xs text-[#555]"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          $24,000 prize pool · 312 submissions · 46 days remaining
        </span>
      </div>
    </div>
  );
}
