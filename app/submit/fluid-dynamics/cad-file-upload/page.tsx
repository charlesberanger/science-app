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
  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = form;
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
      <SubmitStepBar current={4} />

      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          CAD File Upload
        </h1>
        <p className="font-mono text-label uppercase tracking-ui text-muted-foreground">
          Step 4 of 5 · Fluid Dynamics · Accepted: {ACCEPTED.join(", ")} · Max{" "}
          {MAX_MB} MB
        </p>
      </div>

      <div className="h-px bg-secondary" />

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className={`flex min-h-[220px] cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed transition-colors ${
          errors.cadFiles
            ? "border-red-500/40"
            : "border-border hover:border-border"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED.join(",")}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <span className="text-3xl text-muted-foreground" aria-hidden="true">
          ⬆
        </span>
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-sm text-muted-foreground">
            Drop your CAD file here or click to browse
          </p>
          <p className="font-mono text-label text-muted-foreground">
            {ACCEPTED.join("  ·  ").toUpperCase()}
          </p>
        </div>
      </div>

      {/* Attached file */}
      {files.length > 0 && (
        <div className="flex items-center justify-between border border-feedback-success/30 bg-feedback-success/5 px-4 py-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-foreground">
              {files[0].name}
            </span>
            <span className="font-mono text-label text-muted-foreground">
              {formatSize(files[0].size)}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setValue("cadFiles", [], { shouldValidate: true });
            }}
            className="font-mono text-label text-muted-foreground transition-colors hover:text-red-400"
          >
            Remove ✕
          </button>
        </div>
      )}

      {errors.cadFiles && (
        <p className="font-mono text-label text-red-400">
          {errors.cadFiles.message as string}
        </p>
      )}

      {/* Nav */}
      <div className="flex justify-between">
        <button
          onClick={() =>
            router.push("/submit/fluid-dynamics/experiment-details")
          }
          className="border border-border bg-card px-5 py-2.5 font-mono text-[11px] uppercase tracking-ui text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Experiment Details
        </button>
        <button
          onClick={handleNext}
          className="border border-feedback-success bg-feedback-success px-6 py-2.5 font-mono text-[11px] uppercase tracking-ui text-black transition-colors hover:bg-feedback-success-hover"
        >
          Next: Review →
        </button>
      </div>
    </AppShell>
  );
}
