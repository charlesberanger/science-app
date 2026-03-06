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
    <div id="comments" className="rounded border border-border bg-card">
      <div className="border-b border-border px-5 py-3">
        <span
          className="font-mono text-label text-muted-foreground"
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
        <form onSubmit={handleSubmit} className="border-t border-border p-5">
          <label htmlFor="comment-input" className="sr-only">Add a comment</label>
          <textarea
            id="comment-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add a comment…"
            rows={3}
            className="w-full resize-none border border-border bg-background px-3.5 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground outline-none focus-visible:border-feedback-success transition-colors"
          />
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              disabled={!draft.trim()}
              className="font-mono border border-border bg-secondary px-4 py-2 text-ui text-secondary-foreground transition-colors hover:border-feedback-success hover:text-feedback-success disabled:opacity-30 disabled:pointer-events-none"
            >
              Post →
            </button>
          </div>
        </form>
      ) : (
        <div className="border-t border-border px-5 py-4">
          <p className="font-mono text-ui text-muted-foreground">
            <a href="/auth/sign-in" className="text-muted-foreground hover:text-secondary-foreground transition-colors">Sign in</a>
            {" "}to leave a comment
          </p>
        </div>
      )}
    </div>
  );
}
