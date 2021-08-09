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
	import { getHostname } from 'tldts'

	let url
	let exists = 0
	let search
	export let blogs

	$: exists = !!blogs.find( el => getHostname(el.url) === getHostname(url) )
	// $: blogs.filter( el => search)

	async function handleSubmit(){
		if (exists) return
		const res = await fetch(`/blog/add.json?url=${url}`,{method: 'post'})
		blogs = await res.json()
		url = ''
	}

</script>

<div class="text-center py-40">
	<h1 class="text-5xl font-bold">CubaBlogs</h1>
	<p class="text-xl text-gray-600">Blogs sobre Cuba y por Cubanos</p>
	<form on:submit|preventDefault={handleSubmit} class="w-full sm:w-80 mt-4 mx-auto space-y-2">
		<input type="text" bind:value={url} class="border border-gray-300 p-3 w-full" placeholder="URL, ej: dsoto.dev">
		{#if exists}
			<div class="text-red-500">
				El blog ya está en el listado
			</div>
		{/if}
		<button class="py-3 px-6 bg-blue-500 text-white font-bold">Agregar Blog</button>
	</form>
</div>

<div class="mb-12">
	<div>
		<!-- <input type="text" bind:value={search}> -->
	</div>
	<div class="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
	{#each blogs.reverse() as blog, index}
		<div >
			<a href={blog.url} class="group " target="_blank" rel="noopener nofollower">
				<div class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
					<img src="{(blog.twitter ? blog.twitter.avatar + `?fallback=${blog.image}` : null) || blog.image}" alt="{blog.title}" class="w-full h-full object-center object-cover transition transform group-hover:scale-105">
				</div>			
				<div>
					<div class="mb-4 mt-2 text-center">
						<h2 class="text-2xl font-semibold">
							{blog.title}
						</h2>
						<p class="text-gray-400">{blog.url}</p>
					</div>
					<p class="transition text-gray-500 group-hover:text-gray-700 line-clamp-3">
						{blog.description}
					</p>
				</div>
			</a>
			<div class="flex items-center justify-center mt-3 space-x-2">
				<a href="{blog.rss}">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
					</svg>				
				</a>
				{#if blog.twitter}
					<a href="{blog.twitter.url}" class="text-blue-400 font-medium flex items-center justify-center">
						<svg class="w-5 h-5 inline fill-current" stroke="currentColor" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
					</a>
				{/if}
			</div>
		</div>
	{/each}
	</div>
</div>
