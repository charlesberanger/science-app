type Status = "pending" | "approved" | "rejected";

interface SubmissionStatusBannerProps {
  status?: Status;
}

const CONFIG = {
  pending: {
    bg: "bg-[#1f1a0a]",
    border: "border-[#fcd34d]",
    iconBorder: "border-[#fcd34d]",
    iconColor: "text-[#fcd34d]",
    icon: "⏳",
    title: "Awaiting Admin Approval",
    description: "Your submission is in the review queue. Review typically takes 24–48 hours.",
  },
  approved: {
    bg: "bg-[#0a1f0a]",
    border: "border-[#4ade80]",
    iconBorder: "border-[#4ade80]",
    iconColor: "text-[#4ade80]",
    icon: "✓",
    title: "Approved — Project is live!",
    description: "Your submission has been approved and is now visible on the leaderboard.",
  },
  rejected: {
    bg: "bg-[#1f0a0a]",
    border: "border-[#f87171]",
    iconBorder: "border-[#f87171]",
    iconColor: "text-[#f87171]",
    icon: "✕",
    title: "Submission Rejected",
    description: "Your project did not meet challenge criteria. Review feedback and resubmit.",
  },
};

export default function SubmissionStatusBanner({ status = "pending" }: SubmissionStatusBannerProps) {
  const c = CONFIG[status];
  return (
    <div className={`flex items-center gap-4 border px-5 py-6 ${c.bg} ${c.border}`}>
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${c.bg} ${c.iconBorder}`}>
        <span className={`text-2xl ${c.iconColor}`}>{c.icon}</span>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-bold tracking-tight text-white">{c.title}</p>
        <p className="text-xs leading-relaxed text-[#999]">{c.description}</p>
      </div>
    </div>
  );
}
