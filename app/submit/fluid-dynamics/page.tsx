"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { useFluidDynamicsForm } from "@/contexts/FluidDynamicsFormContext";
import SubmitStepBar from "@/components/submit/SubmitStepBar";

const CRITERIA = [
  { label: "Innovation", points: 15, description: "Novelty and creative departure from standard tube designs." },
  { label: "Functionality — Spillage Prevention", points: 15, description: "Effectiveness at preventing liquid spillage under microgravity conditions." },
  { label: "Functionality — Microgravity Adaptations", points: 10, description: "How well the design addresses the unique challenges of fluid handling in zero-g." },
  { label: "Practicality — Ease of Use", points: 10, description: "Usability in a pressurised suit or gloves aboard the ISS." },
  { label: "Practicality — Liquid Level Visibility", points: 10, description: "Clarity of liquid level indication for the crew." },
  { label: "Compatibility — Size & Volume", points: 15, description: "Adherence to the 1.5 mL microfuge tube size specification." },
  { label: "Compatibility — Pipette Access", points: 15, description: "Ease of pipette reach to all interior surfaces." },
  { label: "Feasibility — 3D Printability", points: 10, description: "Manufacturability with standard FDM / SLA 3D printing." },
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

      {/* Eligibility checkboxes */}
      <div className="flex flex-col gap-3 border border-border bg-card p-5">
        <p className="font-mono text-label uppercase tracking-ui text-muted-foreground">Eligibility</p>
        <div className="h-px bg-secondary" />

        {[
          { name: "citizenCheckbox" as const, label: "I confirm that I am a citizen and resident of a SERA-selected nation or eligible for the global mission seat." },
          { name: "teamCheckbox" as const, label: "I am submitting as an individual or as part of a team of up to three people." },
        ].map(({ name, label }) => (
          <label key={name} className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              {...register(name)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#4ade80]"
            />
            <span className="text-xs leading-relaxed text-secondary-foreground">{label}</span>
          </label>
        ))}

        {(errors.citizenCheckbox || errors.teamCheckbox) && (
          <p className="font-mono text-label text-red-400">Both confirmations are required to proceed.</p>
        )}
      </div>

      {/* Judging criteria accordion */}
      <div className="flex flex-col gap-1">
        <p className="font-mono text-label uppercase tracking-ui text-muted-foreground">Judging Criteria — 100 pts total</p>
        <div className="h-px bg-secondary" />
        <div className="flex flex-col divide-y divide-[#1c1c1c] border border-border">
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
                    <span className="text-xs text-secondary-foreground">{c.label}</span>
                  </div>
                  <span className="font-mono text-label text-muted-foreground" aria-hidden="true">{isOpen ? "▲" : "▼"}</span>
                </button>
                {isOpen && (
                  <div id={panelId} role="region" aria-label={c.label} className="bg-background px-4 py-3">
                    <p className="text-xs leading-relaxed text-muted-foreground">{c.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Nav */}
      <div className="flex justify-between">
        <button
          onClick={() => router.push("/submit")}
          className="border border-border bg-card px-5 py-2.5 font-mono text-[11px] uppercase tracking-ui text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Project Type
        </button>
        <button
          disabled={!canProceed}
          onClick={() => router.push("/submit/fluid-dynamics/experiment-details")}
          className="border border-feedback-success bg-feedback-success px-6 py-2.5 font-mono text-[11px] uppercase tracking-ui text-black transition-colors hover:bg-feedback-success-hover disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next: Experiment Details →
        </button>
      </div>
    </AppShell>
  );
}
