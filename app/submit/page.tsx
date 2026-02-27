"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import SubmitStepBar from "@/components/submit/SubmitStepBar";

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
      <SubmitStepBar current={1} />

      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Submit Project
        </h1>
        <p className="font-mono text-label uppercase tracking-ui text-muted-foreground">
          Step 1 of 5 · Select project type
        </p>
      </div>

      <div className="h-px bg-secondary" />

      <div className="flex flex-col gap-3">
        {TYPES.map((t) => (
          <button
            key={t.id}
            disabled={t.disabled}
            onClick={() => setSelected(t.id)}
            className={`flex items-start justify-between border p-5 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
              selected === t.id
                ? "border-feedback-success bg-feedback-success/5"
                : "border-border bg-card hover:border-border"
            }`}
          >
            <div className="flex flex-col gap-1">
              <span
                className={`text-sm font-semibold ${
                  selected === t.id ? "text-feedback-success" : "text-foreground"
                }`}
              >
                {t.label}
              </span>
              <span className="font-mono text-label text-muted-foreground">{t.description}</span>
            </div>
            <div
              className={`mt-0.5 h-4 w-4 shrink-0 rounded-full border transition-colors ${
                selected === t.id ? "border-feedback-success bg-feedback-success" : "border-border"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          disabled={!selected}
          onClick={() => router.push(`/submit/${selected}`)}
          className="border border-feedback-success bg-feedback-success px-6 py-2.5 font-mono text-[11px] uppercase tracking-ui text-black transition-colors hover:bg-feedback-success-hover disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next: Eligibility →
        </button>
      </div>
    </AppShell>
  );
}
