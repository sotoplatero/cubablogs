const config = {
	mode: "jit",
	purge: [
		"./src/**/*.{html,js,svelte,ts}",
	],
	theme: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/line-clamp'),
	],
};

module.exports = config;
