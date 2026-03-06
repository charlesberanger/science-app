import Link from "next/link";
import Image from "next/image";
import FlowFieldCover from "@/components/ui/FlowFieldCover";

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
          <FlowFieldCover seed={title} className="h-full w-full" />
        )}
        {/* Hover description overlay */}
        {description && (
          <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <p className="line-clamp-3 px-3 pb-3 pt-6 text-ui leading-relaxed text-white/90">
              {description}
            </p>
          </div>
        )}

        {/* Rank badge — bottom left, fades on hover */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full border border-feedback-success/50 bg-feedback-status-success/70 px-2 py-0.5 transition-opacity duration-200 group-hover:opacity-0">
          <span className="h-1.5 w-1.5 rounded-full bg-feedback-success" />
          <span
            className="font-mono text-label text-feedback-success"
          >
            #{rank}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-3">
        <p className="text-sm font-medium leading-snug text-foreground group-hover:text-secondary-foreground">
          {title}
        </p>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="h-5 w-5 rounded-full bg-secondary shrink-0" aria-hidden="true" />
            <span className="truncate text-ui text-secondary-foreground">{author}</span>
          </div>
          <div className="flex items-center gap-1 shrink-0 text-feedback-success">
            <span className="text-xs leading-none">▲</span>
            <span className="text-sm font-bold tabular-nums leading-none">{votes.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
