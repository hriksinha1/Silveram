import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: { DEFAULT: "#0C1B36", dark: "#060E1D", light: "#14284D" },
        porcelain: { DEFAULT: "#F7F5F0", pure: "#FFFFFF", muted: "#EFECE6" },
        silver: { DEFAULT: "#D9DFE8", light: "#EEF2F6", dark: "#A6B1C2" },
        cobalt: { DEFAULT: "#6178FF", hover: "#4D64F5" },
        graphite: { DEFAULT: "#222B3A", muted: "#4A5568" },
      },
      fontFamily: {
        serif: ["var(--font-editorial)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      scale: { 103: "1.03" },
      keyframes: {
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 12s linear infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
