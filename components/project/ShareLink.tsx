export default function ShareLink() {
  return (
    <div className="rounded border border-[#2a2a2a] bg-[#111] p-5">
      <span
        className="text-[9px] tracking-widest text-[#555] uppercase"
        style={{ fontFamily: "var(--font-dm-mono), monospace" }}
      >
        Share Project
      </span>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-0">
        <input
          type="text"
          readOnly
          value="https://science.app/project/fluid-dynamics-challenge/87a3f"
          className="flex-1 rounded border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-[11px] text-[#555] outline-none sm:rounded-r-none"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        />
        <button
          className="rounded border border-[#2a2a2a] bg-[#1c1c1c] px-4 py-2 text-[11px] text-[#999] transition-colors hover:bg-[#2a2a2a] hover:text-white sm:rounded-l-none sm:border-l-0"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          Copy link
        </button>
      </div>
      <p className="mt-2 text-[10px] text-[#333]" style={{ fontFamily: "var(--font-dm-mono), monospace" }}>
        Anyone with this link can view this project submission
      </p>
    </div>
  );
}
