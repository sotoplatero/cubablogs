process.env.NTBA_FIX_319 = 1;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

import preprocess from "svelte-preprocess";
import netlify from '@sveltejs/adapter-netlify';
import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
		// hydrate the <div id="svelte"> element in src/app.html
        adapter: vercel(),
		target: '#svelte'
	},

    preprocess: [preprocess({
        postcss: true
    })]
};

export default config;
