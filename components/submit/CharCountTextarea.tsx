"use client";

interface Props {
  id?: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  minLength: number;
  maxLength: number;
  error?: string;
}

export default function CharCountTextarea({
  id,
  label,
  placeholder,
  value,
  onChange,
  minLength,
  maxLength,
  error,
}: Props) {
  const count = value.length;
  const tooShort = count < minLength;
  const tooLong = count > maxLength;
  const inRange = !tooShort && !tooLong;
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <label htmlFor={inputId} className="font-mono text-label uppercase tracking-ui text-[#888]">
          {label}
        </label>
        <span
          className={`font-mono text-label tabular-nums ${
            tooLong
              ? "text-red-400"
              : inRange
              ? "text-[#4ade80]"
              : "text-[#888]"
          }`}
        >
          {count.toLocaleString()} / {minLength.toLocaleString()}–{maxLength.toLocaleString()}
        </span>
      </div>

      <textarea
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={10}
        className={`w-full resize-y border bg-[#0a0a0a] px-3.5 py-3 text-[13px] leading-relaxed text-white placeholder-[#555] outline-none transition-colors focus-visible:border-[#4ade80] ${
          error ? "border-red-500/50" : "border-[#2a2a2a]"
        }`}
      />

      <div className="flex items-center justify-between">
        <div className="h-1 flex-1 rounded-full bg-[#1c1c1c]">
          <div
            className={`h-1 rounded-full transition-all ${
              tooLong ? "bg-red-500" : inRange ? "bg-[#4ade80]" : "bg-[#2a2a2a]"
            }`}
            style={{ width: `${Math.min((count / maxLength) * 100, 100)}%` }}
          />
        </div>
        <span className="ml-3 font-mono text-label text-[#888]">
          {tooShort ? `${minLength - count} chars to go` : tooLong ? `${count - maxLength} over limit` : "✓ Good length"}
        </span>
      </div>

      {error && <p className="font-mono text-label text-red-400">{error}</p>}
    </div>
  );
}
