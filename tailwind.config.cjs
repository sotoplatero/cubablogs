const colors = require('tailwindcss/colors')
const config = {
	mode: "jit",   
	purge: [
		"./src/**/*.{html,js,svelte,ts}",
	],
	theme: {
		colors: {
			...colors
		},
		extend: {
		  	screens: {
		    	'print': {'raw': 'print'},
		  	}
		}
	},
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/line-clamp'),
		require('@tailwindcss/typography'),
	]
};

module.exports = config;
