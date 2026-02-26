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
        <Avatar className="h-8 w-8 shrink-0 border border-[#3a3a3a]">
          <AvatarFallback className="bg-[#1c1c1c] font-mono text-label text-white">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-white">{author}</span>
            <span className="font-mono text-label text-[#888]">{time}</span>
          </div>
          <p className="text-xs leading-relaxed text-[#999]">{text}</p>
        </div>
      </div>
      {!isLast && <div className="border-t border-[#2a2a2a]" />}
    </div>
  );
}
