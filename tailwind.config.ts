import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // SunFM Brand Colors
        "sunshine-yellow": "#FFD140",
        "cherry-red": "#CB4538",
        "vintage-grey": "#EEEADA",
        black: "#000000",
      },
      fontFamily: {
        // Primary fonts
        "work-sans": ["Work Sans", "sans-serif"],
        // Logo type font (Cooper Black) - will use a similar web font
        cooper: ["Cooper Black", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
