import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        "roboto": ['Roboto Mono', "monospace"],
        "jura": ['Jura', 'sans-serif'],
        "orbitron": ['Orbitron', 'sans-serif'],

      },
      colors: {
        "black-dark": "#161818",
        "black": "#262727",
        "black-light": "#282929",
        "gray-dark": "#4A5560",
        "gray": "#AAB0BE",
        "gray-light": "#D0DFDE",
        "blue-dark": "#2F4572",
        "blue": "#679EDE",
        "blue-light": "#BED7E4",
        "yellow-dark": "#E3B81B",
        "yellow": "#EDDE73",
        "yellow-light": "#E1DDB7",
        "green": "#23AC57",
        "green-light": "#8FD3A6",
        "red": "#D24F4F",
        "red-light": "#C97878",
        "white": "#E6EEEF",
      },
      keyframes: {
        attention: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(2deg)",
          },
          "90%": {
            transform: "rotate(-3deg)",
          },
          "100%": {
            transform: "rotate(1deg)",
          }
        },
        custom_two: {
          "0%": {
            opacity: "0.6",
          },

          "30%": {
            opacity: "1",
            transform: "translateX(0.4rem)",
          },
          "70%": {
            transform: "translateX(-0.4rem)",
          },
          "100%": {
            opacity: "0.6",
          }
        }
      },
      animation: {
        attention: "attention 1s ease-in-out infinite",
        custom_two: "custom_two 1.5s ease-in-out infinite",
      }
    },
  },
  plugins: [],
}
export default config
