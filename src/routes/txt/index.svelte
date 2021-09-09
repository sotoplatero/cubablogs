<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		const url = `/blogs.json?limit=100`;
		const res = await fetch(url);
		const blogs = await res.json()

		if (!res.ok) {
			return {
				status: res.status,
				error: new Error(`Could not load ${url}`)
			};
		}

		return {
			props: { blogs }
		};

	}
</script>
<script>
	export let blogs = []
</script>

{#each blogs.slice(1) as blog (blog.post.url)}
	<a href="{blog.post.url}">{ blog.post.title }</a><br>
	{ blog.post.description }<br>
{/each}

<style>
	a { 
		color: blue; 
	}
</style>