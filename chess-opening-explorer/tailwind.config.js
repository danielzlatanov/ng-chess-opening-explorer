/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {},
      backgroundColor: {
        "custom-gray": "rgb(203, 199, 196)",
      },
      backgroundImage: {
        chess: "url('/assets/images/bg1.jpg')",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
