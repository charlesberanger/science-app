export default function RightCol() {
  return (
    <div className="flex flex-col gap-0 rounded border border-[#2a2a2a] bg-[#111]">
      {/* Challenge info */}
      <div className="p-5">
        <span
          className="text-[9px] tracking-widest text-[#555] uppercase"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          Challenge
        </span>
        <h2 className="mt-2 text-sm font-semibold leading-snug text-white">
          Fluid Dynamics Challenge
        </h2>
        <p className="mt-1 text-xs text-[#555]">Turbulent Boundary Layer Modelling Track</p>

        <div className="mt-4 flex flex-col gap-3">
          <div className="flex flex-col gap-0.5">
            <span
              className="text-[9px] tracking-widest text-[#333] uppercase"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              Prize Pool
            </span>
            <span className="text-sm font-semibold text-[#4ade80]">$25,000</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span
              className="text-[9px] tracking-widest text-[#333] uppercase"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              Deadline
            </span>
            <span className="text-xs text-[#999]">April 12, 2025 — 23:59 UTC</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span
              className="text-[9px] tracking-widest text-[#333] uppercase"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              Submissions
            </span>
            <span className="text-xs text-[#999]">312 total · 87 active teams</span>
          </div>
        </div>
      </div>

      <div className="border-t border-[#2a2a2a]" />

      {/* Discussion */}
      <div className="p-5">
        <span
          className="text-[9px] tracking-widest text-[#555] uppercase"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          Discussion (12)
        </span>
        <div className="mt-3 flex flex-col gap-2">
          {["Mesh refinement trade-offs", "Memory vs speed benchmarks", "NACA validation dataset"].map((t) => (
            <div
              key={t}
              className="cursor-pointer text-xs text-[#555] transition-colors hover:text-[#999]"
            >
              → {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
