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
          150: "#DBDBDB",
          200: "#808A93",
          250: "#021526CC",
          300: "#676E76",
        },
        primaryGreen: {
          200: "#45A849",
        },
        primaryBlack: {
          300: "#021526",
          400: "#1A1A1F",
        },
        primaryBlue: {
          200: "#2D3648",
        },
      },
      maxWidth: {
        nav: "720px",
      },
    },
  },
  plugins: [],
};
