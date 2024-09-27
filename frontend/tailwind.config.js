/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul10': '#5673D5',
        'branco30': '#F9FAFF',
        'azul60': '#D9E1FF',
      },
    },
  },
  safelist: [
    'text-azul10',
    'text-branco30',
    'text-azul60',

    'bg-azul10',
    'bg-branco30',
    'bg-azul60',

    'border-azul10',
    'border-branco30',
    'border-azul60',

    'hover:bg-azul10',
    'hover:bg-branco30',
    'hover:bg-azul60',

    'hover:border-azul10',
    'hover:border-branco30',
    'hover:border-azul60',
    
  ],
  plugins: [
    require('flowbite/plugin'),
  ],
};
