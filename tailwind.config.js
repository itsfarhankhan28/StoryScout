/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xxsm: '350px',
      xsm: '425px',
      mobile: '425px',
      sm: '640px',
      tablet: '640px',
      md: '768px',
      lg: '1024px',
      laptop: '1024px',
      xl: '1440px',
      desktop: '1280px',
      '2xl': '1536px',
    },
    extend: {},
  },
  plugins: [],
}

