"use client";

import { useState } from "react";
import type { ScoreResult } from "@/app/api/ai/score/route";

const DIMENSIONS: Array<{
  key: keyof ScoreResult["dimensions"];
  label: string;
  weight: number;
}> = [
  { key: "scientific_clarity", label: "Scientific Clarity", weight: 20 },
  { key: "methodology_rigor",  label: "Methodology Rigor",  weight: 25 },
  { key: "feasibility",        label: "Feasibility",        weight: 20 },
  { key: "relevance",          label: "Relevance",          weight: 25 },
  { key: "completeness",       label: "Completeness",       weight: 10 },
];

function compositeColor(score: number) {
  if (score >= 75) return "text-feedback-success";
  if (score >= 50) return "text-feedback-warning";
  return "text-destructive";
}

function dimColors(value: number) {
  if (value >= 7) return { bar: "bg-feedback-success", text: "text-feedback-success" };
  if (value >= 5) return { bar: "bg-feedback-warning", text: "text-feedback-warning" };
  return { bar: "bg-destructive", text: "text-destructive" };
}

interface ScorePanelProps {
  title: string;
  abstract: string;
  methodology: string;
  checksRemaining: number;
  onCheck: () => void;
  onScore?: (composite: number) => void;
}

export default function ScorePanel({
  title,
  abstract,
  methodology,
  checksRemaining,
  onCheck,
  onScore,
}: ScorePanelProps) {
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  async function handleCheck() {
    if (checksRemaining <= 0 || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    onCheck();
    setHasChecked(true);

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
      onScore?.(data.composite);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Scoring failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const canCheck = checksRemaining > 0 && !loading && Boolean(title || abstract);

  return (
    <div className="border border-t-2 border-border border-t-feedback-success bg-card">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <span
          className="text-label uppercase tracking-ui text-muted-foreground"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          AI Pre-Screen
        </span>
        <span
          className={`text-label uppercase tracking-ui ${
            checksRemaining === 0 ? "text-destructive" : "text-muted-foreground"
          }`}
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          {checksRemaining} check{checksRemaining !== 1 ? "s" : ""} left
        </span>
      </div>

      {/* ── Idle state ── */}
      {!loading && !result && !error && (
        <div className="px-5 py-4">
          <p className="text-xs text-muted-foreground">
            Scored on{" "}
            {DIMENSIONS.map((d, i) => (
              <span key={d.key}>
                <span className="text-secondary-foreground">{d.label}</span>
                {i < DIMENSIONS.length - 1 && (
                  <span className="text-muted-foreground"> · </span>
                )}
              </span>
            ))}
            . Up to {checksRemaining} evaluation{checksRemaining !== 1 ? "s" : ""} remaining.
          </p>
        </div>
      )}

      {/* ── Loading skeleton ── */}
      {loading && (
        <div className="flex flex-col gap-5 px-5 py-6 animate-pulse">
          {/* Verdict placeholder */}
          <div className="flex flex-col gap-2">
            <div className="h-3 w-full rounded-none bg-secondary" />
            <div className="h-3 w-4/5 rounded-none bg-secondary" />
          </div>
          {/* Score placeholder */}
          <div className="flex items-end gap-3">
            <div className="h-14 w-20 rounded-none bg-secondary" />
            <div className="mb-1 h-3 w-8 rounded-none bg-secondary" />
          </div>
          {/* Bars placeholder */}
          <div className="flex flex-col gap-3">
            {DIMENSIONS.map((d) => (
              <div key={d.key} className="flex flex-col gap-1.5">
                <div className="flex justify-between">
                  <div className="h-2.5 w-28 rounded-none bg-secondary" />
                  <div className="h-2.5 w-8 rounded-none bg-secondary" />
                </div>
                <div className="h-1 w-full rounded-none bg-secondary" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Error state ── */}
      {!loading && error && (
        <div className="px-5 py-4">
          <p
            className="text-label text-destructive"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            ✕ {error}
          </p>
        </div>
      )}

      {/* ── Results ── */}
      {!loading && result && (
        <div className="divide-y divide-border">

          {/* 1. Verdict — most actionable, leads */}
          <div className="px-5 py-4">
            <p className="text-[13px] leading-relaxed text-foreground">{result.verdict}</p>
          </div>

          {/* 2. Composite score + dimension bars */}
          <div className="flex flex-col gap-5 px-5 py-5">
            <div className="flex items-end gap-2">
              <span
                className={`font-mono text-5xl font-bold leading-none tabular-nums ${compositeColor(result.composite)}`}
              >
                {result.composite}
              </span>
              <span
                className="mb-1 text-label uppercase tracking-ui text-muted-foreground"
                style={{ fontFamily: "var(--font-dm-mono), monospace" }}
              >
                / 100
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {DIMENSIONS.map(({ key, label }) => {
                const value = result.dimensions[key];
                const { bar, text } = dimColors(value);
                return (
                  <div key={key} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-label text-muted-foreground"
                        style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                      >
                        {label}
                      </span>
                      <span
                        className={`font-mono text-label tabular-nums ${text}`}
                      >
                        {value}/10
                      </span>
                    </div>
                    <div className="h-1 w-full bg-secondary">
                      <div
                        className={`h-1 transition-all duration-700 ${bar}`}
                        style={{ width: `${value * 10}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Flags */}
          {result.flags.length > 0 && (
            <div className="flex flex-col gap-2 px-5 py-4">
              <span
                className="text-label uppercase tracking-ui text-muted-foreground"
                style={{ fontFamily: "var(--font-dm-mono), monospace" }}
              >
                Improve
              </span>
              <div className="flex flex-col gap-2">
                {result.flags.map((flag, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 text-label text-feedback-warning">→</span>
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

      {/* ── CTA — always pinned at bottom ── */}
      {!loading && (
        <div className="border-t border-border p-5">
          <button
            onClick={handleCheck}
            disabled={!canCheck}
            className="flex w-full items-center justify-center gap-2 border border-border bg-secondary py-3 font-mono text-[11px] uppercase tracking-ui text-secondary-foreground transition-colors hover:border-foreground/20 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
          >
            {hasChecked ? "Re-evaluate submission" : "Check my submission"}
          </button>
        </div>
      )}
    </div>
  );
}
