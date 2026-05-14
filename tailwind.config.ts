import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blue: {
          500: "#3b82f6",
          600: "#2563eb",
        }
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.05em",
        widest: "0.25em",
      },
      borderRadius: {
        DEFAULT: "9999px",
      },
    },
  },
  plugins: [],
} satisfies Config;
