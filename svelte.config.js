process.env.NTBA_FIX_319 = 1;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

import preprocess from "svelte-preprocess";
import netlify from '@sveltejs/adapter-netlify';
import vercel from '@sveltejs/adapter-vercel';
import cloudflare from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
		// hydrate the <div id="svelte"> element in src/app.html
        adapter: cloudflare({ platform: 'node' }),
		target: '#svelte'
	},

    preprocess: [preprocess({
        postcss: true
    })]
};

export default config;
