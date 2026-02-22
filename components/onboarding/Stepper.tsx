const STEP_LABELS = ["SIGN IN", "INTENT", "PROFILE", "SUBMIT", "REVIEW"];

function StepDot({
  step,
  index,
  status,
}: {
  step: string;
  index: number;
  status: "completed" | "current" | "pending";
}) {
  const borderColor =
    status === "completed"
      ? "border-[#4ade80]"
      : status === "current"
        ? "border-[#f0b840]"
        : "border-[#2a2a2a]";

  const textColor =
    status === "completed"
      ? "text-[#4ade80]"
      : status === "current"
        ? "text-[#f0b840]"
        : "text-[#3a3a3a]";

  const labelColor =
    status === "completed"
      ? "text-[#555]"
      : status === "current"
        ? "text-[#f0b840]"
        : "text-[#555]";

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`flex h-6 w-6 items-center justify-center border bg-[#1c1c1c] ${borderColor}`}
      >
        <span
          className={`text-[9px] font-medium ${textColor}`}
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          {status === "completed" ? "✓" : String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <span
        className={`text-[8px] uppercase tracking-widest ${labelColor}`}
        style={{ fontFamily: "var(--font-dm-mono), monospace" }}
      >
        {step}
      </span>
    </div>
  );
}

export default function Stepper({ currentStep = 1 }: { currentStep?: number }) {
  const steps = STEP_LABELS.map((label, i) => ({
    label,
    status:
      i < currentStep
        ? ("completed" as const)
        : i === currentStep
          ? ("current" as const)
          : ("pending" as const),
  }));

  return (
    <div className="flex items-start">
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center">
          <StepDot step={step.label} index={i} status={step.status} />
          {i < steps.length - 1 && (
            <div
              className={`mb-4 h-px w-16 sm:w-24 ${
                i === 0 ? "bg-[#acffaf]" : "bg-[#2a2a2a]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
