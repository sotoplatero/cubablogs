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
		.filter(el => !!el.post )
		.sort( (a,b) => (new Date(b.post.date)) - (new Date(a.post.date)) )
</script>

<div class="text-center py-4 mb-8">
	<a href="/">
		<h1 class="flex items-center justify-center text-4xl font-bold text-red-700 ">
			<img src="/logo.png" alt="Logo Cubablog" class="w-11 h-11">	
			CubaBlog
		</h1>
	</a>
</div>

<div class="mb-12">
<!-- 	<div class="mb-6">
		<input type="text" bind:value={search} class="border border-gray-300 p-3 w-full focus:outline-none focus:border-gray-400 text-xl">
	</div> -->
	<div class="w-full max-w-screen-md mx-auto space-y-8 sm:space-y-16">
	{#each blogsWithPost as blog (blog.post.url)}
		<div >
			<div class="group " >
				<div>
					<div class='flex items-center mb-2'>
						<img 
							src="{(blog.twitter ? blog.twitter.avatar + `?fallback=${blog.image}` : null) || blog.image}" 
							alt="{blog.title}" 
							class="w-8 h-8 object-center object-cover rounded-full">
						<span class="text-lg ml-2 font-semibold">
							<!-- {blog.post.author || ''} <span class="text-gray-500">en</span> --> <a href="{blog.url}" target="_blank" rel="noopener nofollower">{blog.title}</a>
						</span>
					</div>
					<div class="flex ">
						<div class="mr-auto">
							<a href={blog.post.url} target="_blank" rel="noopener nofollower">
								<h2 class="text-xl sm:text-4xl font-bold sm:font-semibold leading-tight transition">
									{blog.post.title}
								</h2>
								<p class="mt-1 transition text-gray-500 group-hover:text-gray-600 sm:line-clamp-3 text-lg sm:text-xl sm:text-justify hidden">
									{blog.post.description}
								</p>
							</a>
							<div class="mt-2 text-gray-400 space-x-4">
								<span class="font-semibold">
									{ new Date(blog.post.date).toLocaleDateString('es-ES', { month:"short", day:"numeric"}) }
								</span>
								<span class="hidden sm:inline">{@html (blog.post.categories || []).join(' &bull; ') }</span>
							</div>
						</div>
						{#if blog.post.image}
							<div class="w-1/4 flex-shrink-0 ml-2 sm:ml-6">
								<div class="aspect-w-4 aspect-h-4 overflow-hidden rounded-lg">
									<img src="{ blog.post.image || ''}" alt="{blog.post.title}" class="object-center object-cover">
								</div>			
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/each}
	</div>
</div>
