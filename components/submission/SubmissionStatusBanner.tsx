type Status = "pending" | "approved" | "rejected";

interface SubmissionStatusBannerProps {
  status?: Status;
}

const CONFIG = {
  pending: {
    bg: "bg-feedback-status-warning",
    border: "border-feedback-warning",
    iconBorder: "border-feedback-warning",
    iconColor: "text-feedback-warning",
    icon: "⏳",
    title: "Awaiting Admin Approval",
    description:
      "Your submission is in the review queue. It will appear on Browse and Leaderboard once approved. Review typically takes 24–48 hours.",
  },
  approved: {
    bg: "bg-feedback-status-success",
    border: "border-feedback-success",
    iconBorder: "border-feedback-success",
    iconColor: "text-feedback-success",
    icon: "✓",
    title: "Approved — Project is live!",
    description:
      "Your submission has been approved and is now visible on the leaderboard.",
  },
  rejected: {
    bg: "bg-feedback-status-error",
    border: "border-destructive",
    iconBorder: "border-destructive",
    iconColor: "text-destructive",
    icon: "✕",
    title: "Submission Rejected",
    description:
      "Your project did not meet challenge criteria. Review feedback and resubmit.",
  },
};

export default function SubmissionStatusBanner({
  status = "pending",
}: SubmissionStatusBannerProps) {
  const c = CONFIG[status];
  return (
    <div
      className={`flex items-center gap-4 border px-5 py-6 ${c.bg} ${c.border}`}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${c.bg} ${c.iconBorder}`}
      >
        <span className={`text-2xl ${c.iconColor}`}>{c.icon}</span>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-bold tracking-tight text-foreground">
          {c.title}
        </p>
        <p className="text-sm leading-relaxed text-secondary-foreground">
          {c.description}
        </p>
      </div>
    </div>
  );
}
