/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          primary: "#042940",
          secondary: "#ffffff",
          accent: "#0F7C6E",
          neutral: "#0b594f",
          "base-100": "#ebebeb",
          info: "#0F7C6E",
          success: "#12A14B",
          warning: "goldenrod",
          error: "red",
        },
      },
    ],
  },
};
