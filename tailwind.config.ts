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
        sans: ["var(--font-poppins)", "sans-serif"],
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
