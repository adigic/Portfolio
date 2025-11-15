// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // standard-brödtext, om du vill
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],

        // egna klasser:
        poppins: ["var(--font-poppins)", "system-ui", "sans-serif"],
        alexandria: ["var(--font-alexandria)", "system-ui", "sans-serif"],
        righteous: ["var(--font-righteous)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#1A1A1A", // <- optional default
          light: "#EDEDED",
          dark: "#1A1A1A",
        },
        accent: "#39597D",
      },
    },
  },
  plugins: [],
};
export default config;
