"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-label uppercase tracking-ui text-secondary-foreground"
      style={{ fontFamily: "var(--font-dm-mono), monospace" }}
    >
      {children}
    </label>
  );
}

function FieldInput({
  id,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      id={id}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-11 w-full border border-border bg-secondary px-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus-visible:border-feedback-success transition-colors"
    />
  );
}

export default function ProfileForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [institution, setInstitution] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const router = useRouter();
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const photoUrlRef = useRef<string | null>(null);

  // Revoke object URL on unmount to prevent memory leak
  useEffect(() => {
    return () => {
      if (photoUrlRef.current) URL.revokeObjectURL(photoUrlRef.current);
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    // Revoke previous URL before creating a new one
    if (photoUrlRef.current) URL.revokeObjectURL(photoUrlRef.current);
    const url = URL.createObjectURL(file);
    photoUrlRef.current = url;
    setPhoto(url);
  }

  const initials =
    [firstName[0], lastName[0]].filter(Boolean).join("").toUpperCase() || "AS";

  const TOTAL_FIELDS = 6;
  const completedFields = [firstName, lastName, title, bio, institution, photo ?? ""].filter(
    (v) => v.trim().length > 0
  ).length;
  const completionPct = Math.round((completedFields / TOTAL_FIELDS) * 100);

  return (
    <div className="flex flex-col gap-8 sm:flex-row sm:gap-10">
      {/* Avatar column */}
      <div className="flex flex-col items-center gap-3 sm:shrink-0">
        <div className="flex h-[72px] w-[72px] items-center justify-center border border-[rgba(42,42,42,0.5)] bg-[rgba(28,28,28,0.5)]">
          {photo ? (
            <img
              src={photo}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <span
              className="text-2xl text-secondary-foreground"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              {initials}
            </span>
          )}
        </div>
        <label className="cursor-pointer border border-border px-3 py-1.5 text-ui text-foreground transition-colors hover:border-border hover:text-secondary-foreground">
          Upload photo
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </label>
      </div>

      {/* Fields column */}
      <div className="flex flex-1 flex-col gap-5">
        {/* First + Last name row */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <FieldLabel htmlFor="profile-first-name">First Name</FieldLabel>
            <FieldInput
              id="profile-first-name"
              placeholder="e.g. Alice"
              value={firstName}
              onChange={setFirstName}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <FieldLabel htmlFor="profile-last-name">Last Name</FieldLabel>
            <FieldInput
              id="profile-last-name"
              placeholder="e.g. Smith"
              value={lastName}
              onChange={setLastName}
            />
          </div>
        </div>

        {/* Title / Role */}
        <div className="flex flex-col gap-1.5">
          <FieldLabel htmlFor="profile-title">Title / Role</FieldLabel>
          <FieldInput
            id="profile-title"
            placeholder="e.g. PhD Researcher"
            value={title}
            onChange={setTitle}
          />
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-1.5">
          <FieldLabel htmlFor="profile-bio">Bio *</FieldLabel>
          <textarea
            id="profile-bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Describe your research or project focus…"
            rows={5}
            className="w-full resize-none border border-border bg-secondary px-3.5 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground outline-none focus-visible:border-feedback-success transition-colors"
          />
        </div>

        {/* Institution */}
        <div className="flex flex-col gap-1.5 sm:w-1/2">
          <FieldLabel htmlFor="profile-institution">Institution</FieldLabel>
          <FieldInput
            id="profile-institution"
            placeholder="e.g. MIT"
            value={institution}
            onChange={setInstitution}
          />
        </div>

        {/* Completeness indicator */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span
              className="text-label uppercase tracking-ui text-muted-foreground"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              Profile completeness
            </span>
            <span
              className={`text-label tracking-ui ${completedFields === TOTAL_FIELDS ? "text-feedback-success" : "text-muted-foreground"}`}
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
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

        {/* Submit */}
        <div className="flex items-center justify-between border-t border-border pt-5">
          <p
            className="text-label text-muted-foreground tracking-ui"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            * Required to submit a project
          </p>
          <div className="flex items-center gap-3">
            {saved && (
              <span
                className="text-ui text-feedback-success"
                style={{ fontFamily: "var(--font-dm-mono), monospace" }}
              >
                Saved ✓
              </span>
            )}
            <button
              onClick={() => {
                setSaved(true);
                if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
                saveTimerRef.current = setTimeout(() => {
                  setSaved(false);
                  router.push("/profile");
                }, 1200);
              }}
              className="border border-feedback-success bg-transparent px-6 py-2.5 text-label font-medium text-feedback-success tracking-ui transition-colors hover:bg-feedback-success/10"
            >
              Save →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
