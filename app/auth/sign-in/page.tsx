"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
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
              className={`font-doto font-bold text-2xl ${s.highlight ? "text-lime-400" : "text-foreground"}`}
            >
              {s.value}
            </span>
            <span className="font-mono text-label text-muted-foreground">
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
        eyebrow={isRegister ? "JOIN THE PLATFORM" : "WELCOME BACK"}
        headline={
          isRegister
            ? [
                { text: "Create", style: "bold" },
                { text: "your account", style: "bold" },
              ]
            : [
                { text: "Sign in", style: "bold" },
                { text: "to Science", style: "bold" },
              ]
        }
        description={
          isRegister
            ? "Join the Science platform to submit your research, vote on designs, and compete for the challenge prize."
            : "The Science platform brings together researchers, engineers, and innovators to compete and push boundaries."
        }
        footer={<StatsFooter />}
      />

      {/* Right — auth card */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="relative w-full max-w-110 border border-border/40 bg-card shadow-2xl">
          {/* Lime top accent */}
          <div className="absolute left-0 top-0 h-px w-full bg-lime-400/40" />

          {signedOut && (
            <div className="border-b border-border bg-feedback-status-success px-9 py-3">
              <p className="font-mono text-label text-feedback-success">
                <span aria-hidden="true">✓</span> You've been signed out
              </p>
            </div>
          )}

          {/* Mode tabs */}
          <div className="grid grid-cols-2 border-b border-border">
            <Link
              href="/auth/sign-in"
              className={`flex items-center justify-center py-4 font-mono text-label transition-colors ${
                !isRegister
                  ? "border-b-2 border-lime-400 text-foreground"
                  : "text-muted-foreground hover:text-secondary-foreground"
              }`}
            >
              SIGN IN
            </Link>
            <Link
              href="/auth/sign-in?mode=register"
              className={`flex items-center justify-center py-4 font-mono text-label transition-colors ${
                isRegister
                  ? "border-b-2 border-lime-400 text-foreground"
                  : "text-muted-foreground hover:text-secondary-foreground"
              }`}
            >
              CREATE ACCOUNT
            </Link>
          </div>

          <div className="px-9 pb-6 pt-7">
            <h2 className="font-doto font-bold text-xl text-foreground">
              {isRegister ? "Create your account" : "Welcome back"}
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
              <label
                htmlFor="email"
                className="font-mono text-label text-secondary-foreground"
              >
                YOUR EMAIL
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                spellCheck={false}
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
              className="mt-1 flex h-12 w-full items-center justify-center bg-feedback-success font-mono text-label font-medium text-black transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {isRegister ? "Create Account →" : "Sign In →"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-secondary" />
              <span className="font-mono text-label text-muted-foreground">
                OR
              </span>
              <div className="h-px flex-1 bg-secondary" />
            </div>

            {/* Google CTA */}
            <Button variant="outline" className="h-12 w-full gap-3" type="button">
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path d="M17.64 9.2a10.3 10.3 0 0 0-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92A8.78 8.78 0 0 0 17.64 9.2z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.97 10.71A5.41 5.41 0 0 1 3.68 9c0-.6.1-1.17.28-1.71V4.96H.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.04l3.01-2.33z" fill="#FBBC05"/>
                <path d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.96l3.01 2.33C4.68 5.17 6.66 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </Button>
          </form>

          <div className="border-t border-border" />

          <div className="flex flex-col gap-2 px-9 py-4 text-center">
            <p className="font-mono text-label text-muted-foreground">
              {isRegister ? (
                <>Already have an account?{" "}
                  <Link href="/auth/sign-in" className="text-foreground hover:text-lime-400 transition-colors">
                    Sign in
                  </Link>
                </>
              ) : (
                <>Don&apos;t have an account?{" "}
                  <Link href="/auth/sign-in?mode=register" className="text-foreground hover:text-lime-400 transition-colors">
                    Create one
                  </Link>
                </>
              )}
            </p>
            <p className="font-mono text-label text-muted-foreground">
              By continuing you agree to the Terms of Use and Privacy Policy
            </p>
          </div>
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
