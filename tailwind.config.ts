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
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
