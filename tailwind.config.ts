import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: "rgb(var(--dark-50) / <alpha-value>)",
          100: "rgb(var(--dark-100) / <alpha-value>)",
          200: "rgb(var(--dark-200) / <alpha-value>)",
          300: "rgb(var(--dark-300) / <alpha-value>)",
          400: "rgb(var(--dark-400) / <alpha-value>)",
          500: "rgb(var(--dark-500) / <alpha-value>)",
          600: "rgb(var(--dark-600) / <alpha-value>)",
          700: "rgb(var(--dark-700) / <alpha-value>)",
          800: "rgb(var(--dark-800) / <alpha-value>)",
          900: "rgb(var(--dark-900) / <alpha-value>)",
          950: "rgb(var(--dark-950) / <alpha-value>)",
        },
        accent: {
          purple: "rgb(var(--accent-purple) / <alpha-value>)",
          blue: "rgb(var(--accent-blue) / <alpha-value>)",
          emerald: "rgb(var(--accent-emerald) / <alpha-value>)",
        },
        primary: "rgb(var(--primary) / <alpha-value>)",
        ai: "rgb(var(--ai) / <alpha-value>)",
        "primary-hover": "rgb(var(--primary-hover) / <alpha-value>)",
        "ai-hover": "rgb(var(--ai-hover) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "question-next": "questionNext 0.24s ease-out",
        "question-prev": "questionPrev 0.24s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        questionNext: {
          "0%": { opacity: "0", transform: "translateX(18px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        questionPrev: {
          "0%": { opacity: "0", transform: "translateX(-18px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
