/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F5F0E8',
          sidebar: '#1C1917',
          'sidebar-active': '#292524',
          card: '#FFFFFF',
          border: '#E0D9CF',
          primary: '#D97706',
          'primary-hover': '#B45309',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
