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
