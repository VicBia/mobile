const { colors } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#7C9682',
                green: '#7EA54D',
                red: {
                    expense: '#E09595',
                    DEFAULT: '#BC3F3F80',
                },
                gray: {
                    text: '#5E5E5E',
                    ...colors.gray,
                },
            },
        },
    },
    plugins: [],
}
