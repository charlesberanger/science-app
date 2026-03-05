"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { useFluidDynamicsForm } from "@/contexts/FluidDynamicsFormContext";
import SubmitStepBar from "@/components/submit/SubmitStepBar";

const CRITERIA = [
  { label: "Innovation", points: 15, description: "Novelty and creative departure from standard tube designs.", color: "bg-lime-400" },
  { label: "Functionality — Spillage Prevention", points: 15, description: "Effectiveness at preventing liquid spillage under microgravity conditions.", color: "bg-lime-400" },
  { label: "Functionality — Microgravity Adaptations", points: 10, description: "How well the design addresses the unique challenges of fluid handling in zero-g.", color: "bg-emerald-400" },
  { label: "Practicality — Ease of Use", points: 10, description: "Usability in a pressurised suit or gloves aboard the ISS.", color: "bg-emerald-400" },
  { label: "Practicality — Liquid Level Visibility", points: 10, description: "Clarity of liquid level indication for the crew.", color: "bg-emerald-400" },
  { label: "Compatibility — Size & Volume", points: 15, description: "Adherence to the 1.5 mL microfuge tube size specification.", color: "bg-teal-400" },
  { label: "Compatibility — Pipette Access", points: 15, description: "Ease of pipette reach to all interior surfaces.", color: "bg-teal-400" },
  { label: "Feasibility — 3D Printability", points: 10, description: "Manufacturability with standard FDM / SLA 3D printing.", color: "bg-cyan-400" },
];

const ELIGIBILITY_ITEMS = [
  { name: "citizenCheckbox" as const, label: "I confirm that I am a citizen and resident of a SERA-selected nation or eligible for the global mission seat.", hint: "Required for ISS experiment eligibility" },
  { name: "teamCheckbox" as const, label: "I am submitting as an individual or as part of a team of up to three people.", hint: "Maximum 3 members per submission" },
];

export default function FluidDynamicsEligibilityPage() {
  const router = useRouter();
  const { form } = useFluidDynamicsForm();
  const { register, watch, formState: { errors } } = form;
  const citizen = watch("citizenCheckbox");
  const team = watch("teamCheckbox");
  const canProceed = citizen && team;

  const [open, setOpen] = useState<string | null>(null);

  return (
    <AppShell>
      <SubmitStepBar current={2} />

      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Eligibility & Criteria
        </h1>
        <p className="font-mono text-label uppercase tracking-ui text-muted-foreground">
          Step 2 of 5 · Fluid Dynamics
        </p>
      </div>

      <div className="h-px bg-secondary" />

      {/* Judging criteria accordion — first, so user reads before confirming */}
      <div className="flex flex-col gap-3">
        <p className="font-mono text-sm uppercase tracking-ui text-muted-foreground">
          Judging Criteria — 100 pts total
        </p>
        <div className="h-px bg-secondary" />
        <div className="flex flex-col divide-y divide-border border border-border">
          {CRITERIA.map((c) => {
            const panelId = `criteria-panel-${c.label.toLowerCase().replace(/[\s—]+/g, "-")}`;
            const isOpen = open === c.label;
            return (
              <div key={c.label}>
                <button
                  onClick={() => setOpen(isOpen ? null : c.label)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between bg-card px-4 py-3 text-left transition-colors hover:bg-secondary"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-label text-feedback-success">{c.points} pts</span>
                    <span className="text-sm text-secondary-foreground">{c.label}</span>
                  </div>
                  <span className="font-mono text-label text-muted-foreground" aria-hidden="true">{isOpen ? "▲" : "▼"}</span>
                </button>
                {isOpen ? (
                  <div id={panelId} role="region" aria-label={c.label} className="bg-background px-4 py-3">
                    <p className="text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        {/* Score breakdown bar */}
        <div className="flex flex-col gap-2">
          <div className="flex h-2 w-full overflow-hidden">
            {CRITERIA.map((c) => (
              <div
                key={c.label}
                className={`${c.color} opacity-70`}
                style={{ width: `${c.points}%` }}
                title={`${c.label}: ${c.points} pts`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {[
              { label: "Innovation & Spillage", pts: 30, color: "bg-lime-400" },
              { label: "Functionality & Practicality", pts: 30, color: "bg-emerald-400" },
              { label: "Compatibility", pts: 30, color: "bg-teal-400" },
              { label: "Feasibility", pts: 10, color: "bg-cyan-400" },
            ].map((g) => (
              <div key={g.label} className="flex items-center gap-1.5">
                <div className={`h-2 w-2 ${g.color} opacity-70`} />
                <span className="font-mono text-label text-muted-foreground tracking-ui">
                  {g.label} ({g.pts})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Eligibility checkboxes — now closer to CTA */}
      <div className="flex flex-col gap-3">
        <p className="font-mono text-sm uppercase tracking-ui text-muted-foreground">
          Eligibility Confirmation
        </p>
        <div className="h-px bg-secondary" />
        <div className="flex flex-col gap-2">
          {ELIGIBILITY_ITEMS.map(({ name, label, hint }) => {
            const checked = watch(name);
            return (
              <label
                key={name}
                className={`flex cursor-pointer items-start gap-4 border px-5 py-4 transition-colors ${
                  checked
                    ? "border-feedback-success/40 bg-feedback-success/5"
                    : "border-border bg-card hover:bg-secondary"
                }`}
              >
                <div className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                  <input
                    type="checkbox"
                    {...register(name)}
                    className="peer sr-only"
                  />
                  <div className={`h-5 w-5 border transition-colors ${
                    checked
                      ? "border-feedback-success bg-feedback-success"
                      : "border-muted-foreground/40 bg-secondary"
                  }`}>
                    {checked ? (
                      <svg viewBox="0 0 20 20" fill="white" className="h-5 w-5" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm leading-relaxed text-secondary-foreground">
                    {label}
                  </span>
                  <span className="font-mono text-label text-muted-foreground tracking-ui">
                    {hint}
                  </span>
                </div>
              </label>
            );
          })}
        </div>

        {(errors.citizenCheckbox || errors.teamCheckbox) ? (
          <p className="font-mono text-label text-feedback-error">
            Both confirmations are required to proceed.
          </p>
        ) : null}
      </div>

      {/* Nav */}
      <div className="flex justify-between">
        <button
          onClick={() => router.push("/submit")}
          className="border border-border bg-card px-5 py-2.5 font-mono text-ui uppercase tracking-ui text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Project Type
        </button>
        <button
          disabled={!canProceed}
          onClick={() => router.push("/submit/fluid-dynamics/experiment-details")}
          className="border border-feedback-success bg-feedback-success px-6 py-2.5 font-mono text-ui uppercase tracking-ui text-black transition-colors hover:bg-feedback-success-hover disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next: Experiment Details →
        </button>
      </div>
    </AppShell>
  );
}
