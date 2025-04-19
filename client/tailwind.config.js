// const { plugin } = require("typescript-eslint");

module.exports = {
    content: [
      "./index.html",
      "./admin.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
      extend: {
        animation: {
          blob: "blob 7s infinite",
        },
        colors: {
          primary: '#6A0DAD', // Deep Purple
          secondary: '#8B5E3C', // Brown Accent
          accent: '#F8F8F8', // Soft White
          brown: {
            400: '#A97C50',
            500: '#8B5E3C',
            600: '#6D4826',
          },
          pastel: {
            bg: '#FFF7F0',
            text: '#5A5A5A',
          },
        },
        keyframes: {
          blob: {
            "0%": {
              transform: "translate(0px, 0px) scale(1)",
            },
            "33%": {
              transform: "translate(30px, -50px) scale(1.1)",
            },
            "66%": {
              transform: "translate(-20px, 20px) scale(0.9)",
            },
            "100%": {
              transform: "translate(0px, 0px) scale(1)",
            },
          },
        },
        lineClamp: {
          2: '2',
        },
      },
    },
    plugins: [
      require('@tailwindcss/line-clamp'),
    ]
};
