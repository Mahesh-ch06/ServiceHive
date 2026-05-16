import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#0b0f1a",
          800: "#121829",
          700: "#1b2338",
          600: "#27304a"
        },
        brand: {
          500: "#ff7a1a",
          600: "#e65f00"
        },
        mint: {
          400: "#36d399",
          500: "#20c997"
        }
      },
      fontFamily: {
        display: ["Space Grotesk", "Segoe UI", "sans-serif"],
        body: ["DM Sans", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        soft: "0 10px 30px rgba(11, 15, 26, 0.12)"
      }
    }
  },
  plugins: []
} satisfies Config;
