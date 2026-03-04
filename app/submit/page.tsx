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
    badge: "LIVE · OPEN",
    badgeActive: true,
    specs: [
      { key: "FORMAT", value: "STL · OBJ · STEP · IGES" },
      { key: "SPEC", value: "1.5 mL microfuge tube · 1:1 scale" },
      { key: "PRIZE", value: "$24,000 · Deadline APR 12, 2026" },
      { key: "TEAM", value: "1–3 members · SERA nations" },
    ],
  },
  {
    id: "cellular-biology",
    label: "Cellular Biology",
    description: "Cell-line morphology · ISS incubation",
    badge: "COMING SOON",
    badgeActive: false,
    disabled: true,
    specs: [] as { key: string; value: string }[],
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
        {TYPES.map((t, i) => (
          <button
            key={t.id}
            disabled={t.disabled}
            onClick={() => !t.disabled && setSelected(t.id)}
            style={{ animationDelay: `${i * 80}ms` }}
            className={`animate-enter group relative w-full appearance-none flex flex-col border text-left transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
              selected === t.id
                ? "border-feedback-success bg-feedback-success/5"
                : "border-border bg-card"
            }`}
          >
            {/* Left accent bar */}
            <div
              className={`absolute inset-y-0 left-0 w-0.5 transition-colors ${
                selected === t.id
                  ? "bg-feedback-success"
                  : "bg-transparent group-hover:bg-feedback-success/30"
              }`}
            />

            {/* Header */}
            <div className="flex items-start justify-between px-5 pb-4 pt-5">
              <div className="flex flex-col gap-2">
                <span
                  className={`inline-flex w-fit border px-2 py-0.5 font-mono text-label uppercase tracking-ui ${
                    t.badgeActive
                      ? "border-feedback-success/30 bg-feedback-success/5 text-feedback-success"
                      : "border-border bg-secondary text-muted-foreground"
                  }`}
                >
                  {t.badge}
                </span>
                <span
                  className={`text-xl font-bold tracking-tight ${
                    selected === t.id ? "text-feedback-success" : "text-foreground"
                  }`}
                >
                  {t.label}
                </span>
                <span className="text-sm text-muted-foreground">
                  {t.description}
                </span>
              </div>
              <div
                className={`mt-1 h-4 w-4 shrink-0 rounded-full border transition-colors ${
                  selected === t.id
                    ? "border-feedback-success bg-feedback-success"
                    : "border-border"
                }`}
              />
            </div>

            {/* Spec rows */}
            {t.specs.length > 0 && (
              <div className="flex flex-col gap-2 border-t border-border px-5 py-4">
                {t.specs.map((spec) => (
                  <div key={spec.key} className="flex gap-4">
                    <span className="w-16 shrink-0 font-mono text-label uppercase tracking-ui text-muted-foreground">
                      {spec.key}
                    </span>
                    <span className="text-sm text-foreground">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
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
