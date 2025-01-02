import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        allura: ['Allura',"serif"],
        playfair: ['"Playfair Display"', 'serif'],
        vibes: ['"Great Vibes"', 'cursive'],
      },
     
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customGreen: '#001C17',
        
      },
    },
  },
  plugins: [],
} satisfies Config;
