<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		const p = page.query.get('page') ?? 1
		const res = await fetch(`/posts.json?page=${p}`);
		const json = await res.json()
		console.log(json)
		const {
			data: blogs,
			next_page,
			prev_page,
		} = json

		if ( !res.ok ) {
			return {
				status: res.status,
				error: new Error(`Could not load ${url}`)
			};
		}

		return {
			props: {
				blogs, next_page, prev_page
			}
		};

	}
</script>
<script>
	import Post from '$lib/components/post.svelte'
	import Pagination from '$lib/components/pagination.svelte'
	
	export let blogs = []
	export let next_page = null
	export let prev_page = null
	// $: console.log('page: ' + next_page)
	$: blogsWithPost = blogs
		
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
	<div class="mt-10">
		<Pagination {prev_page} {next_page}/>
	</div>

</div>
