"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/toast";

// ── Mock seed data (mirrors app/profile/page.tsx — backend replaces later) ───
const SEED_DATA = {
  firstName: "Alice",
  lastName: "S.",
  title: "Researcher",
  bio: "This project investigates passive turbulence suppression through micro-textured surface geometries inspired by shark-skin denticles. By optimising riblet geometry for varying Reynolds numbers, we demonstrate a 14.2% reduction in skin-friction drag.",
  institution: "MiT Applied Sciences",
};

const BIO_MAX = 500;

// ── Sub-components ───────────────────────────────────────────────────────────

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-border bg-card">
      <div className="border-b border-border px-6 py-4">
        <h2 className="font-mono text-sm uppercase tracking-ui text-muted-foreground">
          {title}
        </h2>
      </div>
      <div className="flex flex-col gap-5 p-6">{children}</div>
    </div>
  );
}

function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-mono text-label uppercase tracking-ui text-secondary-foreground"
    >
      {children}
      {required ? <span className="text-feedback-error"> *</span> : null}
    </label>
  );
}

function FieldInput({
  id,
  placeholder,
  value,
  onChange,
  error,
}: {
  id: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`h-11 w-full border bg-secondary px-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus-visible:border-feedback-success ${
          error ? "border-feedback-error/50" : "border-border"
        }`}
      />
      {error ? (
        <p className="font-mono text-label text-feedback-error">{error}</p>
      ) : null}
    </div>
  );
}

// ── Main form ────────────────────────────────────────────────────────────────

