interface BadgeProps {
  label?: string;
}

export default function Badge({ label = "SUCCESS" }: BadgeProps) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-[#4ade80]/30 bg-[#4ade80]/10 px-3 py-1">
      <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
      <span
        className="text-[10px] font-medium tracking-widest text-[#4ade80]"
        style={{ fontFamily: "var(--font-dm-mono), monospace" }}
      >
        {label}
      </span>
    </div>
  );
}
