"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { useFluidDynamicsForm } from "@/contexts/FluidDynamicsFormContext";
import SubmitStepBar from "@/components/submit/SubmitStepBar";
import CharCountTextarea from "@/components/submit/CharCountTextarea";

const WRITING_TIPS = [
  { field: "Tube Design Differences", tips: [
    "Focus on specific geometry changes — wall thickness, curvature, tip angle, cap design",
    "Compare explicitly against a standard 1.5 mL microfuge tube",
    "Mention materials or manufacturing constraints if relevant",
  ]},
  { field: "Technical Rationale", tips: [
    "Name the physics principles: surface tension, capillary action, fluid inertia, bubble migration",
    "Explain how each design choice addresses a microgravity challenge",
    "Reference any simulations, experiments, or literature that informed your decisions",
  ]},
];

export default function ExperimentDetailsPage() {
  const router = useRouter();
  const { form } = useFluidDynamicsForm();
  const {
    register,
    watch,
    trigger,
    formState: { errors },
  } = form;

  const [tipsOpen, setTipsOpen] = useState(false);

  // Guard: redirect back if eligibility step was skipped
  useEffect(() => {
    const { citizenCheckbox, teamCheckbox } = form.getValues();
    if (!citizenCheckbox || !teamCheckbox) {
      router.replace("/submit/fluid-dynamics");
    }
  }, [form, router]);

  const designVal = watch("tubeDesignDifferences") ?? "";
  const rationaleVal = watch("technicalRationale") ?? "";

  async function handleNext() {
    const ok = await trigger([
      "title",
      "tubeDesignDifferences",
      "technicalRationale",
    ]);
    if (ok) router.push("/submit/fluid-dynamics/cad-file-upload");
  }

  return (
    <AppShell>
      <SubmitStepBar current={3} />

      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Experiment Details
        </h1>
        <p className="font-mono text-label uppercase tracking-ui text-muted-foreground">
          Step 3 of 5 · Fluid Dynamics
        </p>
      </div>

      <div className="h-px bg-secondary" />

      {/* Writing Tips — collapsible */}
      <div className="border border-border bg-card">
        <button
          onClick={() => setTipsOpen(!tipsOpen)}
          className="flex w-full items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-secondary"
          aria-expanded={tipsOpen}
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-5 w-5 items-center justify-center border border-feedback-success/40 bg-feedback-success/10 text-feedback-success font-mono text-label" aria-hidden="true">
              ?
            </span>
            <span className="text-sm font-medium text-foreground">
              Writing Tips
            </span>
            <span className="font-mono text-label text-muted-foreground tracking-ui">
              1500–2000 chars per field (roughly 250–330 words)
            </span>
          </div>
          <span className="font-mono text-label text-muted-foreground" aria-hidden="true">
            {tipsOpen ? "▲" : "▼"}
          </span>
        </button>
        {tipsOpen ? (
          <div className="border-t border-border px-5 py-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {WRITING_TIPS.map((section) => (
                <div key={section.field} className="flex flex-col gap-2">
                  <span className="font-mono text-label uppercase tracking-ui text-feedback-success">
                    {section.field}
                  </span>
                  <ul className="flex flex-col gap-1.5">
                    {section.tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-1.5 h-1 w-1 shrink-0 bg-muted-foreground/50" aria-hidden="true" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-6">
        {/* Tube Design Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="tube-design-name"
            className="font-mono text-sm uppercase tracking-ui text-muted-foreground"
          >
            Tube Design Name
          </label>
          <input
            id="tube-design-name"
            {...register("title")}
            placeholder="Enter a name for your tube design"
            className="border border-border bg-background px-3.5 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus-visible:border-feedback-success"
          />
          {errors.title ? (
            <p className="font-mono text-label text-feedback-error">
              {errors.title.message}
            </p>
          ) : null}
        </div>

        {/* Tube Design Differences */}
        <CharCountTextarea
          label="Tube Design Differences"
          placeholder="Explain how your test tube's shape and physical structure differ from a standard 1.5 mL microfuge tube. Highlight specific modifications (e.g., wall thickness, curvature, tip geometry, cap design) and why they were made."
          value={designVal}
          onChange={(v) =>
            form.setValue("tubeDesignDifferences", v, { shouldValidate: false })
          }
          minLength={1500}
          maxLength={2000}
          error={errors.tubeDesignDifferences?.message}
        />

        {/* Technical Rationale */}
        <CharCountTextarea
          label="Technical Rationale & Physics Principles"
          placeholder="Describe the underlying rationale for your design. What physics principles (e.g., surface tension, capillary action, fluid inertia, bubble migration) informed your choices? Explain how your design addresses unique challenges of fluid handling in microgravity."
          value={rationaleVal}
          onChange={(v) =>
            form.setValue("technicalRationale", v, { shouldValidate: false })
          }
          minLength={1500}
          maxLength={2000}
          error={errors.technicalRationale?.message}
        />
      </div>

      {/* Nav */}
      <div className="flex justify-between">
        <button
          onClick={() => router.push("/submit/fluid-dynamics")}
          className="border border-border bg-card px-5 py-2.5 font-mono text-ui uppercase tracking-ui text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Eligibility
        </button>
        <button
          onClick={handleNext}
          className="border border-feedback-success bg-feedback-success px-6 py-2.5 font-mono text-ui uppercase tracking-ui text-black transition-colors hover:bg-feedback-success-hover"
        >
          Next: CAD Upload →
        </button>
      </div>
    </AppShell>
  );
}
