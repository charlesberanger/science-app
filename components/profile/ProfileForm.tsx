"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-[10px] uppercase tracking-widest text-[#777]"
      style={{ fontFamily: "var(--font-dm-mono), monospace" }}
    >
      {children}
    </span>
  );
}

function Input({
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
  const router = useRouter();

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
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
            <Label>First Name</Label>
            <Input
              placeholder="e.g. Alice"
              value={firstName}
              onChange={setFirstName}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Last Name</Label>
            <Input
              placeholder="e.g. Smith"
              value={lastName}
              onChange={setLastName}
            />
          </div>
        </div>

        {/* Title / Role */}
        <div className="flex flex-col gap-1.5">
          <Label>Title / Role</Label>
          <Input
            placeholder="e.g. PhD Researcher"
            value={title}
            onChange={setTitle}
          />
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-1.5">
          <Label>Bio *</Label>
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
          <Label>Institution</Label>
          <Input
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
          <button
            onClick={() => router.push("/profile")}
            className="border border-[#4ade80] bg-transparent px-6 py-2.5 text-[12px] font-medium text-[#4ade80] tracking-wider transition-colors hover:bg-[#4ade80]/10"
          >
            Save →
          </button>
        </div>
      </div>
    </div>
  );
}
