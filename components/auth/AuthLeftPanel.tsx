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
    <div className="relative hidden min-h-screen flex-1 flex-col overflow-hidden bg-[#111] lg:flex">
      {/* Lime top border */}
      <div className="absolute left-0 top-0 h-0.5 w-full bg-[#acffaf]" />
      {/* Right divider */}
      <div className="absolute right-0 top-0 h-full w-px bg-[#1c1c1c]" />

      {/* Brand row */}
      <div className="flex items-center justify-between px-14 pt-12">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center bg-black">
            <ScienceLogo className="h-5 w-5" />
          </div>
          <span className="font-mono text-[11px] tracking-ui text-[#777]">
            SCIENCE
          </span>
        </div>
        <div className="border border-[rgba(31,92,34,0.5)] bg-[rgba(7,18,9,0.8)] px-3 py-1.5">
          <span className="font-mono text-label tracking-ui text-[#acffaf]">
            FLUID DYNAMICS CHALLENGE
          </span>
        </div>
      </div>

      {/* Eyebrow */}
      <div className="mt-auto flex items-center gap-4 px-14 pb-4">
        <div className="h-px w-6 bg-[#acffaf]" />
        <span className="font-mono text-label tracking-ui text-[#555]">
          {eyebrow}
        </span>
      </div>

      {/* Headline */}
      <div className="flex flex-col px-14 leading-[0.92] tracking-[-3.6px]">
        {headline.map((line, i) => (
          <span
            key={i}
            className={`text-[72px] ${
              line.style === "bold"
                ? "font-bold text-white"
                : "font-light italic text-[#555]"
            }`}
          >
            {line.text}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="mt-6 px-14 text-[15px] font-light leading-[1.68] text-[#777]">
        {description}
      </p>

      {/* Footer slot */}
      <div className="mt-auto pb-12">{footer}</div>
    </div>
  );
}
