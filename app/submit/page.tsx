"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";

const TYPES = [
  {
    id: "fluid-dynamics",
    label: "Fluid Dynamics",
    description: "Microgravity fluid containment · tube design · CAD required",
  },
  {
    id: "cellular-biology",
    label: "Cellular Biology",
    description: "Cell-line morphology · ISS incubation · coming soon",
    disabled: true,
  },
];

export default function SubmitPage() {
  const [selected, setSelected] = useState("");
  const router = useRouter();

  return (
    <AppShell>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Submit Project
        </h1>
        <p className="font-mono text-label uppercase tracking-ui text-[#555]">
          Step 1 of 4 · Select project type
        </p>
      </div>

      <div className="h-px bg-[#2a2a2a]" />

      <div className="flex flex-col gap-3">
        {TYPES.map((t) => (
          <button
            key={t.id}
            disabled={t.disabled}
            onClick={() => setSelected(t.id)}
            className={`flex items-start justify-between border p-5 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
              selected === t.id
                ? "border-[#4ade80] bg-[#4ade80]/5"
                : "border-[#2a2a2a] bg-[#111] hover:border-[#3a3a3a]"
            }`}
          >
            <div className="flex flex-col gap-1">
              <span
                className={`text-sm font-semibold ${
                  selected === t.id ? "text-[#4ade80]" : "text-white"
                }`}
              >
                {t.label}
              </span>
              <span className="font-mono text-label text-[#555]">{t.description}</span>
            </div>
            <div
              className={`mt-0.5 h-4 w-4 shrink-0 rounded-full border transition-colors ${
                selected === t.id ? "border-[#4ade80] bg-[#4ade80]" : "border-[#3a3a3a]"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          disabled={!selected}
          onClick={() => router.push(`/submit/${selected}`)}
          className="border border-[#4ade80] bg-[#4ade80] px-6 py-2.5 font-mono text-[11px] uppercase tracking-ui text-black transition-colors hover:bg-[#6ee7a0] disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next: Eligibility →
        </button>
      </div>
    </AppShell>
  );
}
