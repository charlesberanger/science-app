"use client";

import { useState } from "react";
import type { ScoreResult } from "@/app/api/ai/score/route";

const DIMENSION_LABELS: Record<keyof ScoreResult["dimensions"], string> = {
  scientific_clarity: "Scientific Clarity",
  methodology_rigor: "Methodology Rigor",
  feasibility: "Feasibility",
  relevance: "Relevance",
  completeness: "Completeness",
};

const DIMENSION_WEIGHTS: Record<keyof ScoreResult["dimensions"], number> = {
  scientific_clarity: 20,
  methodology_rigor: 25,
  feasibility: 20,
  relevance: 25,
  completeness: 10,
};

function scoreColor(score: number): string {
  if (score >= 75) return "text-feedback-success";
  if (score >= 50) return "text-feedback-warning";
  return "text-destructive";
}

function dimColor(value: number): string {
  if (value >= 7) return "text-feedback-success";
  if (value >= 5) return "text-feedback-warning";
  return "text-destructive";
}

interface ScorePanelProps {
  title: string;
  abstract: string;
  methodology: string;
  checksRemaining: number;
  onCheck: () => void;
}

export default function ScorePanel({
  title,
  abstract,
  methodology,
  checksRemaining,
  onCheck,
}: ScorePanelProps) {
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheck() {
    if (checksRemaining <= 0 || loading) return;
    setLoading(true);
    setError(null);
    onCheck(); // decrement counter in parent

    try {
      const res = await fetch("/api/ai/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, abstract, methodology }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Scoring failed");
      }

      const data: ScoreResult = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Scoring failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const canCheck = checksRemaining > 0 && !loading && (title || abstract);

  return (
    <div className="flex flex-col gap-4 border border-border bg-card p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span
            className="text-label uppercase tracking-ui text-muted-foreground"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            AI Pre-Screen
          </span>
          <p className="text-xs text-muted-foreground">
            Scored against the reviewer rubric
          </p>
        </div>
        <span
          className="text-label uppercase tracking-ui text-muted-foreground"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          {checksRemaining} check{checksRemaining !== 1 ? "s" : ""} left
        </span>
      </div>

      {/* Rubric legend */}
      <div className="grid grid-cols-1 gap-1 border border-border bg-background p-3 sm:grid-cols-2">
        {(Object.keys(DIMENSION_WEIGHTS) as Array<keyof ScoreResult["dimensions"]>).map((key) => (
          <div key={key} className="flex items-center justify-between gap-2">
            <span
              className="text-label text-muted-foreground"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              {DIMENSION_LABELS[key]}
            </span>
            <span
              className="text-label text-secondary-foreground"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              {DIMENSION_WEIGHTS[key]}pts
            </span>
          </div>
        ))}
      </div>

      {/* Check button */}
      <button
        onClick={handleCheck}
        disabled={!canCheck}
        className="flex w-full items-center justify-center gap-2 border border-border bg-secondary py-2.5 font-mono text-[11px] uppercase tracking-ui text-secondary-foreground transition-colors hover:border-foreground/20 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
      >
        {loading ? (
          <>
            <span className="animate-pulse">●</span>
            Evaluating…
          </>
        ) : (
          "Check my submission"
        )}
      </button>

      {/* Error */}
      {error && (
        <p className="text-label text-destructive" style={{ fontFamily: "var(--font-dm-mono), monospace" }}>
          ✕ {error}
        </p>
      )}

      {/* Results */}
      {result && (
        <div className="flex flex-col gap-4">
          {/* Composite score */}
          <div className="flex items-end gap-3 border-b border-border pb-4">
            <span
              className={`font-mono text-5xl font-bold leading-none tabular-nums ${scoreColor(result.composite)}`}
            >
              {result.composite}
            </span>
            <div className="mb-1 flex flex-col">
              <span
                className="text-label uppercase tracking-ui text-muted-foreground"
                style={{ fontFamily: "var(--font-dm-mono), monospace" }}
              >
                / 100
              </span>
            </div>
          </div>

          {/* Verdict */}
          <p className="text-xs leading-relaxed text-foreground">
            {result.verdict}
          </p>

          {/* Dimension breakdown */}
          <div className="flex flex-col gap-2">
            <span
              className="text-label uppercase tracking-ui text-muted-foreground"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              Breakdown
            </span>
            <div className="flex flex-col">
              {(Object.entries(result.dimensions) as Array<[keyof ScoreResult["dimensions"], number]>).map(
                ([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between border-b border-border py-2 last:border-0"
                  >
                    <span
                      className="text-label text-muted-foreground"
                      style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                    >
                      {DIMENSION_LABELS[key]}
                    </span>
                    <span
                      className={`font-mono text-[13px] font-medium tabular-nums ${dimColor(value)}`}
                    >
                      {value}/10
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Flags */}
          {result.flags.length > 0 && (
            <div className="flex flex-col gap-2">
              <span
                className="text-label uppercase tracking-ui text-muted-foreground"
                style={{ fontFamily: "var(--font-dm-mono), monospace" }}
              >
                Improve
              </span>
              <div className="flex flex-col gap-1.5">
                {result.flags.map((flag, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 text-label text-feedback-warning">→</span>
                    <span className="text-xs leading-relaxed text-secondary-foreground">
                      {flag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
