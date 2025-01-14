module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      xl: "1440px",
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "25px",
          sm: "25px",
          md: "25px",
          xl: "30px",
        },
      },
      colors: {
        main: "#1A5319",
        accent: "#508D4E",
        secondColor: "#80AF81",
        bgColor: "#D6EFD8",
        modalBg: "rgba(0, 0, 0, 0.5)",
        dateColor: "#777",
        cardsBg: "#f9f9f9",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        headerShadow: "0px 4px 10px rgba(0, 0, 0, 0.25);",
      },
    },
  },
  plugins: [],
};
