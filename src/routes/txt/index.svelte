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

	<a href="/txt/{blog.id}/{blog.post.slug}">{ blog.post.title.trim() }</a>
	{ !!blog.post.description ? `\n${blog.post.description.replace(/[\n\t\s]+/g,' ').trim()}` : ''}
	{'\n'}
	<a href="{blog.url}">{blog.title}</a> -- { new Date(blog.post.date).toLocaleDateString('es-ES', { month:"short", day:"numeric", year: "numeric"}) }
	{'\n\n\n'}

{/each}



	
