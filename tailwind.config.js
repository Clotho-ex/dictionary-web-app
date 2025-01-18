/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    opacity: {
      0: "0",
      20: "0.2",
      40: "0.4",
      60: "0.6",
      80: "0.8",
      100: "1",
    },

    colors: {
      black: "#050505",
      blackLight: "#1F1F1F",
      blackLighter: "#2D2D2D",
      blackLightest: "#3A3A3A",
      gray: "#757575",
      platinum: "#E9E9E9",
      whiteSmoke: "#F4F4F4",
      white: "FFFFFF",
      purple: "A445ED",
      bittersweet: "FF5252",
    },
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        Lora: ["Lora", "serif"],
        Inconsolata: ["Inconsolata", "monospace"],
      },
      fontSize: {
        "heading-L": ["4rem", "77px"],
        "heading-M": ["1.5rem", "29px"],
        "heading-S": ["1.3rem", "24px"],
        "body-M": ["1.1rem, 24px"],
        "body-S": ["0.9rem", "17px"],
      },
    },
  },
  plugins: [],
};
