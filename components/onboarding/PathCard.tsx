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
      className="group flex min-h-[440px] flex-col justify-between border-t border-[#4ade80] bg-[#111] p-10 transition-colors hover:bg-[#141414]"
    >
      <div className="flex flex-col gap-5">
        <span className="text-5xl text-[#555] transition-colors group-hover:text-[#4ade80]">
          {icon}
        </span>
        <div className="flex flex-col gap-2">
          <h2 className="text-[22px] font-normal leading-snug tracking-tight text-white">
            {title}
          </h2>
          <p className="text-[13px] leading-relaxed text-[#777]">{description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-[13px] font-medium text-white">{cta}</span>
        <span
          className="text-label uppercase tracking-ui text-[#3a3a3a]"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          {note}
        </span>
      </div>
    </Link>
  );
}
