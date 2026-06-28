/** @type {import('tailwindcss').Config} */
export default {  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#a78bfa", // Soft Violet
        "on-primary": "#1e1b4b",
        surface: "#0f172a",
        "on-surface": "#f8fafc",
        "surface-variant": "#1e293b",
        "on-surface-variant": "#94a3b8",
        "outline-variant": "#334155",
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        headline: ["Public Sans", "sans-serif"],
        display: ["Public Sans", "sans-serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
        label: ["Public Sans", "sans-serif"]
      }
    },
  },
  plugins: [],
}

