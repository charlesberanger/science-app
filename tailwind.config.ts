import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ── shadcn semantic tokens ── */
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        /* ── Science DS semantic tokens (theme-aware) ── */
        science: {
          bg: "var(--bg-default)",
          surface: "var(--bg-surface)",
          elevated: "var(--bg-elevated)",
          border: "var(--border-default)",
        },
        lime: {
          400: "var(--lime-400)",
        },
        feedback: {
          success: "var(--feedback-success)",
          "success-hover": "var(--feedback-success-hover)",
          error: "var(--feedback-error)",
          warning: "var(--feedback-warning)",
          "status-success": "var(--status-bg-success)",
          "status-warning": "var(--status-bg-warning)",
          "status-error": "var(--status-bg-error)",
        },
      },

      /* ── Sharp corners — 0px radius everywhere ── */
      borderRadius: {
        DEFAULT: "0px",
        none: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        full: "9999px" /* only for pill badges / avatars */,
      },

      /* ── Typography ── */
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      fontSize: {
        label: ["11px", { lineHeight: "1.4" }], // smallest UI text — min readable size
        meta: ["12px", { lineHeight: "1.5" }], // secondary info, timestamps, helper text
      },
      letterSpacing: {
        ui: "0.1em", // all uppercase DM Mono labels — single source of truth
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