export default function ProfileForm() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // Pre-populate from mock data
  const [firstName, setFirstName] = useState(SEED_DATA.firstName);
  const [lastName, setLastName] = useState(SEED_DATA.lastName);
  const [title, setTitle] = useState(SEED_DATA.title);
  const [bio, setBio] = useState(SEED_DATA.bio);
  const [institution, setInstitution] = useState(SEED_DATA.institution);
  const [photo, setPhoto] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const photoUrlRef = useRef<string | null>(null);

  // Revoke object URL on unmount to prevent memory leak
  useEffect(() => {
    return () => {
      if (photoUrlRef.current) URL.revokeObjectURL(photoUrlRef.current);
    };
  }, []);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (photoUrlRef.current) URL.revokeObjectURL(photoUrlRef.current);
    const url = URL.createObjectURL(file);
    photoUrlRef.current = url;
    setPhoto(url);
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!firstName.trim()) next.firstName = "First name is required";
    if (!lastName.trim()) next.lastName = "Last name is required";
    if (!bio.trim()) next.bio = "Bio is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    toast({ message: "Profile saved", variant: "success" });
    router.push("/profile");
  }

  function handleCancel() {
    router.push("/profile");
  }

  // ── Derived values ──────────────────────────────────────────────────────────

  const initials =
    [firstName[0], lastName[0]].filter(Boolean).join("").toUpperCase() ||
    currentUser.initials;

  const displayName = [firstName.trim(), lastName.trim()]
    .filter(Boolean)
    .join(" ");

  const bioCount = bio.length;
  const bioOver = bioCount > BIO_MAX;

  // Completeness
  const TOTAL_FIELDS = 6;
  const completedFields = [
    firstName,
    lastName,
    title,
    bio,
    institution,
    photo ?? "",
  ].filter((v) => v.trim().length > 0).length;
  const completionPct = Math.round((completedFields / TOTAL_FIELDS) * 100);

  return (
    <div className="flex flex-col gap-6">
      {/* ── Personal Info ──────────────────────────────────────────────────── */}
      <SectionCard title="Personal Info">
        <div className="flex flex-col gap-5 sm:flex-row sm:gap-8">
          {/* Avatar column */}
          <div className="flex flex-col items-center gap-3 sm:shrink-0">
            <label className="group relative cursor-pointer">
              <div className="flex h-20 w-20 items-center justify-center border border-border/50 bg-secondary/50 overflow-hidden">
                {photo ? (
                  <img
                    src={photo}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="font-mono text-2xl text-secondary-foreground">
                    {initials}
                  </span>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </label>
            <p className="font-mono text-label text-muted-foreground tracking-ui text-center">
              JPG, PNG or WebP
              <br />
              max 5 MB
            </p>
          </div>

          {/* Fields */}
          <div className="flex flex-1 flex-col gap-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <FieldLabel htmlFor="profile-first-name" required>
                  First Name
                </FieldLabel>
                <FieldInput
                  id="profile-first-name"
                  placeholder="e.g. Alice"
                  value={firstName}
                  onChange={(v) => {
                    setFirstName(v);
                    if (errors.firstName) {
                      setErrors((prev) => {
                        const { firstName: _, ...rest } = prev;
                        return rest;
                      });
                    }
                  }}
                  error={errors.firstName}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <FieldLabel htmlFor="profile-last-name" required>
                  Last Name
                </FieldLabel>
                <FieldInput
                  id="profile-last-name"
                  placeholder="e.g. Smith"
                  value={lastName}
                  onChange={(v) => {
                    setLastName(v);
                    if (errors.lastName) {
                      setErrors((prev) => {
                        const { lastName: _, ...rest } = prev;
                        return rest;
                      });
                    }
                  }}
                  error={errors.lastName}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <FieldLabel htmlFor="profile-title">Title / Role</FieldLabel>
              <FieldInput
                id="profile-title"
                placeholder="e.g. PhD Researcher"
                value={title}
                onChange={setTitle}
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:w-1/2">
              <FieldLabel htmlFor="profile-institution">Institution</FieldLabel>
              <FieldInput
                id="profile-institution"
                placeholder="e.g. MIT"
                value={institution}
                onChange={setInstitution}
              />
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ── About ──────────────────────────────────────────────────────────── */}
      <SectionCard title="About">
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <FieldLabel htmlFor="profile-bio" required>
              Bio
            </FieldLabel>
            <span
              className={`font-mono text-label tabular-nums ${
                bioOver
                  ? "text-feedback-error"
                  : bioCount > 0
                    ? "text-feedback-success"
                    : "text-muted-foreground"
              }`}
            >
              {bioCount} / {BIO_MAX}
            </span>
          </div>

          <textarea
            id="profile-bio"
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
              if (errors.bio) {
                setErrors((prev) => {
                  const { bio: _, ...rest } = prev;
                  return rest;
                });
              }
            }}
            placeholder="Describe your research or project focus…"
            rows={5}
            className={`w-full resize-none border bg-secondary px-3.5 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground outline-none transition-colors focus-visible:border-feedback-success ${
              errors.bio ? "border-feedback-error/50" : "border-border"
            }`}
          />

          <div className="flex items-center justify-between">
            <div className="h-1 flex-1 bg-secondary">
              <div
                className={`h-1 transition-all duration-300 ${
                  bioOver
                    ? "bg-feedback-error"
                    : bioCount > 0
                      ? "bg-feedback-success"
                      : "bg-secondary"
                }`}
                style={{
                  width: `${Math.min((bioCount / BIO_MAX) * 100, 100)}%`,
                }}
              />
            </div>
            <span className="ml-3 font-mono text-label text-muted-foreground">
              {bioOver
                ? `${bioCount - BIO_MAX} over limit`
                : bioCount === 0
                  ? `${BIO_MAX} chars remaining`
                  : `${BIO_MAX - bioCount} chars remaining`}
            </span>
          </div>

          {errors.bio ? (
            <p className="font-mono text-label text-feedback-error">
              {errors.bio}
            </p>
          ) : null}
        </div>
      </SectionCard>

      {/* ── Completeness indicator ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-label uppercase tracking-ui text-muted-foreground">
            Profile completeness
          </span>
          <span
            className={`font-mono text-label tracking-ui ${
              completedFields === TOTAL_FIELDS
                ? "text-feedback-success"
                : "text-muted-foreground"
            }`}
          >
            {completedFields}/{TOTAL_FIELDS}
          </span>
        </div>
        <div className="h-1 w-full bg-secondary">
          <div
            className="h-1 bg-feedback-success transition-all duration-300"
            style={{ width: `${completionPct}%` }}
          />
        </div>
      </div>

      {/* ── Live Preview ───────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <p className="font-mono text-label uppercase tracking-ui text-muted-foreground">
          Preview
        </p>
        <div className="border border-border bg-card p-6">
          <div className="flex items-center gap-5">
            <div className="flex h-13 w-13 shrink-0 items-center justify-center border border-border/50 bg-secondary/50 overflow-hidden">
              {photo ? (
                <img
                  src={photo}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-mono text-base text-secondary-foreground">
                  {initials}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-xl font-bold text-foreground">
                {displayName || "Your Name"}
              </p>
              {title ? (
                <p className="font-mono text-label uppercase tracking-ui text-secondary-foreground">
                  {title}
                </p>
              ) : null}
              {institution ? (
                <p className="font-mono text-label tracking-ui text-muted-foreground">
                  {institution}
                </p>
              ) : null}
            </div>
          </div>
          {bio.trim() ? (
            <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-secondary-foreground">
              {bio.length > 200 ? `${bio.slice(0, 200)}…` : bio}
            </p>
          ) : null}
        </div>
      </div>

      {/* ── Actions ────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-t border-border pt-5">
        <p className="font-mono text-label text-muted-foreground tracking-ui">
          * Required to submit a project
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCancel}
            type="button"
            className="border border-border bg-transparent px-6 py-2.5 text-label font-medium text-muted-foreground tracking-ui transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            type="button"
            className="border border-feedback-success bg-transparent px-6 py-2.5 text-label font-medium text-feedback-success tracking-ui transition-colors hover:bg-feedback-success/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}
