import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  author: string;
  votes: number;
  rank: number;
  href: string;
  imageSrc?: string;
  description?: string;
}

export default function ProjectCard({
  title,
  author,
  votes,
  rank,
  href,
  imageSrc,
  description,
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col border border-border bg-background transition-colors hover:border-border"
    >
      {/* Thumbnail */}
      <div className="relative h-[112px] w-full overflow-hidden bg-secondary">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-border">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <rect x="8" y="14" width="16" height="12" rx="0" stroke="currentColor" strokeWidth="1.2" />
              <path d="M8 14L16 9L24 14" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M16 9V21" stroke="currentColor" strokeWidth="1.2" />
              <path d="M8 14L16 19L24 14" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />
            </svg>
          </div>
        )}
        {/* Hover description overlay */}
        {description && (
          <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <p
              className="px-3 pb-3 pt-6 text-ui leading-relaxed text-white/90"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              {description.length > 90 ? description.slice(0, 90) + "…" : description}
            </p>
          </div>
        )}

        {/* Rank badge — bottom left, fades on hover */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full border border-[rgba(74,222,128,0.5)] bg-[rgba(4,18,8,0.7)] px-2 py-0.5 transition-opacity duration-200 group-hover:opacity-0">
          <span className="h-1.5 w-1.5 rounded-full bg-feedback-success" />
          <span
            className="text-label tracking-ui text-feedback-success"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            #{rank}
          </span>
        </div>
        {/* Votes badge — bottom right, fades on hover */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 border border-border bg-[rgba(17,17,17,0.8)] px-2.5 py-0.5 transition-opacity duration-200 group-hover:opacity-0">
          <span
            className="text-label text-secondary-foreground"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            ▲ {votes.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-3">
        <p className="text-sm font-medium leading-snug text-foreground group-hover:text-secondary-foreground">
          {title}
        </p>
        <div className="flex items-center gap-1.5">
          <div className="h-5 w-5 rounded-full bg-secondary shrink-0" />
          <span className="text-ui text-secondary-foreground">{author}</span>
        </div>
      </div>
    </Link>
  );
}
