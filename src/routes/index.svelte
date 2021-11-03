<script context="module">
	import '$lib/isToday'
	import '$lib/random'	
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		const url = `/posts.json?to=15`;
		const res = await fetch(url);

		if (!res.ok) {
			return {
				status: res.status,
				error: new Error(`Could not load ${url}`)
			};
		}

		const blogs = await res.json()
		// const blogsWithImage = allBlogs.filter( el => !!el.post?.image  )
		// const blogFeatured = allBlogs[0]
		// const blogs = allBlogs.slice(1)

		return {
			props: { blogs }
		};

	}
</script>
<script>
    import Meta from '$lib/components/meta.svelte'
	import Post from '$lib/components/post-image.svelte'
	import Featured from '$lib/components/featured.svelte'
	import FeaturedSmall from '$lib/components/featured-small.svelte'
	// import PostSmall from '$lib/components/post-small.svelte'
	// import Weather from '$lib/gadgets/weather.svelte'
	import '$lib/isToday'
	import '$lib/random'
	
	export let blogs = []
	// let blogFeatured = {}
	let from = 0
	let to = 15
	let showPagination = !!blogs.length

	async function more(){
		const amount = 12
		from = blogs.length 
		to = to + amount
		const res = await fetch(`/posts.json?from=${from}&to=${to}`)

		if (res.ok) {
			const moreBlogs = await res.json()
			blogs = [ ...blogs, ...moreBlogs ]
			showPagination = moreBlogs.length === amount
		}

	}

</script>

<Meta/>

<!-- <div>
	<Weather/>
</div> -->
<div class="mb-12 space-y-24">

	<div>
		<div class="md:flex md:items-center space-y-6 md:space-y-0 md:space-x-8">

			<div class="flex-shrink-0 w-full md:w-3/5"> 
				<Featured blog={blogs[0]} featured/>
			</div>

			<div class="flex justify-center">
				<div class="space-y-6">
					{#each blogs.slice(1,4) as blog (blog.id)}
						<FeaturedSmall {blog} />
					{/each}
				</div>
			</div>
			
		</div>

		<div class="group text-center bg-gray-100 py-4 mt-8 hover:bg-red-500 hover:text-white transition duration-300 rounded-lg">
			<a href="/today">
				<h2 class="text-lg sm:text-xl font-bold group-hover:text-white">
					Lectura Rápida del Día
				</h2>
			</a>
		</div>

	</div>

	
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 ">
		{#each blogs.slice(4) as blog (blog.post.url)}
			<Post {blog} />
		{/each}
	</div>

	{#if showPagination}
	<div class="text-center">
		<button on:click={more} class="transition rounded-lg px-8 py-2 border-2 border-red-500 font-bold text-red-500 hover:bg-red-500 hover:text-white">
			Más
		</button>
	</div>
	{/if}

</div>
