module.exports = {
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-backgrounddark-contentblack":
          "var(--dark-backgrounddark-contentblack)",
        "light-contentblack-30": "var(--light-contentblack-30)",
        "solidbaraka-green": "var(--solidbaraka-green)",
        solidblack: "var(--solidblack)",
        solidgreen: "var(--solidgreen)",
        solidred: "var(--solidred)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        "body-1": "var(--body-1-font-family)",
        "body-3": "var(--body-3-font-family)",
        "body-4": "var(--body-4-font-family)",
        "caption-desktop-caption-r":
          "var(--caption-desktop-caption-r-font-family)",
        "caption-mobile-caption-r":
          "var(--caption-mobile-caption-r-font-family)",
        "footnote-2": "var(--footnote-2-font-family)",
        h4: "var(--h4-font-family)",
        "heading-desktop-h2-medium":
          "var(--heading-desktop-h2-medium-font-family)",
        "heading-desktop-h3-medium":
          "var(--heading-desktop-h3-medium-font-family)",
        "heading-desktop-h4-medium":
          "var(--heading-desktop-h4-medium-font-family)",
        "heading-desktop-h4-regular":
          "var(--heading-desktop-h4-regular-font-family)",
        "heading-desktop-h5-medium":
          "var(--heading-desktop-h5-medium-font-family)",
        "heading-desktop-h5-regular":
          "var(--heading-desktop-h5-regular-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin-slow 4s linear infinite",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    function({ addUtilities }: any) {
      addUtilities({
        '.scrollbar-hide': {
          /* Hide scrollbar for Chrome, Safari and Opera */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          /* Hide scrollbar for IE, Edge and Firefox */
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      })
    },
  ],
  darkMode: ["class"],
};
