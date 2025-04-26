import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#6c584c",
        input: "#5F8446",
        ring: "#6c584c",
        background: "#f0ead2",
        foreground: "#6c584c",
        primary: {
          DEFAULT: "#adc178",
          foreground: "#6c584c",
        },
        secondary: {
          DEFAULT: "#a98467",
          foreground: "#f0ead2",
        },
        destructive: {
          DEFAULT: "#dc2626",
          foreground: "#f0ead2",
        },
        muted: {
          DEFAULT: "#dde5b6",
          foreground: "#6c584c",
        },
        accent: {
          DEFAULT: "#a98467",
          foreground: "#f0ead2",
        },
        popover: {
          DEFAULT: "#f0ead2",
          foreground: "#6c584c",
        },
        card: {
          DEFAULT: "#f0ead2",
          foreground: "#6c584c",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
