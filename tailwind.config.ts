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
        "dark-fern": {
          "50": "#e8fee7",
          "100": "#cdfccb",
          "200": "#9ff99d",
          "300": "#64f264",
          "400": "#35e637",
          "500": "#16cc1c",
          "600": "#0da314",
          "700": "#0f7c16",
          "800": "#126218",
          "900": "#14531a",
          "950": "#06370c",
        },
        eucalyptus: {
          "50": "#effaf5",
          "100": "#d9f2e5",
          "200": "#b6e4d0",
          "300": "#86cfb3",
          "400": "#54b391",
          "500": "#329777",
          "600": "#247f64",
          "700": "#1b614e",
          "800": "#184d3f",
          "900": "#153f35",
          "950": "#0a241e",
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
