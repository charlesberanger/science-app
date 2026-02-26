"use client";

import { useState } from "react";
import CommentBlock from "./CommentBlock";
import { useAuth } from "@/contexts/AuthContext";

interface Comment {
  author: string;
  initials: string;
  time: string;
  text: string;
}

const INITIAL_COMMENTS: Comment[] = [
  {
    author: "Dr. Elena V.",
    initials: "EV",
    time: "2h ago",
    text: "Impressive mesh refinement strategy. The RANS/LES switching criterion looks well-calibrated — have you benchmarked against DNS data at higher Reynolds numbers?",
  },
  {
    author: "Marcus T.",
    initials: "MT",
    time: "5h ago",
    text: "The 3× speedup claim is bold. Can you share the hardware configuration? Would help contextualize the performance numbers against SOTA solvers.",
  },
  {
    author: "Priya K.",
    initials: "PK",
    time: "1d ago",
    text: "Great work on the NACA validation. The boundary layer plots look clean. Minor note: Figure 4 axis label seems truncated in the PDF export.",
  },
];

export default function CommentsSection() {
  const { isAuthenticated } = useAuth();
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [draft, setDraft] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setComments((prev) => [
      { author: "Alice S.", initials: "AS", time: "just now", text },
      ...prev,
    ]);
    setDraft("");
  }

  return (
    <div id="comments" className="rounded border border-[#2a2a2a] bg-[#111]">
      <div className="border-b border-[#2a2a2a] px-5 py-3">
        <span
          className="text-label tracking-ui text-[#888] uppercase"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          Comments ({comments.length})
        </span>
      </div>

      <div className="px-5">
        {comments.map((c, i) => (
          <CommentBlock
            key={`${c.author}-${i}`}
            author={c.author}
            initials={c.initials}
            time={c.time}
            text={c.text}
            isLast={i === comments.length - 1 && !isAuthenticated}
          />
        ))}
      </div>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="border-t border-[#2a2a2a] p-5">
          <label htmlFor="comment-input" className="sr-only">Add a comment</label>
          <textarea
            id="comment-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add a comment…"
            rows={3}
            className="w-full resize-none border border-[#2a2a2a] bg-[#0a0a0a] px-3.5 py-3 text-[13px] leading-relaxed text-white placeholder-[#555] outline-none focus-visible:border-[#4ade80] transition-colors"
          />
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              disabled={!draft.trim()}
              className="border border-[#2a2a2a] bg-[#1c1c1c] px-4 py-2 text-[11px] text-[#999] transition-colors hover:border-[#4ade80] hover:text-[#4ade80] disabled:opacity-30 disabled:pointer-events-none"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              Post →
            </button>
          </div>
        </form>
      ) : (
        <div className="border-t border-[#2a2a2a] px-5 py-4">
          <p className="text-[11px] text-[#888]" style={{ fontFamily: "var(--font-dm-mono), monospace" }}>
            <a href="/auth/sign-in" className="text-[#888] hover:text-[#999] transition-colors">Sign in</a>
            {" "}to leave a comment
          </p>
        </div>
      )}
    </div>
  );
}
