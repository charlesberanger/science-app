import UserAvatar from "@/components/ui/UserAvatar";

interface CommentBlockProps {
  author: string;
  time: string;
  text: string;
  isLast?: boolean;
}

export default function CommentBlock({
  author,
  time,
  text,
  isLast,
}: CommentBlockProps) {
  return (
    <div>
      <div className="flex gap-3 py-4">
        <UserAvatar name={author} size="sm" />
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">
              {author}
            </span>
            <span className="font-mono text-label text-muted-foreground">
              {time}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-secondary-foreground">
            {text}
          </p>
        </div>
      </div>
      {!isLast && <div className="border-t border-border" />}
    </div>
  );
}
