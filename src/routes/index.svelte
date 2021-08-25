<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		const url = `/blogs.json`;
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
	import Post from '$lib/components/post.svelte'
	
	export let blogs = []

		
</script>

<!-- <header>
	<h1 class="text-5xl text-center mb-16 font-bold">CubaBlog</h1>
</header> -->
<div class="mb-12">
<!-- 	<div class="mb-6">
		<input type="text" bind:value={search} class="border border-gray-300 p-3 w-full focus:outline-none focus:border-gray-400 text-xl">
	</div> -->
	<div class="mb-16"> 
		<Post blog={blogs[0]} featured/>
	</div>
	<div class="w-full max-w-screen-md mx-auto space-y-8 sm:space-y-16 ">
	{#each blogs.slice(1) as blog (blog.post.url)}
		<Post {blog} />
	{/each}
	</div>
	<a href="/posts" class="flex items-center justify-center mt-8 text-xl font-semibold hover:underline">
		Todos los artículos
		<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
		</svg>		
	</a>
</div>
