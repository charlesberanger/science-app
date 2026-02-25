"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { useFluidDynamicsForm } from "@/contexts/FluidDynamicsFormContext";
import SubmitStepBar from "@/components/submit/SubmitStepBar";
import { formatSize } from "@/components/submit/utils";

const ACCEPTED = [".stl", ".obj", ".step", ".stp", ".iges", ".igs"];
const MAX_MB = 100;

export default function CadFileUploadPage() {
  const router = useRouter();
  const { form } = useFluidDynamicsForm();
  const { watch, setValue, trigger, formState: { errors } } = form;
  const inputRef = useRef<HTMLInputElement>(null);
  const files: File[] = watch("cadFiles") ?? [];

  // Guard: redirect back if experiment details step was skipped
  useEffect(() => {
    const { title } = form.getValues();
    if (!title) router.replace("/submit/fluid-dynamics/experiment-details");
  }, [form, router]);

  function handleFiles(incoming: FileList | null) {
    if (!incoming) return;
    const file = incoming[0];
    if (!file) return;
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ACCEPTED.includes(ext)) return;
    if (file.size > MAX_MB * 1024 * 1024) return;
    setValue("cadFiles", [file], { shouldValidate: true });
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  }

  async function handleNext() {
    const ok = await trigger(["cadFiles"]);
    if (ok) router.push("/submit/fluid-dynamics/review-submission");
  }

  return (
    <AppShell>
      <SubmitStepBar current={3} />

      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          CAD File Upload
        </h1>
        <p className="font-mono text-label uppercase tracking-ui text-[#888]">
          Step 3 of 4 · Fluid Dynamics · Accepted: {ACCEPTED.join(", ")} · Max {MAX_MB} MB
        </p>
      </div>

      <div className="h-px bg-[#2a2a2a]" />

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className={`flex min-h-[220px] cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed transition-colors ${
          errors.cadFiles ? "border-red-500/40" : "border-[#2a2a2a] hover:border-[#3a3a3a]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED.join(",")}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <span className="text-3xl text-[#888]" aria-hidden="true">⬆</span>
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-sm text-[#888]">Drop your CAD file here or click to browse</p>
          <p className="font-mono text-label text-[#888]">
            {ACCEPTED.join("  ·  ").toUpperCase()}
          </p>
        </div>
      </div>

      {/* Attached file */}
      {files.length > 0 && (
        <div className="flex items-center justify-between border border-[#4ade80]/30 bg-[#4ade80]/5 px-4 py-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-white">{files[0].name}</span>
            <span className="font-mono text-label text-[#888]">{formatSize(files[0].size)}</span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setValue("cadFiles", [], { shouldValidate: true }); }}
            className="font-mono text-label text-[#888] transition-colors hover:text-red-400"
          >
            Remove ✕
          </button>
        </div>
      )}

      {errors.cadFiles && (
        <p className="font-mono text-label text-red-400">{errors.cadFiles.message as string}</p>
      )}

      {/* Nav */}
      <div className="flex justify-between">
        <button
          onClick={() => router.push("/submit/fluid-dynamics/experiment-details")}
          className="border border-[#2a2a2a] bg-[#111] px-5 py-2.5 font-mono text-[11px] uppercase tracking-ui text-[#888] transition-colors hover:text-white"
        >
          ← Experiment Details
        </button>
        <button
          onClick={handleNext}
          className="border border-[#4ade80] bg-[#4ade80] px-6 py-2.5 font-mono text-[11px] uppercase tracking-ui text-black transition-colors hover:bg-feedback-success-hover"
        >
          Next: Review →
        </button>
      </div>
    </AppShell>
  );
}
