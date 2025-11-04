module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(to bottom right, #00B894, #2ECC71)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        grosave: {
          primary: "#00C48C", // soft mint green
          secondary: "#2ECC71", // natural green
          accent: "#FFD166", // warm lemon
          neutral: "#1E1E1E", // deep neutral
          "base-100": "#121212", // background dark
          info: "#74B9FF",
          success: "#27AE60",
          warning: "#F2C94C",
          error: "#E74C3C",
        },
      },
    ],
  },
};