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
		.filter(el => !!el.post && !!el.post.description)
		.sort( (a,b) => (new Date(b.post.date)) - (new Date(a.post.date)) )
</script>

<div class="text-center py-4 mb-8">
	<h1 class="flex items-center justify-center text-4xl font-bold text-red-700 ">
		<img src="/logo.png" alt="Logo Cubablog" class="w-11 h-11">	
		CubaBlog
	</h1>
</div>

<div class="mb-12">
<!-- 	<div class="mb-6">
		<input type="text" bind:value={search} class="border border-gray-300 p-3 w-full focus:outline-none focus:border-gray-400 text-xl">
	</div> -->
	<div class="w-1/2 mx-auto space-y-16">
	{#each blogsWithPost as blog (blog.post.url)}
		<div >
			<a href={blog.post.url} class="group " target="_blank" rel="noopener nofollower">
				{#if blog.post.image}
					<div class="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
						<img src="{ blog.post.image || ''}" alt="{blog.post.title}" class="w-full h-full object-center object-cover transition transform group-hover:scale-105">
					</div>			
				{/if}
				<div>
					<div class="mb-4 mt-3">
						<h2 class="text-lg sm:text-2xl font-semibold transition">
							{blog.post.title}
						</h2>
						{blog.post.date}
					</div>
					{#if blog.post.description}
						<p class="transition text-gray-500 group-hover:text-gray-700 line-clamp-5 text-justify">
							{blog.post.description}
						</p>
					{/if}
				</div>
			</a>
		</div>
	{/each}
	</div>
</div>
