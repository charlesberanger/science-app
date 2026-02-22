import Link from "next/link";

interface ProjectCardProps {
  title: string;
  author: string;
  votes: number;
  rank: number;
  href: string;
  imageSrc?: string;
}

export default function ProjectCard({
  title,
  author,
  votes,
  rank,
  href,
  imageSrc,
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col border border-[#2a2a2a] bg-[#0a0a0a] transition-colors hover:border-[#3a3a3a]"
    >
      {/* Thumbnail */}
      <div className="relative h-[112px] w-full overflow-hidden bg-[#1c1c1c]">
        {imageSrc && (
          <img
            src={imageSrc}
            alt={title}
            className="h-full w-full object-cover"
          />
        )}
        {/* Rank badge — bottom left */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full border border-[rgba(74,222,128,0.5)] bg-[rgba(4,18,8,0.7)] px-2 py-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
          <span
            className="text-[9px] tracking-widest text-[#4ade80]"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            #{rank}
          </span>
        </div>
        {/* Votes badge — bottom right */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 border border-[#3a3a3a] bg-[rgba(17,17,17,0.8)] px-2.5 py-0.5">
          <span
            className="text-[9px] text-[#777]"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            ▲ {votes.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-3">
        <p className="text-[13px] font-medium leading-snug text-white group-hover:text-[#ccc]">
          {title}
        </p>
        <div className="flex items-center gap-1.5">
          <div className="h-5 w-5 rounded-full bg-[#3a3a3a] shrink-0" />
          <span className="text-[11px] text-[#777]">{author}</span>
        </div>
      </div>
    </Link>
  );
}
