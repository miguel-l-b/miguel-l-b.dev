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
        "yellow": "#EDDE73",
        "yellow-light": "#E1DDB7",
        "green": "#23AC57",
        "green-light": "#8FD3A6",
        "red": "#D24F4F",
        "red-light": "#C97878",
        "white": "#E6EEEF",
      }
    },
  },
  plugins: [],
}
export default config
