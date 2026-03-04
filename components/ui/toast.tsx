"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// ── Types ────────────────────────────────────────────────────────────────────

type ToastVariant = "success" | "neutral" | "error";

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (opts: { message: string; variant?: ToastVariant }) => void;
}

// ── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

const VARIANT_STYLES: Record<ToastVariant, string> = {
  success: "border-feedback-success text-feedback-success",
  error:   "border-feedback-error   text-feedback-error",
  neutral: "border-border           text-secondary-foreground",
};

const DISMISS_MS = 3000;
const MAX_TOASTS = 3;

// ── Provider ─────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const counter = useRef(0);
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  // Clear all pending timers on unmount
  useEffect(() => {
    return () => {
      timers.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  const dismiss = useCallback((id: number) => {
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ message, variant = "neutral" }: { message: string; variant?: ToastVariant }) => {
      const id = ++counter.current;
      setItems((prev) => [...prev.slice(-(MAX_TOASTS - 1)), { id, message, variant }]);
      const timer = setTimeout(() => dismiss(id), DISMISS_MS);
      timers.current.set(id, timer);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Portal-like fixed container — bottom-right */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-5 right-5 z-50 flex flex-col gap-2"
        style={{ fontFamily: "var(--font-dm-mono), monospace" }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={`pointer-events-auto flex items-center justify-between gap-4 border bg-card px-4 py-3 text-ui uppercase tracking-[0.1em] shadow-lg animate-toast-in ${VARIANT_STYLES[item.variant]}`}
          >
            <span>{item.message}</span>
            <button
              onClick={() => dismiss(item.id)}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
