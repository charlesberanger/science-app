"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { useFluidDynamicsForm } from "@/contexts/FluidDynamicsFormContext";
import SubmitStepBar from "@/components/submit/SubmitStepBar";
import ScorePanel from "@/components/submit/ScorePanel";
import { formatSize } from "@/components/submit/utils";

const MAX_CHECKS = 5;
const SESSION_KEY = "ai_score_checks_used";

function ReadonlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-label uppercase tracking-ui text-muted-foreground">{label}</span>
      <div className="border border-border bg-background px-3.5 py-3 text-[13px] leading-relaxed text-secondary-foreground whitespace-pre-wrap">
        {value || <span className="text-muted-foreground">—</span>}
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

  // Rate-limit: track checks used in sessionStorage
  const [checksUsed, setChecksUsed] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    return parseInt(sessionStorage.getItem(SESSION_KEY) ?? "0", 10);
  });
  const checksRemaining = Math.max(0, MAX_CHECKS - checksUsed);

  function handleCheckConsumed() {
    const next = checksUsed + 1;
    setChecksUsed(next);
    sessionStorage.setItem(SESSION_KEY, String(next));
  }

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
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 text-center">
          {/* Animated check */}
          <div className="relative flex items-center justify-center">
            <span className="absolute h-16 w-16 animate-ping rounded-none border border-feedback-success opacity-20" />
            <div className="relative flex h-16 w-16 items-center justify-center border border-feedback-success text-3xl text-feedback-success">
              ✓
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Submission received</h1>
            <p className="text-sm text-muted-foreground">Your project is queued for review by the Science team.</p>
          </div>

          {/* What happens next */}
          <div className="w-full max-w-sm border border-border bg-card text-left">
            <p className="border-b border-border px-5 py-3 font-mono text-label uppercase tracking-ui text-muted-foreground">
              What happens next
            </p>
            {[
              { step: "01", text: "Our team reviews your CAD file and written rationale." },
              { step: "02", text: "Approved submissions go live on the leaderboard for community voting." },
              { step: "03", text: "Winners are announced after the April 12 deadline." },
            ].map(({ step, text }) => (
              <div key={step} className="flex items-start gap-4 border-b border-border px-5 py-3 last:border-0">
                <span className="font-mono text-label text-feedback-success shrink-0">{step}</span>
                <p className="text-xs leading-relaxed text-secondary-foreground">{text}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => router.push("/submission")}
            className="border border-feedback-success bg-feedback-success px-6 py-2.5 font-mono text-[11px] uppercase tracking-ui text-black transition-colors hover:bg-feedback-success-hover"
          >
            View My Submission →
          </button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <SubmitStepBar current={5} />

      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Review Submission
        </h1>
        <p className="font-mono text-label uppercase tracking-ui text-muted-foreground">
          Step 5 of 5 · Fluid Dynamics · Check everything before submitting
        </p>
      </div>

      <div className="h-px bg-secondary" />

      {/* Two-column layout on large screens: fields left, AI panel right */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,720px)_300px]">
        {/* Left: submission fields + nav */}
        <div className="flex flex-col gap-5">
          <ReadonlyField label="Tube Design Name" value={data.title} />
          <ReadonlyField label="Tube Design Differences" value={data.tubeDesignDifferences} />
          <ReadonlyField label="Technical Rationale & Physics Principles" value={data.technicalRationale} />

          {/* CAD file */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-label uppercase tracking-ui text-muted-foreground">CAD File</span>
            {files.length > 0 ? (
              <div className="flex items-center justify-between border border-border bg-background px-3.5 py-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[13px] text-foreground">{files[0].name}</span>
                  <span className="font-mono text-label text-muted-foreground">{formatSize(files[0].size)}</span>
                </div>
                <button
                  onClick={() => router.push("/submit/fluid-dynamics/cad-file-upload")}
                  className="font-mono text-label text-muted-foreground transition-colors hover:text-secondary-foreground"
                >
                  Update →
                </button>
              </div>
            ) : (
              <p className="font-mono text-label text-red-400">No file attached — go back and upload one.</p>
            )}
          </div>

          {/* Nav — inside left column so it aligns with form content */}
          <div className="flex justify-between pt-2">
            <button
              onClick={() => router.push("/submit/fluid-dynamics/cad-file-upload")}
              className="border border-border bg-card px-5 py-2.5 font-mono text-[11px] uppercase tracking-ui text-muted-foreground transition-colors hover:text-foreground"
            >
              ← CAD Upload
            </button>
            <button
              onClick={() => setConfirmOpen(true)}
              className="border border-feedback-success bg-feedback-success px-6 py-2.5 font-mono text-[11px] uppercase tracking-ui text-black transition-colors hover:bg-feedback-success-hover"
            >
              Submit Project →
            </button>
          </div>
        </div>

        {/* Right: AI pre-screen panel — sticky just below topbar */}
        <div className="lg:sticky lg:top-[72px] lg:self-start">
          <ScorePanel
            title={data.title}
            abstract={data.tubeDesignDifferences}
            methodology={data.technicalRationale}
            checksRemaining={checksRemaining}
            onCheck={handleCheckConsumed}
          />
        </div>
      </div>

      {/* Confirm modal */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-full max-w-sm border border-border bg-card">
            <div className="absolute left-0 top-0 h-px w-full bg-feedback-success/40" />
            <div className="px-7 py-6">
              <h2 className="text-lg font-bold text-foreground">Confirm Submission</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Once submitted, you won't be able to make changes. Are you sure?
              </p>
            </div>
            <div className="flex flex-col gap-2 border-t border-border px-7 py-5">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full bg-feedback-success py-2.5 font-mono text-[11px] uppercase tracking-ui text-black transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {submitting ? "Submitting…" : "Confirm & Submit"}
              </button>
              <button
                onClick={() => setConfirmOpen(false)}
                disabled={submitting}
                className="w-full border border-border py-2.5 font-mono text-[11px] uppercase tracking-ui text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
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
