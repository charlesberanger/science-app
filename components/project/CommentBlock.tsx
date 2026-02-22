import Avatar from "@/components/ui/Avatar";

interface CommentBlockProps {
  author: string;
  time: string;
  text: string;
  isLast?: boolean;
}

export default function CommentBlock({ author, time, text, isLast }: CommentBlockProps) {
  return (
    <div>
      <div className="flex gap-3 py-4">
        <Avatar />
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-white">{author}</span>
            <span
              className="text-[10px] text-[#333]"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              {time}
            </span>
          </div>
          <p className="text-xs leading-relaxed text-[#999]">{text}</p>
        </div>
      </div>
      {!isLast && <div className="border-t border-[#2a2a2a]" />}
    </div>
  );
}
