"use client";

interface FilterTabsProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function FilterTabs({ options, value, onChange }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-1" role="tablist">
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt)}
            className={`font-mono border px-3 py-1.5 text-ui uppercase tracking-ui transition-colors ${
              active
                ? "border-feedback-success bg-feedback-success text-black"
                : "border-border bg-card text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
