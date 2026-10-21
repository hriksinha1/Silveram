import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: "#0C1B36",
          dark: "#060E1D",
          light: "#14284D",
        },
        porcelain: {
          DEFAULT: "#F7F5F0",
          pure: "#FFFFFF",
          muted: "#EFECE6",
        },
        silver: {
          DEFAULT: "#D9DFE8",
          light: "#EEF2F6",
          dark: "#A6B1C2",
        },
        cobalt: {
          DEFAULT: "#6178FF",
          hover: "#4D64F5",
        },
        graphite: {
          DEFAULT: "#222B3A",
          muted: "#4A5568",
        },
      },
      fontFamily: {
        serif: ["var(--font-editorial)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
