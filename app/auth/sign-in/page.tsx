"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import AuthLeftPanel from "@/components/auth/AuthLeftPanel";
import { Button } from "@/components/ui/button";

const STATS = [
  { value: "312", label: "SUBMISSIONS" },
  { value: "18.4k", label: "TOTAL VOTES" },
  { value: "187", label: "APPROVED" },
  { value: "Live", label: "CHALLENGE", highlight: true },
];

function StatsFooter() {
  return (
    <div className="mx-14 border border-border bg-background">
      <div className="grid grid-cols-4 divide-x divide-border">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col gap-1 px-4 py-4">
            <span
              className={`text-2xl font-bold tracking-tight ${s.highlight ? "text-lime-400" : "text-foreground"}`}
            >
              {s.value}
            </span>
            <span className="font-mono text-label tracking-ui text-muted-foreground">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const isRegister = mode === "register";
  const signedOut = searchParams.get("signedOut") === "true";
  const redirect = searchParams.get("redirect");

  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    const params = new URLSearchParams({ email });
    if (redirect) params.set("redirect", redirect);
    router.push(`/auth/verify?${params.toString()}`);
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AuthLeftPanel
        eyebrow="QUICK AUTHENTICATION"
        headline={[
          { text: "Sign", style: "bold" },
          { text: "in to", style: "italic" },
          { text: "Science", style: "bold" },
        ]}
        description="The Science platform brings together researchers, engineers, and innovators to compete and push boundaries."
        footer={<StatsFooter />}
      />

      {/* Right — auth card */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="relative w-full max-w-[440px] border border-border/40 bg-card shadow-2xl">
          {/* Lime top accent */}
          <div className="absolute left-0 top-0 h-px w-full bg-lime-400/40" />

          {signedOut && (
            <div className="border-b border-border bg-feedback-status-success px-9 py-3">
              <p className="font-mono text-label tracking-ui text-feedback-success">
                ✓ You've been signed out
              </p>
            </div>
          )}

          <div className="px-9 pb-10 pt-7">
            {/* Step label */}
            <p className="font-mono text-label tracking-ui text-muted-foreground">
              STEP 01 OF 04&nbsp;&nbsp;·&nbsp;&nbsp;CREATE ACCOUNT
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-foreground">
              {isRegister ? "Create your account" : "Quick Authentication"}
            </h2>
          </div>

          <div className="border-t border-border" />

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 px-9 py-7"
          >
            <p className="text-sm font-normal leading-relaxed text-secondary-foreground">
              {isRegister
                ? "Create an account with your organisation email. No password required."
                : "Sign in with your organisation account via SSO. No password required."}
            </p>

            {/* Email field */}
            <div className="mt-2 flex flex-col gap-2">
              <label htmlFor="email" className="font-mono text-label tracking-ui text-secondary-foreground">
                YOUR EMAIL
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@institution.edu"
                className="h-11 border border-border bg-secondary px-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus-visible:border-feedback-success"
              />
            </div>

            {/* Primary CTA */}
            <button
              type="submit"
              className="mt-1 flex h-12 w-full items-center justify-center bg-feedback-success font-mono text-label font-medium uppercase tracking-ui text-black transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Continue with SSO →
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-secondary" />
              <span className="font-mono text-label tracking-ui text-muted-foreground">
                OR
              </span>
              <div className="h-px flex-1 bg-secondary" />
            </div>

            {/* Google CTA */}
            <Button variant="outline" className="h-12 w-full" type="button">
              Continue with Google
            </Button>
          </form>

          <div className="border-t border-border" />
          <p className="px-9 py-4 text-center font-mono text-label tracking-ui text-muted-foreground">
            By continuing you agree to the Terms of Use and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
