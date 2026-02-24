const STEPS = [
  { label: "CREATE ACCOUNT", descriptor: "Email or SSO" },
  { label: "BUILD PROFILE",  descriptor: "Name, bio, photo" },
  { label: "UPLOAD",         descriptor: "CAD file + notes" },
  { label: "AWAIT REVIEW",   descriptor: "24–48h turnaround" },
];

type Mode = "preview" | "progress";

function StepDot({
  step,
  index,
  status,
  mode,
}: {
  step: { label: string; descriptor: string };
  index: number;
  status: "completed" | "current" | "pending";
  mode: Mode;
}) {
  const isPreview = mode === "preview";

  const borderColor = isPreview
    ? "border-[#2a2a2a]"
    : status === "completed"
      ? "border-[#4ade80]"
      : status === "current"
        ? "border-[#f0b840]"
        : "border-[#2a2a2a]";

  const textColor = isPreview
    ? "text-[#444]"
    : status === "completed"
      ? "text-[#4ade80]"
      : status === "current"
        ? "text-[#f0b840]"
        : "text-[#3a3a3a]";

  const labelColor = isPreview
    ? "text-[#444]"
    : status === "completed"
      ? "text-[#555]"
      : status === "current"
        ? "text-[#f0b840]"
        : "text-[#555]";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`flex h-6 w-6 items-center justify-center border bg-[#1c1c1c] ${borderColor}`}>
        <span
          className={`text-[9px] font-medium ${textColor}`}
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          {!isPreview && status === "completed"
            ? "✓"
            : String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-col items-center gap-0.5">
        <span
          className={`text-[8px] uppercase tracking-widest ${labelColor}`}
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          {step.label}
        </span>
        {isPreview && (
          <span
            className="text-[8px] text-[#333]"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            {step.descriptor}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Stepper({
  currentStep = 0,
  mode = "progress",
}: {
  currentStep?: number;
  mode?: Mode;
}) {
  const steps = STEPS.map((step, i) => ({
    ...step,
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
          <StepDot step={step} index={i} status={step.status} mode={mode} />
          {i < steps.length - 1 && (
            <div
              className={`mb-6 h-px w-16 sm:w-24 ${
                mode === "progress" && i < currentStep
                  ? "bg-[#acffaf]"
                  : "bg-[#2a2a2a]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
