import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Colors from Design System
        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        cta: "rgb(var(--cta) / <alpha-value>)",

        // Dynamic Theme Colors
        background: "rgb(var(--background) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",

        // Original light colors from table (kept for reference/light mode)
        "light-bg": "#F8FAFC",
        "light-text": "#1E293B",
      },
      fontFamily: {
        heading: ["var(--font-fira-code)", "monospace"],
        body: ["var(--font-fira-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
