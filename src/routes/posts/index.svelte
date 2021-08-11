<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		const url = `/blog/all.json`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					blogs: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>
<script>
	export let blogs = []
	$: blogsWithPost = blogs
		.filter( (el,index) => !!el.post && !!el.post.title )
		.sort( (a,b) => (new Date(b.post.date)) - (new Date(a.post.date)) )
</script>

<div class="mb-12">
<!-- 	<div class="mb-6">
		<input type="text" bind:value={search} class="border border-gray-300 p-3 w-full focus:outline-none focus:border-gray-400 text-xl">
	</div> -->
	<div class="w-full max-w-screen-md mx-auto space-y-8 sm:space-y-16">
	{#each blogsWithPost as blog (blog.post.url)}
		<Post {blog} />
	{/each}
	</div>
</div>
