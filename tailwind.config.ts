/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["InterVariable", "Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        dark: "#151718",
        primary: {
          50: "#F3F7FF",
          100: "#E2ECFF",
          200: "#D1E1FF",
          300: "#1A97FD",
          400: "#0165FF",
          500: "#035DE8",
          600: "#0054D4",
          700: "#1C3966",
          900: "#001331",
        },
        red: "#F5413D",
        "red-washed": "#FEF1F1",
        green: "#2AC54C",
        "green-washed": "#EBF8EC",
        orange: "#FF8E00",
        "orange-washed": "#FFF1DF",
      },
      keyframes: {
        slideUpAndFade: {
          "0%": { opacity: 0, transform: "translateY(2px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideRightAndFade: {
          "0%": { opacity: 0, transform: "translateX(-2px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        slideDownAndFade: {
          "0%": { opacity: 0, transform: "translateY(-2px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          "0%": { opacity: 0, transform: "translateX(2px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },
      animation: {
        slideUpAndFade: "slideUpAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)",
        slideDownAndFade:
          "slideDownAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)",
        slideRightAndFade:
          "slideRightAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)",
      },
    },
  },
  safelist: [
    "text-red",
    "bg-red-washed",
    "border-red",
    "text-orange",
    "bg-orange-washed",
    "border-orange",
    "text-green",
    "bg-green-washed",
    "border-green",
  ],
  plugins: [require("tailwindcss-animate")],
};
