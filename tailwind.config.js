/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        blog: "url('/src/assets/blog.jpg')",
      },
    },
  },
  plugins: [],
}