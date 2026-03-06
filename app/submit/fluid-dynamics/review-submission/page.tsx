"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { useFluidDynamicsForm } from "@/contexts/FluidDynamicsFormContext";
import SubmitStepBar from "@/components/submit/SubmitStepBar";
import ScorePanel from "@/components/submit/ScorePanel";
import CharCountTextarea from "@/components/submit/CharCountTextarea";
import { formatSize } from "@/components/submit/utils";
import { Pencil } from "lucide-react";
import { useToast } from "@/components/ui/toast";

const MAX_CHECKS = 5;
const SESSION_KEY = "ai_score_checks_used";

function EditableTextField({
  label,
  fieldKey,
  value,
  onSave,
}: {
  label: string;
  fieldKey: string;
  value: string;
  onSave: (v: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  function handleEdit() {
    setDraft(value);
    setEditing(true);
  }

  function handleSave() {
    onSave(draft);
    setEditing(false);
  }

  function handleCancel() {
    setDraft(value);
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-sm text-muted-foreground">
            {label}
          </span>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="font-mono text-label text-feedback-success transition-colors hover:opacity-80"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="font-mono text-label text-muted-foreground transition-colors hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
        <input
          id={fieldKey}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          autoFocus
          className="border border-feedback-success bg-background px-3.5 py-3 text-sm text-foreground outline-none"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-sm text-muted-foreground">
          {label}
        </span>
        <button
          onClick={handleEdit}
          className="flex items-center gap-1 border border-border px-2 py-0.5 font-mono text-label text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
        >
          <Pencil size={10} />
          Edit
        </button>
      </div>
      <div className="border border-border bg-background px-3.5 py-3 text-sm leading-relaxed text-secondary-foreground whitespace-pre-wrap">
        {value || <span className="text-muted-foreground">—</span>}
      </div>
    </div>
  );
}

function EditableLongField({
  label,
  fieldKey,
  placeholder,
  value,
  onSave,
}: {
  label: string;
  fieldKey: string;
  placeholder: string;
  value: string;
  onSave: (v: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  function handleEdit() {
    setDraft(value);
    setEditing(true);
  }

  function handleSave() {
    onSave(draft);
    setEditing(false);
  }

  function handleCancel() {
    setDraft(value);
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-sm text-muted-foreground">
            {label}
          </span>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="font-mono text-label text-feedback-success transition-colors hover:opacity-80"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="font-mono text-label text-muted-foreground transition-colors hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
        <CharCountTextarea
          id={fieldKey}
          label=""
          placeholder={placeholder}
          value={draft}
          onChange={setDraft}
          minLength={1500}
          maxLength={2000}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-sm text-muted-foreground">
          {label}
        </span>
        <button
          onClick={handleEdit}
          className="flex items-center gap-1 border border-border px-2 py-0.5 font-mono text-label text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
        >
          <Pencil size={10} />
          Edit
        </button>
      </div>
      <div className="border border-border bg-background px-3.5 py-3 text-sm leading-relaxed text-secondary-foreground whitespace-pre-wrap">
        {value || <span className="text-muted-foreground">—</span>}
      </div>
    </div>
  );
}

function SubmitSignal({
  score,
  checksRemaining,
}: {
  score: number | null;
  checksRemaining: number;
}) {
  if (score === null) {
    return (
      <div className="flex border border-feedback-warning/40 bg-feedback-status-warning">
        <div className="w-1 shrink-0 bg-feedback-warning" />
        <div className="flex flex-col gap-0.5 px-3.5 py-2.5">
          <span className="font-mono text-label text-feedback-warning">
            Pre-screen required
          </span>
          <p className="font-mono text-label text-feedback-warning/80">
            Run the AI check above to unlock submission.
          </p>
        </div>
      </div>
    );
  }
  if (score >= 75) {
    return (
      <div className="flex border border-feedback-success/40 bg-feedback-status-success">
        <div className="w-1 shrink-0 bg-feedback-success" />
        <div className="px-3.5 py-2.5">
          <p className="font-mono text-label text-feedback-success">
            Score looks strong — ready to submit.
          </p>
        </div>
      </div>
    );
  }
  if (score >= 50) {
    return (
      <div className="flex border border-feedback-warning/40 bg-feedback-status-warning">
        <div className="w-1 shrink-0 bg-feedback-warning" />
        <div className="px-3.5 py-2.5">
          <p className="font-mono text-label text-feedback-warning">
            Score is borderline — consider revising weak areas before
            submitting.
          </p>
        </div>
      </div>
    );
  }
  if (checksRemaining > 0) {
    return (
      <div className="flex border border-feedback-error/40 bg-feedback-status-error">
        <div className="w-1 shrink-0 bg-feedback-error" />
        <div className="flex flex-col gap-0.5 px-3.5 py-2.5">
          <span className="font-mono text-label text-feedback-error">
            Submission blocked
          </span>
          <p className="font-mono text-label text-feedback-error/80">
            Score too low — edit your submission above and re-check.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex border border-feedback-error/40 bg-feedback-status-error">
      <div className="w-1 shrink-0 bg-feedback-error" />
      <div className="flex flex-col gap-0.5 px-3.5 py-2.5">
        <span className="font-mono text-label text-feedback-error">
          Submission blocked
        </span>
        <p className="font-mono text-label text-feedback-error/80">
          Score too low and no checks remaining — edit your submission and
          return in a new session to re-evaluate.
        </p>
      </div>
    </div>
  );
}

export default function ReviewSubmissionPage() {
  const router = useRouter();
  const { form } = useFluidDynamicsForm();
  const { toast } = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const mountedRef = useRef(true);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus trap for modal
  const handleDialogKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape" && !submitting) { setConfirmOpen(false); return; }
    if (e.key !== "Tab") return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
    }
  }, [submitting]);

  // Move focus into modal when it opens
  useEffect(() => {
    if (!confirmOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const first = dialog.querySelector<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    first?.focus();
  }, [confirmOpen]);

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
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const { cadFiles } = form.getValues();
    if (!cadFiles || cadFiles.length === 0) {
      router.replace("/submit/fluid-dynamics/cad-file-upload");
    }
  }, [form, router]);

  const data = form.watch();
  const files: File[] = data.cadFiles ?? [];
  const coverFiles: File[] = data.coverImage ?? [];

  const coverPreview = useMemo(() => {
    if (coverFiles.length === 0) return null;
    return URL.createObjectURL(coverFiles[0]);
  }, [coverFiles]);

  async function handleSubmit() {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1800));
    if (!mountedRef.current) return;
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <AppShell>
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 text-center">
          <div className="relative flex items-center justify-center">
            <span className="absolute h-16 w-16 animate-ping rounded-none border border-feedback-success opacity-20" />
            <div className="relative flex h-16 w-16 items-center justify-center border border-feedback-success text-3xl text-feedback-success">
              ✓
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Submission received
            </h1>
            <p className="text-sm text-muted-foreground">
              Your project is queued for review by the Science team.
            </p>
          </div>

          <div className="w-full max-w-sm border border-border bg-card text-left">
            <p className="border-b border-border px-5 py-3 font-mono text-label text-muted-foreground">
              What happens next
            </p>
            {[
              {
                step: "01",
                text: "Our team reviews your CAD file and written rationale.",
              },
              {
                step: "02",
                text: "Approved submissions go live on the leaderboard for community voting.",
              },
              {
                step: "03",
                text: "Winners are announced after the April 12 deadline.",
              },
            ].map(({ step, text }) => (
              <div
                key={step}
                className="flex items-start gap-4 border-b border-border px-5 py-3 last:border-0"
              >
                <span className="font-mono text-label text-feedback-success shrink-0">
                  {step}
                </span>
                <p className="text-xs leading-relaxed text-secondary-foreground">
                  {text}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => router.push("/submission")}
            className="border border-feedback-success bg-feedback-success px-6 py-2.5 font-mono text-ui text-black transition-colors hover:bg-feedback-success-hover"
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
        <p className="font-mono text-label text-muted-foreground">
          Step 5 of 5 · Fluid Dynamics · Check everything before submitting
        </p>
      </div>

      <div className="h-px bg-secondary" />

      {/* Submission fields */}
      <div className="flex flex-col gap-5">
        <EditableTextField
          label="Tube Design Name"
          fieldKey="title"
          value={data.title}
          onSave={(v) => { form.setValue("title", v); toast({ message: "Changes saved ✓", variant: "success" }); }}
        />
        <EditableLongField
          label="Tube Design Differences"
          fieldKey="tubeDesignDifferences"
          placeholder="Explain how your test tube's shape and physical structure differ from a standard 1.5 mL microfuge tube."
          value={data.tubeDesignDifferences}
          onSave={(v) => { form.setValue("tubeDesignDifferences", v); toast({ message: "Changes saved ✓", variant: "success" }); }}
        />
        <EditableLongField
          label="Technical Rationale & Physics Principles"
          fieldKey="technicalRationale"
          placeholder="Describe the underlying rationale for your design and the physics principles that informed your choices."
          value={data.technicalRationale}
          onSave={(v) => { form.setValue("technicalRationale", v); toast({ message: "Changes saved ✓", variant: "success" }); }}
        />

        {/* Cover image */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-sm text-muted-foreground">
            Cover Image
          </span>
          {coverFiles.length > 0 && coverPreview ? (
            <div className="flex items-start gap-4 border border-border bg-background px-3.5 py-3">
              <img
                src={coverPreview}
                alt="Cover preview"
                className="h-16 w-24 object-cover border border-border"
              />
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm text-foreground">
                  {coverFiles[0].name}
                </span>
                <span className="font-mono text-label text-muted-foreground">
                  {formatSize(coverFiles[0].size)}
                </span>
              </div>
              <button
                onClick={() =>
                  router.push("/submit/fluid-dynamics/cad-file-upload")
                }
                className="font-mono text-label text-muted-foreground transition-colors hover:text-secondary-foreground"
              >
                Update →
              </button>
            </div>
          ) : (
            <p className="font-mono text-label text-muted-foreground">
              No cover image — a placeholder will be used.
            </p>
          )}
        </div>

        {/* CAD file */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-sm text-muted-foreground">
            CAD File
          </span>
          {files.length > 0 ? (
            <div className="flex items-center justify-between border border-border bg-background px-3.5 py-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-foreground">
                  {files[0].name}
                </span>
                <span className="font-mono text-label text-muted-foreground">
                  {formatSize(files[0].size)}
                </span>
              </div>
              <button
                onClick={() =>
                  router.push("/submit/fluid-dynamics/cad-file-upload")
                }
                className="font-mono text-label text-muted-foreground transition-colors hover:text-secondary-foreground"
              >
                Update →
              </button>
            </div>
          ) : (
            <p className="font-mono text-label text-destructive">
              No file attached — go back and upload one.
            </p>
          )}
        </div>
      </div>

      {/* AI pre-screen — full width below fields */}
      <div className="h-px bg-secondary" />

      <ScorePanel
        title={data.title}
        abstract={data.tubeDesignDifferences}
        methodology={data.technicalRationale}
        checksRemaining={checksRemaining}
        onCheck={handleCheckConsumed}
        onScore={setLastScore}
      />

      {/* Nav */}
      <div className="flex flex-col gap-3">
        <SubmitSignal score={lastScore} checksRemaining={checksRemaining} />
        <div className="flex justify-between">
          <button
            onClick={() =>
              router.push("/submit/fluid-dynamics/cad-file-upload")
            }
            className="border border-border bg-card px-5 py-2.5 font-mono text-ui text-muted-foreground transition-colors hover:text-foreground"
          >
            ← CAD Upload
          </button>
          <button
            onClick={() => setConfirmOpen(true)}
            disabled={lastScore === null || lastScore < 50}
            className="border px-6 py-2.5 font-mono text-ui transition-colors disabled:cursor-not-allowed disabled:border-border disabled:bg-card disabled:text-muted-foreground border-feedback-success bg-feedback-success text-black hover:bg-feedback-success-hover"
          >
            Submit Project →
          </button>
        </div>
      </div>

      {/* Confirm modal */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title" onKeyDown={handleDialogKeyDown}>
          <div ref={dialogRef} className="relative w-full max-w-sm border border-border bg-card">
            <div className="absolute left-0 top-0 h-px w-full bg-feedback-success/40" />
            <div className="px-7 py-6">
              <h2 id="confirm-dialog-title" className="text-lg font-bold text-foreground">
                Confirm Submission
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Once submitted, you won't be able to make changes. Are you sure?
              </p>
            </div>
            <div className="flex flex-col gap-2 border-t border-border px-7 py-5">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full bg-feedback-success py-2.5 font-mono text-ui text-black transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {submitting ? "Submitting…" : "Confirm & Submit"}
              </button>
              <button
                onClick={() => setConfirmOpen(false)}
                disabled={submitting}
                className="w-full border border-border py-2.5 font-mono text-ui text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
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
