/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    // our colors theme
    colors: {
      primary: "#c00a27",
      secondary: "#f4b618",
      white: "#ffffff",
      black: "#3a3a3a",
      gray: "#686464",
      yellow: "#F4B618",
    },

    container: {
      center: true,
      screens: {
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1240px",
        xxl: "1496px",
      },
    },
  },

  plugins: [],
};
