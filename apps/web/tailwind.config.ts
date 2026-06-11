import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Visionary FIFA palette — dark premium sports theme
        ink: {
          900: "#05060f",
          800: "#0a0c1b",
          700: "#0f1226",
          600: "#161a33",
        },
        neon: {
          blue: "#2b7bff",
          cyan: "#22e1ff",
          purple: "#9b5cff",
          gold: "#ffcf5c",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(34,225,255,0.12), 0 0 40px -8px rgba(43,123,255,0.45)",
        "glow-gold": "0 0 0 1px rgba(255,207,92,0.18), 0 0 40px -8px rgba(255,207,92,0.45)",
        "glow-purple": "0 0 0 1px rgba(155,92,255,0.18), 0 0 40px -8px rgba(155,92,255,0.45)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "trail-move": {
          "0%": { transform: "translateX(-10%)", opacity: "0" },
          "30%": { opacity: "1" },
          "100%": { transform: "translateX(110%)", opacity: "0" },
        },
        "trophy-shine": {
          "0%": { transform: "translateX(-90px)", opacity: "0" },
          "18%": { opacity: "0.85" },
          "55%": { opacity: "0.85" },
          "82%": { transform: "translateX(200px)", opacity: "0" },
          "100%": { transform: "translateX(200px)", opacity: "0" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
        "beam-sway": {
          "0%, 100%": { opacity: "0.35", transform: "skewX(-12deg) scaleY(1)" },
          "50%": { opacity: "0.7", transform: "skewX(-12deg) scaleY(1.05)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3.5s ease-in-out infinite",
        shimmer: "shimmer 1.8s infinite",
        "spin-slow": "spin-slow 26s linear infinite",
        "trail-move": "trail-move 7s linear infinite",
        "trophy-shine": "trophy-shine 4.5s ease-in-out infinite",
        twinkle: "twinkle 2.6s ease-in-out infinite",
        "beam-sway": "beam-sway 6s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
