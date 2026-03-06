"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AuthLeftPanel from "@/components/auth/AuthLeftPanel";
import { useAuth } from "@/contexts/AuthContext";

const STEPS = [
  { n: "✓",  label: "Email submitted",       done: true,    active: false },
  { n: "02", label: "Enter verification code", done: false,   active: true },
  { n: "03", label: "Access granted",          done: false,   active: false },
];

function StepsFooter() {
  return (
    <div className="flex flex-col gap-3 px-14">
      {STEPS.map((s) => (
        <div key={s.label} className="flex items-center gap-4">
          <div
            className={`flex h-7 w-7 shrink-0 items-center justify-center border font-mono text-ui ${
              s.done
                ? "border-[rgba(74,222,128,0.5)] bg-[rgba(4,18,8,0.7)] text-feedback-success"
                : s.active
                ? "border-[rgba(172,255,175,0.5)] bg-[rgba(7,18,9,0.7)] text-lime-400 shadow-[0_0_0_4px_rgba(172,255,175,0.2)]"
                : "border-[rgba(42,42,42,0.5)] bg-secondary text-muted-foreground"
            }`}
          >
            {s.n}
          </div>
          <span
            className={`text-sm ${
              s.done ? "text-secondary-foreground" : s.active ? "font-medium text-foreground" : "text-muted-foreground"
            }`}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function OtpInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(i: number, char: string) {
    const digit = char.replace(/\D/g, "").slice(-1);
    const next = [...value];
    next[i] = digit;
    onChange(next);
    if (digit && i < 5) inputs.current[i + 1]?.focus();
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !value[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    const next = [...value];
    pasted.forEach((d, i) => { next[i] = d; });
    onChange(next);
    const nextEmpty = pasted.length < 6 ? pasted.length : 5;
    inputs.current[nextEmpty]?.focus();
  }

  return (
    <div className="flex gap-1.5" role="group" aria-label="Verification code">
      {value.map((digit, i) => {
        const isCurrent = !value[i] && (i === 0 || value[i - 1] !== "");
        return (
          <input
            key={i}
            ref={(el) => { inputs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            autoComplete={i === 0 ? "one-time-code" : "off"}
            aria-label={`Digit ${i + 1} of 6`}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className={`h-16 w-13.5 border bg-secondary text-center font-mono text-2xl text-lime-400 outline-none focus-visible:ring-1 focus-visible:ring-ring/50 transition-colors ${
              isCurrent
                ? "border-lime-400 shadow-[0_0_0_3px_rgba(172,255,175,0.18)]"
                : digit
                ? "border-muted-foreground"
                : "border-border"
            }`}
          />
        );
      })}
    </div>
  );
}

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useAuth();
  const email = searchParams.get("email") ?? "you@institution.edu";
  const redirect = searchParams.get("redirect") ?? "/profile/edit?setup=true";

  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(42);

  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const filled = digits.every((d) => d !== "");

  function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!filled) return;
    // Mock: any 6-digit code is accepted
    signIn();
    router.push(redirect);
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AuthLeftPanel
        eyebrow="IDENTITY VERIFICATION"
        headline={[
          { text: "Verify",   style: "bold" },
          { text: "your",     style: "italic" },
          { text: "identity", style: "bold" },
        ]}
        description={`A one-time code has been sent to ${email}. Enter it below to complete sign-in.`}
        footer={<StepsFooter />}
      />

      {/* Right — OTP card */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="relative w-full max-w-110 border border-[rgba(42,42,42,0.4)] bg-card shadow-[0px_20px_56px_0px_rgba(0,0,0,0.5)]">
          <div className="absolute left-0 top-0 h-px w-full bg-[rgba(172,255,175,0.4)]" />

          <div className="px-9 pb-6 pt-7">
            <p className="font-mono text-label text-muted-foreground">
              STEP 01 OF 04&nbsp;&nbsp;·&nbsp;&nbsp;CREATE ACCOUNT
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-foreground">
              Enter your code
            </h2>
          </div>

          <div className="border-t border-border" />

          <form onSubmit={handleVerify} className="flex flex-col gap-5 px-9 py-7">
            <p className="text-sm font-normal leading-relaxed text-secondary-foreground">
              We sent a 6-digit code to{" "}
              <span className="text-foreground">{email}</span>. Expires in 09:42.
            </p>

            <OtpInput value={digits} onChange={setDigits} />

            {/* Progress dots */}
            <div className="flex items-center gap-1.5">
              {digits.map((d, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-[width,background-color] duration-150 ${
                    d ? (i === digits.filter(Boolean).length - 1 ? "w-4 bg-lime-400" : "w-1.5 bg-feedback-success") : "w-1.5 bg-secondary"
                  }`}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={!filled}
              className="flex h-12 w-full items-center justify-center bg-lime-400 font-mono text-label font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-30"
            >
              Verify Code →
            </button>

            <div className="flex items-center justify-between">
              <span className="font-mono text-label text-muted-foreground">
                {timer > 0 ? `Resend available in 0:${String(timer).padStart(2, "0")}` : "Code expired"}
              </span>
              <button
                type="button"
                onClick={() => setTimer(42)}
                disabled={timer > 0}
                className="font-mono text-label text-muted-foreground transition-colors hover:text-secondary-foreground disabled:pointer-events-none"
              >
                Resend code
              </button>
            </div>
          </form>

          <div className="border-t border-border" />

          <div className="flex items-center justify-between px-9 py-4">
            <Link
              href="/auth/sign-in"
              className="font-mono text-label text-muted-foreground transition-colors hover:text-secondary-foreground"
            >
              ← BACK TO SIGN-IN
            </Link>
            <span className="font-mono text-label text-muted-foreground">
              Having trouble?{" "}
              <button type="button" className="cursor-pointer hover:text-foreground">Contact support</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyForm />
    </Suspense>
  );
}
