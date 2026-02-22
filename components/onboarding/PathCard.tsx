import Link from "next/link";

interface PathCardProps {
  icon: string;
  title: string;
  description: string;
  cta: string;
  note: string;
  href: string;
}

export default function PathCard({
  icon,
  title,
  description,
  cta,
  note,
  href,
}: PathCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between border-t border-[#4ade80] bg-[#111] p-6 transition-colors hover:bg-[#141414] h-full"
    >
      <div className="flex flex-col gap-3">
        <span className="text-sm text-[#555] group-hover:text-[#4ade80] transition-colors">
          {icon}
        </span>
        <h2 className="text-[22px] font-normal leading-snug tracking-tight text-white">
          {title}
        </h2>
        <p className="text-[13px] leading-relaxed text-[#777]">{description}</p>
      </div>

      <div className="mt-8 flex flex-col gap-1.5">
        <span className="text-[13px] font-medium text-white">{cta}</span>
        <span
          className="text-[9px] uppercase tracking-widest text-[#3a3a3a]"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          {note}
        </span>
      </div>
    </Link>
  );
}
