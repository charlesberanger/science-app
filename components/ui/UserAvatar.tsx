import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

/** Deterministic hue from a string — stays in 100–160° (green/lime spectrum). */
function nameToHue(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (Math.imul(31, h) + name.charCodeAt(i)) | 0;
  }
  return 100 + (Math.abs(h) % 60);
}

/** Extract initials from a full name — up to 2 characters. */
function initials(name: string): string {
  return name
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
}

interface UserAvatarProps {
  name: string;
  src?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "h-8 w-8 text-[11px]",
  md: "h-10 w-10 text-xs",
  lg: "h-13 w-13 text-sm",
};

/**
 * Displays a user avatar with a deterministic colour-coded fallback.
 * Always shows initials if no src is provided or if the image fails to load.
 */
export default function UserAvatar({ name, src, size = "md", className }: UserAvatarProps) {
  const hue = nameToHue(name);
  const abbr = initials(name);

  return (
    <Avatar className={cn("rounded-none shrink-0", sizes[size], className)}>
      {src && <AvatarImage src={src} alt={name} className="object-cover" />}
      <AvatarFallback
        className="rounded-none font-mono font-medium"
        style={{
          background: `hsl(${hue}, 20%, 14%)`,
          color: `hsl(${hue}, 70%, 65%)`,
          border: `1px solid hsl(${hue}, 30%, 22%)`,
        }}
      >
        {abbr}
      </AvatarFallback>
    </Avatar>
  );
}
