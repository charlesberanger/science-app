import SeraLogo from "@/components/icons/SeraLogo";

interface HeadlineLine {
  text: string;
  style: "bold" | "italic";
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

      {/* Brand row — logos + eyebrow */}
      <div className="flex items-center justify-between px-14 pt-12">
        <div className="flex items-center gap-5">
          <SeraLogo className="h-5 w-auto text-foreground" />
          <div className="h-4 w-px bg-secondary" aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/cornell_logo.svg" alt="Cornell" className="h-6 w-auto" />
          <div className="h-4 w-px bg-secondary" aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/uat.svg" alt="UAT" className="h-6 w-auto" />
        </div>
        <div className="flex items-center gap-4">
          <div className="h-px w-6 bg-lime-400" />
          <span className="font-mono text-label text-muted-foreground">
            {eyebrow}
          </span>
        </div>
      </div>

      {/* Headline */}
      <div className="mt-auto flex flex-col px-14 leading-[0.92]">
        {headline.map((line) => (
          <span
            key={line.text}
            className={`font-doto font-bold text-7xl ${
              line.style === "bold"
                ? "text-foreground"
                : "text-muted-foreground"
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
