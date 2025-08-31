import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#8B4513", // Saddle Brown
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#228B22", // Forest Green
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "#FF8C00", // Dark Orange
          foreground: "hsl(var(--accent-foreground))",
        },
        success: {
          DEFAULT: "#228B22", // Forest Green
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#FF8C00", // Dark Orange
          foreground: "#FFFFFF",
        },
        error: {
          DEFAULT: "#DC143C", // Crimson
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Organic farming colors
        earth: {
          50: "#F5F5DC", // Beige
          100: "#E8E4C9",
          200: "#D1C7A3",
          300: "#B8A97D",
          400: "#9F8B57",
          500: "#8B4513", // Saddle Brown
          600: "#6B3410",
          700: "#4B230C",
          800: "#2B1208",
          900: "#0B0104",
        },
        nature: {
          50: "#F0F8F0",
          100: "#E1F1E1",
          200: "#C3E3C3",
          300: "#A5D5A5",
          400: "#87C787",
          500: "#228B22", // Forest Green
          600: "#1A6F1A",
          700: "#125312",
          800: "#0A370A",
          900: "#021B02",
        },
        harvest: {
          50: "#FFF8F0",
          100: "#FFF1E1",
          200: "#FFE3C3",
          300: "#FFD5A5",
          400: "#FFC787",
          500: "#FF8C00", // Dark Orange
          600: "#CC7000",
          700: "#995400",
          800: "#663800",
          900: "#331C00",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
