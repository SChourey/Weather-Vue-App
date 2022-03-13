const colors = require('tailwindcss/colors')

module.exports = {
	content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {},
		colors: {
			primary: colors.blue,
			secondary: colors.neutral,
			neutral: colors.slate,
			highlight: colors.red,
			background: colors.white,
		},
		gridTemplateColumns: {
			24: 'repeat(24, minmax(0, 1fr))',
			4: 'repeat(4, minmax(0, 1fr))',
		},
		screens: {
			sm: {min: '320px', max: '767px'},
			md: {min: '768px', max: '1023px'},
			lg: {min: '1024px', max: '1279px'},
			xl: {min: '1280px'},
		},
		boxShadow: {
			'icon-shadow': '1px 2px 7px 1px #dbdada',
		},
	},
	plugins: [],
}
