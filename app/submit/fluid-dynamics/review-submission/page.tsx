"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { useFluidDynamicsForm } from "@/contexts/FluidDynamicsFormContext";
import SubmitStepBar from "@/components/submit/SubmitStepBar";
import { formatSize } from "@/components/submit/utils";

function ReadonlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-label uppercase tracking-ui text-[#888]">{label}</span>
      <div className="border border-[#2a2a2a] bg-[#0a0a0a] px-3.5 py-3 text-[13px] leading-relaxed text-[#999] whitespace-pre-wrap">
        {value || <span className="text-[#888]">—</span>}
      </div>
    </div>
  );
}

export default function ReviewSubmissionPage() {
  const router = useRouter();
  const { form } = useFluidDynamicsForm();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => { mountedRef.current = false; };
  }, []);

  // Guard: redirect back if CAD upload step was skipped
  useEffect(() => {
    const { cadFiles } = form.getValues();
    if (!cadFiles || cadFiles.length === 0) {
      router.replace("/submit/fluid-dynamics/cad-file-upload");
    }
  }, [form, router]);

  const data = form.getValues();
  const files: File[] = data.cadFiles ?? [];

  async function handleSubmit() {
    setSubmitting(true);
    // Mock API delay — guard against state updates if component unmounts
    await new Promise((r) => setTimeout(r, 1800));
    if (!mountedRef.current) return;
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <AppShell>
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center border border-[#4ade80] text-3xl text-[#4ade80]">
            ✓
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">Submission received</h1>
            <p className="text-sm text-[#888]">Your project is under review. You can track its status on your submission page.</p>
          </div>
          <button
            onClick={() => router.push("/submission")}
            className="border border-[#4ade80] bg-[#4ade80] px-6 py-2.5 font-mono text-[11px] uppercase tracking-ui text-black transition-colors hover:bg-feedback-success-hover"
          >
            View My Submission →
          </button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <SubmitStepBar current={4} />

      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Review Submission
        </h1>
        <p className="font-mono text-label uppercase tracking-ui text-[#888]">
          Step 4 of 4 · Fluid Dynamics · Check everything before submitting
        </p>
      </div>

      <div className="h-px bg-[#2a2a2a]" />

      <div className="flex flex-col gap-5">
        <ReadonlyField label="Tube Design Name" value={data.title} />
        <ReadonlyField label="Tube Design Differences" value={data.tubeDesignDifferences} />
        <ReadonlyField label="Technical Rationale & Physics Principles" value={data.technicalRationale} />

        {/* CAD file */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-label uppercase tracking-ui text-[#888]">CAD File</span>
          {files.length > 0 ? (
            <div className="flex items-center justify-between border border-[#2a2a2a] bg-[#0a0a0a] px-3.5 py-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] text-white">{files[0].name}</span>
                <span className="font-mono text-label text-[#888]">{formatSize(files[0].size)}</span>
              </div>
              <button
                onClick={() => router.push("/submit/fluid-dynamics/cad-file-upload")}
                className="font-mono text-label text-[#888] transition-colors hover:text-[#999]"
              >
                Update →
              </button>
            </div>
          ) : (
            <p className="font-mono text-label text-red-400">No file attached — go back and upload one.</p>
          )}
        </div>
      </div>

      {/* Nav */}
      <div className="flex justify-between">
        <button
          onClick={() => router.push("/submit/fluid-dynamics/cad-file-upload")}
          className="border border-[#2a2a2a] bg-[#111] px-5 py-2.5 font-mono text-[11px] uppercase tracking-ui text-[#888] transition-colors hover:text-white"
        >
          ← CAD Upload
        </button>
        <button
          onClick={() => setConfirmOpen(true)}
          className="border border-[#4ade80] bg-[#4ade80] px-6 py-2.5 font-mono text-[11px] uppercase tracking-ui text-black transition-colors hover:bg-feedback-success-hover"
        >
          Submit Project →
        </button>
      </div>

      {/* Confirm modal */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-full max-w-sm border border-[#2a2a2a] bg-[#111]">
            <div className="absolute left-0 top-0 h-px w-full bg-[#4ade80]/40" />
            <div className="px-7 py-6">
              <h2 className="text-lg font-bold text-white">Confirm Submission</h2>
              <p className="mt-2 text-sm text-[#888]">
                Once submitted, you won't be able to make changes. Are you sure?
              </p>
            </div>
            <div className="flex flex-col gap-2 border-t border-[#1c1c1c] px-7 py-5">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full bg-[#4ade80] py-2.5 font-mono text-[11px] uppercase tracking-ui text-black transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {submitting ? "Submitting…" : "Confirm & Submit"}
              </button>
              <button
                onClick={() => setConfirmOpen(false)}
                disabled={submitting}
                className="w-full border border-[#2a2a2a] py-2.5 font-mono text-[11px] uppercase tracking-ui text-[#888] transition-colors hover:text-white disabled:opacity-30"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
