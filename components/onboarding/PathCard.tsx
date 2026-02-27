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
      className="group flex min-h-[440px] flex-col justify-between border-t border-feedback-success bg-card p-10 transition-colors hover:bg-secondary"
    >
      <div className="flex flex-col gap-5">
        <span className="text-5xl text-muted-foreground transition-colors group-hover:text-feedback-success">
          {icon}
        </span>
        <div className="flex flex-col gap-2">
          <h2 className="text-[22px] font-normal leading-snug tracking-tight text-foreground">
            {title}
          </h2>
          <p className="text-[13px] leading-relaxed text-secondary-foreground">{description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-[13px] font-medium text-foreground">{cta}</span>
        <span
          className="text-label uppercase tracking-ui text-muted-foreground"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          {note}
        </span>
      </div>
    </Link>
  );
}
