import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "robot-serif": ["Roboto+Serif"],
      },
      borderStyle: ["hover", "focus"],
      colors: {
        "deep-cerulean": {
          "50": "#ebfffe",
          "100": "#cbfeff",
          "200": "#9efbff",
          "300": "#5cf6ff",
          "400": "#12e6fe",
          "500": "#00c7e4",
          "600": "#009ebf",
          "700": "#04829f",
          "800": "#0e657c",
          "900": "#105469",
          "950": "#033749",
        },
      },
    },
  },

  plugins: [],
} satisfies Config;

// const plugin = require("tailwindcss/plugin");

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   /** other settings */
//   plugins: [
//     plugin(function ({ addVariant }) {
//       addVariant("current", "&.active");
//     }),
//   ],
// };
