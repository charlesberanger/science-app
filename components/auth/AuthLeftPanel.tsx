import Link from "next/link";
import ScienceLogo from "@/components/icons/ScienceLogo";

interface HeadlineLine {
  text: string;
  style: "bold" | "italic";
}

interface Stat {
  value: string;
  label: string;
  highlight?: boolean;
}

interface AuthLeftPanelProps {
  eyebrow: string;
  headline: HeadlineLine[];
  description: string;
  footer: React.ReactNode;
}

export default function AuthLeftPanel({
  eyebrow,
  headline,
  description,
  footer,
}: AuthLeftPanelProps) {
  return (
    <div className="relative hidden min-h-screen flex-1 flex-col overflow-hidden bg-card lg:flex">
      {/* Lime top border */}
      <div className="absolute left-0 top-0 h-0.5 w-full bg-lime-400" />
      {/* Right divider */}
      <div className="absolute right-0 top-0 h-full w-px bg-secondary" />

      {/* Brand row */}
      <div className="flex items-center justify-between px-14 pt-12">
        <Link href="/get-started" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center bg-black">
            <ScienceLogo className="h-5 w-5" />
          </div>
          <span className="font-mono text-ui text-secondary-foreground">
            SCIENCE
          </span>
        </Link>
        <div className="border border-feedback-success/30 bg-feedback-status-success/80 px-3 py-1.5">
          <span className="font-mono text-label text-lime-400">
            FLUID DYNAMICS CHALLENGE
          </span>
        </div>
      </div>

      {/* Eyebrow */}
      <div className="mt-auto flex items-center gap-4 px-14 pb-4">
        <div className="h-px w-6 bg-lime-400" />
        <span className="font-mono text-label text-muted-foreground">
          {eyebrow}
        </span>
      </div>

      {/* Headline */}
      <div className="flex flex-col px-14 leading-[0.92] tracking-[-3.6px]">
        {headline.map((line) => (
          <span
            key={line.text}
            className={`text-7xl ${
              line.style === "bold"
                ? "font-doto font-bold text-foreground"
                : "font-light italic text-muted-foreground"
            }`}
          >
            {line.text}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="mt-6 px-14 text-base font-light leading-[1.68] text-secondary-foreground">
        {description}
      </p>

      {/* Footer slot */}
      <div className="mt-auto pb-12">{footer}</div>
    </div>
  );
}
