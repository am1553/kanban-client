/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      black: "#000112",
      "very-dark-grey": "#20212C",
      "dark-grey": "#2B2C37",
      "lines-dark": "#3E3F4E",
      "medium-grey": "#828FA3",
      "lines-light": "#E4EBFA",
      "light-grey-bg": "#F4F7FD",
      white: "#FFFFFF",
      "main-purple": "#635FC7",
      "main-purple-hover": "#A8A4FF",
      red: "#EA5555",
      "red-hover": "#FF9898",
    },
    fontFamily: {
      sans: ["Plus Jakarta Sans", "sans-serif"],
    },
    fontSize: {
      xl: ["24px", { fontWeight: 600 }],
      l: ["18px", { fontWeight: 600 }],
      m: ["15px", { fontWeight: 600 }],
      s: ["12px", { letterSpacing: "2.4px", fontWeight: 600 }],
      "body-l": ["13px", { lineHeight: "23px" }],
      "body-m": "12px",
    },
  },
  plugins: [],
};
