import CommentBlock from "./CommentBlock";

const comments = [
  {
    author: "Dr. Elena V.",
    time: "2h ago",
    text: "Impressive mesh refinement strategy. The RANS/LES switching criterion looks well-calibrated — have you benchmarked against DNS data at higher Reynolds numbers?",
  },
  {
    author: "Marcus T.",
    time: "5h ago",
    text: "The 3× speedup claim is bold. Can you share the hardware configuration? Would help contextualize the performance numbers against SOTA solvers.",
  },
  {
    author: "Priya K.",
    time: "1d ago",
    text: "Great work on the NACA validation. The boundary layer plots look clean. Minor note: Figure 4 axis label seems truncated in the PDF export.",
  },
];

export default function CommentsSection() {
  return (
    <div className="rounded border border-[#2a2a2a] bg-[#111]">
      <div className="border-b border-[#2a2a2a] px-5 py-3">
        <span
          className="text-[9px] tracking-widest text-[#555] uppercase"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          Comments
        </span>
      </div>
      <div className="px-5">
        {comments.map((c, i) => (
          <CommentBlock
            key={c.author}
            author={c.author}
            time={c.time}
            text={c.text}
            isLast={i === comments.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
