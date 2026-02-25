"use client";

import { useState, useRef, useEffect } from "react";

const SHARE_URL = "https://science.app/project/fluid-dynamics-challenge/87a3f";

export default function ShareLink() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  function handleCopy() {
    navigator.clipboard.writeText(SHARE_URL).then(() => {
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="rounded border border-[#2a2a2a] bg-[#111] p-5">
      <span
        className="text-label tracking-ui text-[#555] uppercase"
        style={{ fontFamily: "var(--font-dm-mono), monospace" }}
      >
        Share Project
      </span>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-0">
        <input
          type="text"
          readOnly
          value={SHARE_URL}
          className="flex-1 rounded border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-[11px] text-[#555] outline-none sm:rounded-r-none"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        />
        <button
          onClick={handleCopy}
          className={`rounded border px-4 py-2 text-[11px] transition-colors sm:rounded-l-none sm:border-l-0 ${
            copied
              ? "border-[#4ade80] bg-[#4ade80]/10 text-[#4ade80]"
              : "border-[#2a2a2a] bg-[#1c1c1c] text-[#999] hover:bg-[#2a2a2a] hover:text-white"
          }`}
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          {copied ? "Copied ✓" : "Copy link"}
        </button>
      </div>
      <p className="mt-2 text-label text-[#333]" style={{ fontFamily: "var(--font-dm-mono), monospace" }}>
        Anyone with this link can view this project submission
      </p>
    </div>
  );
}
