/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5270FF",
        secondary: "#888AA0",
        bgLine: "#B3B3B3",
        heading: "#24315E",
        Drak_color: "#FAF9F6",
        textGray: "#737373",
        Footer_color: "#222222",
        bgCard: "#f7f7f7",
        light: '#F3F4F9',
        bgLoader: "#7C8DFF"
      },
      boxShadow: {
        sm: "0px 1px 3px 0px #03004717",
        DEFAULT: "0px 0px 20px 0px #0000001A",
        lg: "0px 8px 45px 0px #03004717",
      },
      spacing: {
        sidebar: 250,
        'sidebar-mini': 65,
      },
    },
  },
  plugins: [],
};
