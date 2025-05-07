/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'], // <== Make sure this matches your app structure
  theme: {
    extend: {
      colors: {
        primary: '#15803d', // Green vibe
        background: '#ffffff',
        foreground: '#1f2937'
      },
      fontFamily: {
        sans: ['Segoe UI', 'Tahoma', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
