<script context="module">
	import {db} from '$lib/db'	
	import Parser from 'rss-parser';	
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		const {id} = page.params

		const blog = (await db.all()).find(el=>el.id===id)
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

<div class="prose !prose-xl mx-auto">
	<h2>{post.title}</h2>
	{@html post['content:encoded'] }
</div>