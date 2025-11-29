/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        campfire: {
          orange: "#D87800",
          dark: "#0A0A0A",
          light: "#FFFFFF",
        }
      }
    },
  },
  plugins: [],
};