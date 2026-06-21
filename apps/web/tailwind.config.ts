import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Primary — Navy
        navy: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#1A2F5A",
          600: "#0D1B3E",
          700: "#091228",
          800: "#060C1A",
          900: "#03060D",
          DEFAULT: "#0D1B3E",
        },
        // Brand Accents
        brand: {
          red: "#C0392B",
          "red-hover": "#A93226",
          gold: "#C9A84C",
          "gold-light": "#F5E6C8",
        },
        // Semantic
        success: {
          DEFAULT: "#1A7A4A",
          light: "#D5F5E3",
        },
        warning: {
          DEFAULT: "#B7860B",
          light: "#FEF9E7",
        },
        danger: {
          DEFAULT: "#C0392B",
          light: "#FDEDEC",
        },
        // Neutral Surface
        surface: {
          DEFAULT: "#FFFFFF",
          raised: "#F8FAFC",
          overlay: "#F1F5F9",
          border: "#E2E8F0",
          "border-strong": "#CBD5E1",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-oswald)", "Oswald", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["4rem", { lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.02em" }],
        h1: ["3rem", { lineHeight: "1.15", fontWeight: "700" }],
        h2: ["2.25rem", { lineHeight: "1.2", fontWeight: "700" }],
        h3: ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        h4: ["1.125rem", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["1.0625rem", { lineHeight: "1.7", fontWeight: "400" }],
        body: ["0.9375rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["0.8125rem", { lineHeight: "1.5", fontWeight: "400" }],
        caption: ["0.6875rem", { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0.05em" }],
      },
      borderRadius: {
        card: "12px",
        input: "8px",
        button: "6px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)",
        "card-hover": "0 4px 16px rgba(0,0,0,0.08)",
        dropdown: "0 10px 40px rgba(0,0,0,0.12)",
      },
      transitionDuration: {
        "200": "200ms",
        "150": "150ms",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "count-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in": "fade-in 200ms ease-out",
        "slide-up": "slide-up 200ms ease-out",
        "scale-in": "scale-in 150ms ease-out",
        "count-up": "count-up 400ms ease-out",
        shimmer: "shimmer 2s infinite linear",
      },
      maxWidth: {
        content: "1400px",
      },
      spacing: {
        sidebar: "260px",
        "sidebar-collapsed": "64px",
        topbar: "64px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
