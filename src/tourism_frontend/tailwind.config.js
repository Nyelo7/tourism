// src/<YOUR_CANISTER_NAME>_frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Crucial for any Tailwind classes in your main HTML file
    "./src/**/*.{js,jsx,ts,tsx}", // This covers src/pages, src/components, and anything else under src
  ],
  theme: {
    extend: {
      colors: {
        'cyan-vibrant': '#66D9ED',
        'ocean-blue': '#D5EFF7',
        'charcoal-gray': '#212121',
        'optimistic-yellow': '#FFD700',
        'subtle-gray': '#D0D3D4',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}