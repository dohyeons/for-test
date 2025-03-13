import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "primary-color": "#62a3f9",
        "mono-1": "#ffffff",
        "mono-2": "#fcfdfd",
        "mono-3": "#f5f5f6",
        "mono-4": "#f0f1f1",
        "mono-5": "#d9dbdd",
        "mono-6": "#bfc3c6",
        "mono-7": "#8c9398",
        "mono-8": "#59636a",
        "mono-9": "#455057",
        "mono-10": "#26333c",
        "mono-11": "#1f2c35",
        "mono-12": "#14222b",
        "mono-13": "#000f19",
        "mono-14": "#000000",
        "blue-1": "#eff6fe",
        "blue-2": "#d9e9fe",
        "blue-3": "#bbd7fc",
        "blue-4": "#9cc5fb",
        "blue-5": "#7eb4fa",
        "blue-6": "#62a3f9",
        "blue-7": "#538bd4",
        "blue-8": "#4674b1",
        "blue-9": "#385d8e",
        "blue-10": "#2c4970",
        "blue-11": "#2563eb",
      },
      animation: {
        "heart-scale-up": "heart-scale-up 0.6s cubic-bezier(.77,1.74,.97,1.65)",
        "hand-wave": "hand-wave 1s ease-in-out",
        "arrow-up": "arrow-up 2.3s infinite ease-in-out",
      },
      keyframes: {
        "heart-scale-up": {
          "0%": { transform: "scale(0.8)" },
          "50%": { transform: "scale(1.3)" },
          "100%": {
            transform: "scale(1)",
          },
        },
        "hand-wave": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(20deg)",
          },
          "50%": {
            transform: "rotate(0deg)",
          },
          "75%": {
            transform: "rotate(20deg)",
          },
          "100%": {
            transform: "rotate(0deg)",
          },
        },
        "arrow-up": {
          "0%, 50%, 100%": { transform: "translateY(0) rotate(180deg)" },
          "25%, 75%": { transform: "translateY(-30%) rotate(180deg)" },
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
} satisfies Config;
