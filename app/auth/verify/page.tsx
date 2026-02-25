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
            className={`flex h-7 w-7 shrink-0 items-center justify-center border font-mono text-[11px] ${
              s.done
                ? "border-[rgba(74,222,128,0.5)] bg-[rgba(4,18,8,0.7)] text-[#4ade80]"
                : s.active
                ? "border-[rgba(172,255,175,0.5)] bg-[rgba(7,18,9,0.7)] text-[#acffaf] shadow-[0_0_0_4px_rgba(172,255,175,0.2)]"
                : "border-[rgba(42,42,42,0.5)] bg-[#1c1c1c] text-[#555]"
            }`}
          >
            {s.n}
          </div>
          <span
            className={`text-[13px] ${
              s.done ? "text-[#777]" : s.active ? "font-medium text-white" : "text-[#3a3a3a]"
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
    <div className="flex gap-1.5">
      {value.map((digit, i) => {
        const isCurrent = !value[i] && (i === 0 || value[i - 1] !== "");
        return (
          <input
            key={i}
            ref={(el) => { inputs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className={`h-16 w-[54px] border bg-[#1c1c1c] text-center font-mono text-[24px] text-[#acffaf] outline-none transition-all ${
              isCurrent
                ? "border-[#acffaf] shadow-[0_0_0_3px_rgba(172,255,175,0.18)]"
                : digit
                ? "border-[#555]"
                : "border-[#2a2a2a]"
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
  const redirect = searchParams.get("redirect") ?? "/get-started";

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
    <div className="flex min-h-screen bg-[#0a0a0a]">
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
        <div className="relative w-full max-w-[440px] border border-[rgba(42,42,42,0.4)] bg-[#111] shadow-[0px_20px_56px_0px_rgba(0,0,0,0.5)]">
          <div className="absolute left-0 top-0 h-px w-full bg-[rgba(172,255,175,0.4)]" />

          <div className="px-9 pb-6 pt-7">
            <p className="font-mono text-label tracking-ui text-[#3a3a3a]">
              STEP 01 OF 04&nbsp;&nbsp;·&nbsp;&nbsp;CREATE ACCOUNT
            </p>
            <h2 className="mt-2 text-[20px] font-bold tracking-tight text-white">
              Enter your code
            </h2>
          </div>

          <div className="border-t border-[#1c1c1c]" />

          <form onSubmit={handleVerify} className="flex flex-col gap-5 px-9 py-7">
            <p className="text-[13px] font-normal leading-[1.55] text-[#777]">
              We sent a 6-digit code to{" "}
              <span className="text-white">{email}</span>. Expires in 09:42.
            </p>

            <OtpInput value={digits} onChange={setDigits} />

            {/* Progress dots */}
            <div className="flex items-center gap-1.5">
              {digits.map((d, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    d ? (i === digits.filter(Boolean).length - 1 ? "w-4 bg-[#acffaf]" : "w-1.5 bg-[#4ade80]") : "w-1.5 bg-[#2a2a2a]"
                  }`}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={!filled}
              className="flex h-12 w-full items-center justify-center bg-[#acffaf] font-mono text-[12px] font-medium uppercase tracking-ui text-black transition-opacity hover:opacity-90 disabled:opacity-30"
            >
              Verify Code →
            </button>

            <div className="flex items-center justify-between">
              <span className="font-mono text-label tracking-ui text-[#555]">
                {timer > 0 ? `Resend available in 0:${String(timer).padStart(2, "0")}` : "Code expired"}
              </span>
              <button
                type="button"
                onClick={() => setTimer(42)}
                disabled={timer > 0}
                className="font-mono text-label tracking-ui text-[#3a3a3a] transition-colors hover:text-[#777] disabled:pointer-events-none"
              >
                Resend code
              </button>
            </div>
          </form>

          <div className="border-t border-[#1c1c1c]" />

          <div className="flex items-center justify-between px-9 py-4">
            <Link
              href="/auth/sign-in"
              className="font-mono text-label tracking-ui text-[#555] transition-colors hover:text-[#777]"
            >
              ← BACK TO SIGN-IN
            </Link>
            <span className="font-mono text-label tracking-ui text-[#3a3a3a]">
              Having trouble?{" "}
              <span className="cursor-pointer hover:text-[#555]">Contact support</span>
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
