/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				montserrat: ['montserrat-500', 'sans-seriff'],
			},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				forest: {
					...require('daisyui/src/theming/themes')['forest'],
					'base-100': '#ffffff',
				},
			},
		],
	},
};
