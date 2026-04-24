import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Vazirmatn", "ui-sans-serif", "system-ui"] },
      boxShadow: { luxe: "0 24px 70px rgba(117, 82, 55, 0.14)" },
      colors: { cream: "#fbf6ef", rose: "#d99aa4", gold: "#d9b070", ink: "#37291f" }
    }
  },
  plugins: []
};
export default config;
