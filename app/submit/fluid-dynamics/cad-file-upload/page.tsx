"use client";

import { useRef, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { useFluidDynamicsForm } from "@/contexts/FluidDynamicsFormContext";
import SubmitStepBar from "@/components/submit/SubmitStepBar";
import { formatSize } from "@/components/submit/utils";

const ACCEPTED_CAD = [".stl", ".obj", ".step", ".stp", ".iges", ".igs"];
const ACCEPTED_IMAGE = [".jpg", ".jpeg", ".png", ".webp"];
const MAX_CAD_MB = 100;
const MAX_IMAGE_MB = 5;

export default function CadFileUploadPage() {
  const router = useRouter();
  const { form } = useFluidDynamicsForm();
  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = form;
  const cadInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const cadFiles: File[] = watch("cadFiles") ?? [];
  const coverFiles: File[] = watch("coverImage") ?? [];

  const coverPreview = useMemo(() => {
    if (coverFiles.length === 0) return null;
    return URL.createObjectURL(coverFiles[0]);
  }, [coverFiles]);

  useEffect(() => {
    return () => {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
    };
  }, [coverPreview]);

  // Guard: redirect back if experiment details step was skipped
  useEffect(() => {
    const { title } = form.getValues();
    if (!title) router.replace("/submit/fluid-dynamics/experiment-details");
  }, [form, router]);

  function handleCadFiles(incoming: FileList | null) {
    if (!incoming) return;
    const file = incoming[0];
    if (!file) return;
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ACCEPTED_CAD.includes(ext)) return;
    if (file.size > MAX_CAD_MB * 1024 * 1024) return;
    setValue("cadFiles", [file], { shouldValidate: true });
  }

  function handleCoverFile(incoming: FileList | null) {
    if (!incoming) return;
    const file = incoming[0];
    if (!file) return;
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ACCEPTED_IMAGE.includes(ext)) return;
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) return;
    setValue("coverImage", [file]);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    handleCadFiles(e.dataTransfer.files);
  }

  function handleCoverDrop(e: React.DragEvent) {
    e.preventDefault();
    handleCoverFile(e.dataTransfer.files);
  }

  async function handleNext() {
    const ok = await trigger(["cadFiles"]);
    if (ok) router.push("/submit/fluid-dynamics/review-submission");
  }

  return (
    <AppShell>
      <SubmitStepBar current={4} />

      <div className="flex flex-col gap-1">
        <h1 className="font-doto font-bold text-3xl text-foreground sm:text-4xl">
          CAD File Upload
        </h1>
        <p className="font-mono text-label text-muted-foreground">
          Step 4 of 5 · Fluid Dynamics · Accepted: {ACCEPTED_CAD.join(", ")} · Max{" "}
          {MAX_CAD_MB} MB
        </p>
      </div>

      <div className="h-px bg-secondary" />

      {/* CAD drop zone */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload CAD file — click or drag and drop"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => cadInputRef.current?.click()}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); cadInputRef.current?.click(); } }}
        className={`flex min-h-55 cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
          errors.cadFiles
            ? "border-feedback-error/40"
            : "border-border hover:border-border"
        }`}
      >
        <input
          ref={cadInputRef}
          type="file"
          accept={ACCEPTED_CAD.join(",")}
          className="hidden"
          onChange={(e) => handleCadFiles(e.target.files)}
        />
        <span className="text-3xl text-muted-foreground" aria-hidden="true">
          ⬆
        </span>
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-sm text-muted-foreground">
            Drop your CAD file here or click to browse
          </p>
          <p className="font-mono text-label text-muted-foreground">
            {ACCEPTED_CAD.join("  ·  ").toUpperCase()}
          </p>
        </div>
      </div>

      {/* Attached CAD file */}
      {cadFiles.length > 0 ? (
        <div className="flex items-center justify-between border border-feedback-success/30 bg-feedback-success/5 px-4 py-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-foreground">
              {cadFiles[0].name}
            </span>
            <span className="font-mono text-label text-muted-foreground">
              {formatSize(cadFiles[0].size)}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setValue("cadFiles", [], { shouldValidate: true });
            }}
            className="font-mono text-label text-muted-foreground transition-colors hover:text-feedback-error"
          >
            Remove ✕
          </button>
        </div>
      ) : null}

      {errors.cadFiles ? (
        <p className="font-mono text-label text-feedback-error">
          {errors.cadFiles.message as string}
        </p>
      ) : null}

      {/* Cover image upload (optional) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-sm text-muted-foreground">
            Project Cover Image
          </span>
          <span className="font-mono text-label text-muted-foreground">
            (optional)
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          This image appears on your project card in Browse. If you skip this, a
          placeholder will be used.
        </p>

        {coverFiles.length > 0 && coverPreview ? (
          <div className="flex items-start gap-4 border border-feedback-success/30 bg-feedback-success/5 px-4 py-3">
            <img
              src={coverPreview}
              alt="Cover preview"
              className="h-16 w-24 object-cover border border-border"
            />
            <div className="flex flex-1 flex-col gap-0.5">
              <span className="text-sm font-medium text-foreground">
                {coverFiles[0].name}
              </span>
              <span className="font-mono text-label text-muted-foreground">
                {formatSize(coverFiles[0].size)}
              </span>
            </div>
            <button
              onClick={() => setValue("coverImage", [])}
              className="font-mono text-label text-muted-foreground transition-colors hover:text-feedback-error"
            >
              Remove ✕
            </button>
          </div>
        ) : (
          <div
            role="button"
            tabIndex={0}
            aria-label="Upload cover image — click or drag and drop"
            onDrop={handleCoverDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => coverInputRef.current?.click()}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); coverInputRef.current?.click(); } }}
            className="flex cursor-pointer items-center justify-center gap-3 border border-dashed border-border px-4 py-6 transition-colors hover:border-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <input
              ref={coverInputRef}
              type="file"
              accept={ACCEPTED_IMAGE.join(",")}
              className="hidden"
              onChange={(e) => handleCoverFile(e.target.files)}
            />
            <span className="text-xl text-muted-foreground" aria-hidden="true">
              🖼
            </span>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm text-muted-foreground">
                Drop an image or click to upload
              </p>
              <p className="font-mono text-label text-muted-foreground">
                JPG, PNG, WebP · Max {MAX_IMAGE_MB} MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <div className="flex justify-between">
        <button
          onClick={() =>
            router.push("/submit/fluid-dynamics/experiment-details")
          }
          className="border border-border bg-card px-5 py-2.5 font-mono text-ui text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Experiment Details
        </button>
        <button
          onClick={handleNext}
          className="border border-feedback-success bg-feedback-success px-6 py-2.5 font-mono text-ui text-black transition-colors hover:bg-feedback-success-hover"
        >
          Next: Review →
        </button>
      </div>
    </AppShell>
  );
}
