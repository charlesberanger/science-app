const STEPS = ["Eligibility", "Details", "CAD Upload", "Review"];

export default function SubmitStepBar({ current }: { current: number }) {
  // current is 1-indexed
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((label, i) => {
        const idx = i + 1;
        const done = idx < current;
        const active = idx === current;
        return (
          <div key={label} className="flex flex-1 items-center">
            <div
              className={`flex flex-1 flex-col gap-1 border-t-2 pt-2 ${
                done
                  ? "border-[#4ade80]"
                  : active
                    ? "border-[#acffaf]"
                    : "border-[#2a2a2a]"
              }`}
            >
              <span
                className={`font-mono text-label uppercase tracking-ui ${
                  done
                    ? "text-[#4ade80]"
                    : active
                      ? "text-white"
                      : "text-[#888]"
                }`}
              >
                {done ? "✓ " : `${idx < 10 ? "0" : ""}${idx} · `}
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
