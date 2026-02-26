import { Badge } from "@/components/ui/badge";

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

const STATUS_BADGE: Record<SubmissionStatus, { variant: "gold" | "success" | "destructive"; label: string }> = {
  pending:  { variant: "gold",        label: "PENDING REVIEW" },
  approved: { variant: "success",     label: "APPROVED" },
  rejected: { variant: "destructive", label: "REJECTED" },
};

export default function SubmissionCard({
  title,
  submittedAt,
  status = "pending",
  meta,
  description,
}: SubmissionCardProps) {
  const { variant, label } = STATUS_BADGE[status];

  return (
    <div className="flex flex-col gap-[18px] border border-[#2a2a2a] bg-[#111] py-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 px-4">
        <div className="flex flex-col gap-1.5">
          <p className="text-[15px] font-bold tracking-tight text-white">{title}</p>
          <p className="font-mono text-label tracking-ui text-[#888]">{submittedAt}</p>
        </div>
        <Badge variant={variant} className="shrink-0">{label}</Badge>
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4">
        {meta.map((cell) => (
          <div
            key={cell.label}
            className="flex h-16 flex-col justify-center gap-1 border border-[#2a2a2a] bg-[#0a0a0a] px-4"
          >
            <span className="font-mono text-label uppercase tracking-ui text-[#888]">
              {cell.label}
            </span>
            <span className="text-xs text-white">{cell.value}</span>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="px-4">
        <p className="text-[13px] leading-[1.65] text-[#888]">{description}</p>
      </div>
    </div>
  );
}
