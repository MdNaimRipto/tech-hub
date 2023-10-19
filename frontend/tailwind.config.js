/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    // our colors theme
    colors: {
      primary: "#ff7a1a",
      secondary: "#f15700",
      white: "#ffffff",
      black: "#1c1c1c",
      gray: "#686464",
      "light-gray": "#80808075",
      input: "#e2e2e2",
      yellow: "#F4B618",
      red: "#EB2606",
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
