"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { useFluidDynamicsForm } from "@/contexts/FluidDynamicsFormContext";
import SubmitStepBar from "@/components/submit/SubmitStepBar";
import CharCountTextarea from "@/components/submit/CharCountTextarea";

export default function ExperimentDetailsPage() {
  const router = useRouter();
  const { form } = useFluidDynamicsForm();
  const { register, watch, trigger, formState: { errors } } = form;

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
    const ok = await trigger(["title", "tubeDesignDifferences", "technicalRationale"]);
    if (ok) router.push("/submit/fluid-dynamics/cad-file-upload");
  }

  return (
    <AppShell>
      <SubmitStepBar current={2} />

      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Experiment Details
        </h1>
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#555]">
          Step 3 of 4 · Fluid Dynamics
        </p>
      </div>

      <div className="h-px bg-[#2a2a2a]" />

      <div className="flex flex-col gap-6">
        {/* Tube Design Name */}
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#555]">
            Tube Design Name
          </label>
          <input
            {...register("title")}
            placeholder="Enter a name for your tube design"
            className="border border-[#2a2a2a] bg-[#0a0a0a] px-3.5 py-3 text-[13px] text-white placeholder-[#3a3a3a] outline-none transition-colors focus:border-[#3a3a3a]"
          />
          {errors.title && (
            <p className="font-mono text-[10px] text-red-400">{errors.title.message}</p>
          )}
        </div>

        {/* Tube Design Differences */}
        <CharCountTextarea
          label="Tube Design Differences"
          placeholder="Explain how your test tube's shape and physical structure differ from a standard 1.5 mL microfuge tube. Highlight specific modifications (e.g., wall thickness, curvature, tip geometry, cap design) and why they were made."
          value={designVal}
          onChange={(v) => form.setValue("tubeDesignDifferences", v, { shouldValidate: false })}
          minLength={1500}
          maxLength={2000}
          error={errors.tubeDesignDifferences?.message}
        />

        {/* Technical Rationale */}
        <CharCountTextarea
          label="Technical Rationale & Physics Principles"
          placeholder="Describe the underlying rationale for your design. What physics principles (e.g., surface tension, capillary action, fluid inertia, bubble migration) informed your choices? Explain how your design addresses unique challenges of fluid handling in microgravity."
          value={rationaleVal}
          onChange={(v) => form.setValue("technicalRationale", v, { shouldValidate: false })}
          minLength={1500}
          maxLength={2000}
          error={errors.technicalRationale?.message}
        />
      </div>

      {/* Nav */}
      <div className="flex justify-between">
        <button
          onClick={() => router.push("/submit/fluid-dynamics")}
          className="border border-[#2a2a2a] bg-[#111] px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-[#555] transition-colors hover:text-white"
        >
          ← Eligibility
        </button>
        <button
          onClick={handleNext}
          className="border border-[#4ade80] bg-[#4ade80] px-6 py-2.5 font-mono text-[11px] uppercase tracking-widest text-black transition-colors hover:bg-[#6ee7a0]"
        >
          Next: CAD Upload →
        </button>
      </div>
    </AppShell>
  );
}
