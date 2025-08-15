/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-bg": "#0D0D0D",
        "dark-card": "#0D0D0D",
        "dark-border": "#C2B39A",
        "lime-green": "#88AB33",
        "lime-dark": "#28a428",
        "text-muted": "#a0a0a0",
        "text-gray": "#808080",
        "red-light": "#ff6b6b",
        "add-task": "#1F2937",
      },
      boxShadow: {
        "focus-lime": "0 0 0 2px rgba(50, 205, 50, 0.2)",
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
