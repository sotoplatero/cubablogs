<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		const p = page.query.get('page') ?? 1
		const res = await fetch(`/blogs.json?page=${p}`);

		if ( !res.ok ) {
			return {
				status: res.status,
				error: new Error(`Could not load ${url}`)
			};
		}

		return {
			props: {
				blogs: await res.json(),
				p
			}
		};

	}
</script>
<script>
	import Post from '$lib/components/post.svelte'
	import Pagination from '$lib/components/pagination.svelte'
	
	export let blogs = []
	export let p = 1

	$: filteredBlogs = blogs
		
</script>

<div class="mb-12">
<!-- 	<div class="mb-6">
		<input type="text" bind:value={search} class="border border-gray-300 p-3 w-full focus:outline-none focus:border-gray-400 text-xl">
	</div> -->
	<div class="w-full max-w-screen-md mx-auto space-y-8 sm:space-y-16">
		{#each filteredBlogs as blog (blog.post.url)}
			<Post {blog} />
		{/each}
	</div>
	<div class="mt-10">
		<Pagination {p}/>
	</div>

</div>
