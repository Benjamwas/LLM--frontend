import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#4da6ff",
          DEFAULT: "#1e90ff",
          dark: "#005cbf",
        },
        background: "#f9fafb6b",
      },
    },
  },
  plugins: [],
};

export default config;
