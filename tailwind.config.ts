import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { ink: "rgb(var(--ink) / <alpha-value>)", paper: "rgb(var(--paper) / <alpha-value>)", deep: "rgb(var(--deep) / <alpha-value>)", royal: "rgb(var(--royal) / <alpha-value>)", gold: "rgb(var(--gold) / <alpha-value>)", golddk: "rgb(var(--golddk) / <alpha-value>)", mist: "rgb(var(--mist) / <alpha-value>)", teal: "rgb(var(--teal) / <alpha-value>)", ivory: "rgb(var(--ivory) / <alpha-value>)", onwhite: "#14161a" },
    fontFamily: { display: ["var(--font-display)", "serif"], body: ["var(--font-body)", "system-ui", "sans-serif"] },
  } },
  plugins: [],
} satisfies Config;
