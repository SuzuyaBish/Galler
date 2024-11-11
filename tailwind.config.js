/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      muted: "#888",
      lightMuted: "#B8B8B8",
      wideMuted: "#F2F2F2",
    },
  },
  plugins: [],
}
