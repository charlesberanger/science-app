type SubmissionStatus = "pending" | "approved" | "rejected";

interface MetaCell {
  label: string;
  value: string;
}

interface SubmissionCardProps {
  title: string;
  submittedAt: string;
  status?: SubmissionStatus;
  meta: MetaCell[];
  description: string;
}

const STATUS_CONFIG = {
  pending: {
    dot: "bg-[#fcd34d]",
    text: "text-[#fcd34d]",
    border: "border-[#fcd34d]/50",
    bg: "bg-[#1a1300]/60",
    label: "PENDING REVIEW",
  },
  approved: {
    dot: "bg-[#4ade80]",
    text: "text-[#4ade80]",
    border: "border-[#4ade80]/50",
    bg: "bg-[#041208]/60",
    label: "APPROVED",
  },
  rejected: {
    dot: "bg-[#f87171]",
    text: "text-[#f87171]",
    border: "border-[#f87171]/50",
    bg: "bg-[#120404]/60",
    label: "REJECTED",
  },
};

export default function SubmissionCard({
  title,
  submittedAt,
  status = "pending",
  meta,
  description,
}: SubmissionCardProps) {
  const s = STATUS_CONFIG[status];

  return (
    <div className="flex flex-col gap-[18px] border border-[#2a2a2a] bg-[#111] py-6">
      {/* Header row */}
      <div className="flex items-start justify-between gap-4 px-4">
        <div className="flex flex-col gap-1.5">
          <p
            className="text-[15px] font-bold tracking-tight text-white"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            {title}
          </p>
          <p
            className="text-[10px] tracking-[0.06em] text-[#555]"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            {submittedAt}
          </p>
        </div>

        {/* Status badge */}
        <div
          className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 ${s.bg} ${s.border}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
          <span
            className={`text-[9px] tracking-[0.12em] ${s.text}`}
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            {s.label}
          </span>
        </div>
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4">
        {meta.map((cell) => (
          <div
            key={cell.label}
            className="flex h-16 flex-col justify-center gap-1 border border-[#2a2a2a] bg-[#0a0a0a] px-4"
          >
            <span
              className="text-[9px] uppercase tracking-[0.16em] text-[#555]"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              {cell.label}
            </span>
            <span
              className="text-xs text-white"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              {cell.value}
            </span>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="px-4">
        <p
          className="text-[13px] leading-[1.65] text-[#555]"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
