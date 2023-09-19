import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "robot-serif": ["Roboto+Serif"],
      },
      borderStyle: ["hover", "focus"],
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
