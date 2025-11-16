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
      sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      // you can also add others if you want to use them via classNames
      alexandria: ["var(--font-alexandria)", "sans-serif"],
      righteous: ["var(--font-righteous)", "cursive"],
    },
      colors: {
        brand: {
          DEFAULT: "#1A1A1A",
          light: "#EDEDED",
          dark: "#1A1A1A",
          input: "#D9D9D9",
        },
        accent: "#39597D",
      },
    },
  },
  plugins: [],
};

export default config;
