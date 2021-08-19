<script context="module">
	import {db} from '$lib/db'	
	import Parser from 'rss-parser';
	import slug from '$lib/slug'	
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		const {slug} = page.params

		const blog = (await db.all()).find(el=>slug(el.url)===slug)
		console.log(blog)
		let parser = new Parser()
		const feed = await parser.parseURL( blog.rss );

		// if ( !res.ok ) {
		// 	return {
		// 		status: res.status,
		// 		error: new Error(`Could not load ${url}`)
		// 	};
		// }

		return {
			props: {
				feed
			}
		};

	}
</script>
<script>
	export let feed
	let post = feed.items[0]
</script>

<svelte:head>
	<title>CubaBlog - {post.title}</title>
</svelte:head>

<div class="prose !prose-xl mx-auto">
	<h2>{post.title}</h2>
	{@html post['content:encoded'] }
</div>