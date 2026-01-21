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
        // Cách viết chuẩn để Tailwind v3/v4 nhận diện biến CSS
        primary: "rgb(var(--primary))",
        secondary: "rgb(var(--secondary))",
        cta: "rgb(var(--cta))",
        background: "rgb(var(--background))",
        surface: "rgb(var(--surface))",
        text: "rgb(var(--text))",
        border: "rgb(var(--border))",
        muted: "rgb(var(--muted))",

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
