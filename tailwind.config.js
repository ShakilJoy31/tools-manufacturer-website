module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "white",
      "cupcake",
    ],
  },
  plugins: [require("daisyui")],
}
