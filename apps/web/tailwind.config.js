/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nautical: {
          900: "#1e40af",
        },
      },
    },
  },
  plugins: [],
}