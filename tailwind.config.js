/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        border: "var(--color-border)",
        card: "var(--color-card)",
        "card-foreground": "var(--color-card-foreground)",
        primary: "var(--color-primary)",
        "primary-foreground": "var(--color-primary-foreground)",
        secondary: "var(--color-secondary)",
        "secondary-foreground": "var(--color-secondary-foreground)",
        accent: "var(--color-accent)",
        "accent-foreground": "var(--color-accent-foreground)",
        success: "var(--color-success)",
        "success-foreground": "var(--color-success-foreground)",
        warning: "var(--color-warning)",
        "warning-foreground": "var(--color-warning-foreground)",
        error: "var(--color-error)",
        "error-foreground": "var(--color-error-foreground)",
        destructive: "var(--color-destructive)",
        "destructive-foreground": "var(--color-destructive-foreground)",
        surface: "var(--color-surface)",
        "surface-foreground": "var(--color-surface-foreground)",
        dark: "var(--color-dark)",
        "dark-foreground": "var(--color-dark-foreground)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        cta: "var(--color-cta)",
        "cta-foreground": "var(--color-cta-foreground)",
      },
      gradientColorStops: {
        "gradient-primary-start": "var(--gradient-primary-start)",
        "gradient-primary-end": "var(--gradient-primary-end)",
        "gradient-secondary-start": "var(--gradient-secondary-start)",
        "gradient-secondary-end": "var(--gradient-secondary-end)",
        "gradient-accent-start": "var(--gradient-accent-start)",
        "gradient-accent-end": "var(--gradient-accent-end)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        professional: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
        "professional-lg": "0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)",
        "professional-xl": "0 8px 24px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)",
      },
      keyframes: {
        "ring-rotate": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "gradient-shift": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
      },
      animation: {
        "ring-rotate": "ring-rotate 2s linear infinite",
        "gradient-shift": "gradient-shift 4s ease-in-out infinite",
      },
    },

  },
  plugins: [require("@tailwindcss/aspect-ratio"), require("tailwindcss-animate")],
};
