import { Badge } from "@/components/ui/badge";

type SubmissionStatus = "pending" | "approved" | "rejected";

interface MetaCell {
  label: string;
  value: string;
}

interface SubmissionSection {
  number: string;
  title: string;
  text: string;
}

interface SubmissionCardProps {
  title: string;
  submittedAt: string;
  status?: SubmissionStatus;
  meta: MetaCell[];
  tubeDesignDifferences: string;
  technicalRationale: string;
}

const STATUS_BADGE: Record<SubmissionStatus, { variant: "gold" | "success" | "destructive"; label: string }> = {
  pending:  { variant: "gold",        label: "PENDING REVIEW" },
  approved: { variant: "success",     label: "APPROVED" },
  rejected: { variant: "destructive", label: "REJECTED" },
};

const SECTIONS: SubmissionSection[] = [
  { number: "01", title: "Tube Design Differences", text: "" },
  { number: "02", title: "Technical Rationale & Physics Principles", text: "" },
];

export default function SubmissionCard({
  title,
  submittedAt,
  status = "pending",
  meta,
  tubeDesignDifferences,
  technicalRationale,
}: SubmissionCardProps) {
  const { variant, label } = STATUS_BADGE[status];

  const sections: SubmissionSection[] = [
    { ...SECTIONS[0], text: tubeDesignDifferences },
    { ...SECTIONS[1], text: technicalRationale },
  ];

  return (
    <div className="flex flex-col gap-5 border border-border bg-card py-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 px-4">
        <div className="flex flex-col gap-1.5">
          <p className="text-base font-bold tracking-tight text-foreground">{title}</p>
          <p className="font-mono text-label tracking-ui text-muted-foreground">{submittedAt}</p>
        </div>
        <Badge variant={variant} className="shrink-0">{label}</Badge>
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4">
        {meta.map((cell) => (
          <div
            key={cell.label}
            className="flex h-16 flex-col justify-center gap-1 border border-border bg-background px-4"
          >
            <span className="font-mono text-label uppercase tracking-ui text-muted-foreground">
              {cell.label}
            </span>
            <span className="text-sm text-foreground">{cell.value}</span>
          </div>
        ))}
      </div>

      {/* Submitted fields */}
      <div className="flex flex-col gap-3 px-4">
        {sections.map((section) => (
          <div key={section.number} className="border border-border bg-background p-4">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-label text-feedback-success tracking-ui">
                {section.number}
              </span>
              <span className="font-mono text-label font-semibold uppercase tracking-ui text-foreground">
                {section.title}
              </span>
            </div>
            <div className="mt-2 border-t border-border" />
            <p className="mt-2 text-sm leading-relaxed text-secondary-foreground line-clamp-3">
              {section.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
