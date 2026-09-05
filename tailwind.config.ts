import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        // sem hue: em preto e branco puro, "accent" e so a
        // camada mais escura, nao uma cor separada de --text
        accent: "#000000",
      },
      animation: {
        "fade-in":      "fade-in 1.5s ease forwards",
        "fade-up":      "fade-up 0.8s ease forwards",
        "fade-left":    "fade-left 1s ease forwards",
        "fade-right":   "fade-right 1s ease forwards",
        title:          "title 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        glow:           "glow 3s ease-in-out infinite",
        marquee:        "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
      },
      keyframes: {
        "fade-in":  { from: { opacity: "0" }, to: { opacity: "1" } },
        "fade-up":  { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "fade-left":  { from: { opacity: "0", transform: "translateX(20px)" }, to: { opacity: "1", transform: "translateX(0)" } },
        "fade-right": { from: { opacity: "0", transform: "translateX(-20px)" }, to: { opacity: "1", transform: "translateX(0)" } },
        title: {
          "0%":   { opacity: "0", filter: "blur(10px)", transform: "translateY(10px)" },
          "100%": { opacity: "1", filter: "blur(0)",    transform: "translateY(0)" },
        },
        glow: {
          "0%, 100%": { opacity: "0" },
          "50%":       { opacity: "1" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%":   { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
