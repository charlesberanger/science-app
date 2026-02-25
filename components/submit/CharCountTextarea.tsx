"use client";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  minLength: number;
  maxLength: number;
  error?: string;
}

export default function CharCountTextarea({
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

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <label className="font-mono text-label uppercase tracking-ui text-[#555]">
          {label}
        </label>
        <span
          className={`font-mono text-label tabular-nums ${
            tooLong
              ? "text-red-400"
              : inRange
              ? "text-[#4ade80]"
              : "text-[#555]"
          }`}
        >
          {count.toLocaleString()} / {minLength.toLocaleString()}–{maxLength.toLocaleString()}
        </span>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={10}
        className={`w-full resize-y border bg-[#0a0a0a] px-3.5 py-3 text-[13px] leading-relaxed text-white placeholder-[#3a3a3a] outline-none transition-colors focus:border-[#3a3a3a] ${
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
        <span className="ml-3 font-mono text-label text-[#333]">
          {tooShort ? `${minLength - count} chars to go` : tooLong ? `${count - maxLength} over limit` : "✓ Good length"}
        </span>
      </div>

      {error && <p className="font-mono text-label text-red-400">{error}</p>}
    </div>
  );
}
