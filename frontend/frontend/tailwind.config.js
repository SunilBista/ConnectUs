/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/Authentication/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-bg-color": "#A3DABF",
        "secondary-bg-color": "#F8F6F1",

        "sidebar-bg-color": "#286F78",

        "icon-color": "#F3F3F3",
        "icon-hover-color": "#FF857F",
        "icon-active-color": "#2C3E50",

        "primary-text-color": "#1A242F",
        "secondary-text-color": "#7D7D7D",
        "muted-text-color": "#A89C8A",
        "error-text-color": "#8B3B3B",
        "success-text-color": "#4A4A4A",

        "primary-btn-color": "#C2D9C9",
        "primary-btn-hover-color": "#A8C1B1",
        "accent-btn-color": "#B3CADB",
        "accent-btn-hover-color": "#97B3C3",
        "disabled-btn-color": "#D1C6B2",

        "input-bg-color": "#FFFFFF",
        "input-border-color": "#D1C6B2",
        "input-placeholder-color": "#A89C8A",
        "focus-border-color": "#A89C8A",

        "primary-border-color": "#D1C6B2",
        "hover-border-color": "#A89C8A",

        "error-bg-color": "#F5B7B1",
        "success-bg-color": "#C2D9C9",

        "shadow-color": "rgba(0, 0, 0, 0.1)",
      },
    },
    variants: {
      extend: {
        borderColor: ["focus"],
      },
    },
  },
  plugins: [],
};
