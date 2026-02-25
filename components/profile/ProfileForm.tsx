"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-[10px] uppercase tracking-widest text-[#777]"
      style={{ fontFamily: "var(--font-dm-mono), monospace" }}
    >
      {children}
    </span>
  );
}

function FieldInput({
  placeholder,
  value,
  onChange,
}: {
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-11 w-full border border-[#2a2a2a] bg-[#1c1c1c] px-3.5 text-[14px] text-white placeholder-[#3a3a3a] outline-none focus:border-[#3a3a3a] transition-colors"
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
              className="text-[22px] text-[#999]"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              {initials}
            </span>
          )}
        </div>
        <label className="cursor-pointer border border-[#2a2a2a] px-3 py-1.5 text-[11px] text-white transition-colors hover:border-[#3a3a3a] hover:text-[#ccc]">
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
            <FieldLabel>First Name</FieldLabel>
            <FieldInput
              placeholder="e.g. Alice"
              value={firstName}
              onChange={setFirstName}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <FieldLabel>Last Name</FieldLabel>
            <FieldInput
              placeholder="e.g. Smith"
              value={lastName}
              onChange={setLastName}
            />
          </div>
        </div>

        {/* Title / Role */}
        <div className="flex flex-col gap-1.5">
          <FieldLabel>Title / Role</FieldLabel>
          <FieldInput
            placeholder="e.g. PhD Researcher"
            value={title}
            onChange={setTitle}
          />
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-1.5">
          <FieldLabel>Bio *</FieldLabel>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Describe your research or project focus…"
            rows={5}
            className="w-full resize-none border border-[#2a2a2a] bg-[#161616] px-3.5 py-3 text-[13px] leading-relaxed text-white placeholder-[#3a3a3a] outline-none focus:border-[#3a3a3a] transition-colors"
          />
        </div>

        {/* Institution */}
        <div className="flex flex-col gap-1.5 sm:w-1/2">
          <FieldLabel>Institution</FieldLabel>
          <FieldInput
            placeholder="e.g. MIT"
            value={institution}
            onChange={setInstitution}
          />
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between border-t border-[#2a2a2a] pt-5">
          <p
            className="text-[10px] text-[#555] tracking-wider"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            * Required to submit a project
          </p>
          <div className="flex items-center gap-3">
            {saved && (
              <span
                className="text-[11px] text-[#4ade80]"
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
              className="border border-[#4ade80] bg-transparent px-6 py-2.5 text-[12px] font-medium text-[#4ade80] tracking-wider transition-colors hover:bg-[#4ade80]/10"
            >
              Save →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
