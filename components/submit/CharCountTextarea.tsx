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
        <label htmlFor={inputId} className="font-mono text-sm uppercase tracking-ui text-muted-foreground">
          {label}
        </label>
        <span
          className={`font-mono text-label tabular-nums ${
            tooLong
              ? "text-red-400"
              : inRange
              ? "text-feedback-success"
              : "text-muted-foreground"
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
        className={`w-full resize-y border bg-background px-3.5 py-3 text-[13px] leading-relaxed text-foreground placeholder:text-muted-foreground outline-none transition-colors focus-visible:border-feedback-success ${
          error ? "border-red-500/50" : "border-border"
        }`}
      />

      <div className="flex items-center justify-between">
        <div className="h-1 flex-1 rounded-full bg-secondary">
          <div
            className={`h-1 rounded-full transition-all ${
              tooLong ? "bg-red-500" : inRange ? "bg-feedback-success" : "bg-secondary"
            }`}
            style={{ width: `${Math.min((count / maxLength) * 100, 100)}%` }}
          />
        </div>
        <span className="ml-3 font-mono text-label text-muted-foreground">
          {tooShort ? `${minLength - count} chars to go` : tooLong ? `${count - maxLength} over limit` : "✓ Good length"}
        </span>
      </div>

      {error && <p className="font-mono text-label text-red-400">{error}</p>}
    </div>
  );
}
