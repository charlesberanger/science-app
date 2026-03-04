import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface CommentBlockProps {
  author: string;
  time: string;
  text: string;
  initials?: string;
  isLast?: boolean;
}

export default function CommentBlock({
  author,
  time,
  text,
  initials = "?",
  isLast,
}: CommentBlockProps) {
  return (
    <div>
      <div className="flex gap-3 py-4">
        <Avatar className="h-8 w-8 shrink-0 border border-border">
          <AvatarFallback className="bg-secondary font-mono text-label text-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">{author}</span>
            <span className="font-mono text-label text-muted-foreground">{time}</span>
          </div>
          <p className="text-sm leading-relaxed text-secondary-foreground">{text}</p>
        </div>
      </div>
      {!isLast && <div className="border-t border-border" />}
    </div>
  );
}
