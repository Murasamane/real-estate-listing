/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryRed: {
          200: "#F93B1D",
          300: "#DF3014",
        },
        primaryGrey: {
          100: "#F3F3F3",
          200: "#808A93",
          250: "#021526CC",
        },
        primaryGreen: {
          200: "#45A849",
        },
      },
      maxWidth: {
        nav: "720px",
      },
    },
  },
  plugins: [],
};
