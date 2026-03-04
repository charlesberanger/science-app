import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge that text-ui and text-label are font-size utilities,
// not text-color utilities. Without this, twMerge drops them when a variant
// adds a text-color class (e.g. text-feedback-success on Badge).
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": ["text-ui", "text-label"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
