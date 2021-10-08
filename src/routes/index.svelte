<script context="module">
	import '$lib/isToday'
	import '$lib/random'	
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		const url = `/posts.json`;
		const res = await fetch(url);

		if (!res.ok) {
			return {
				status: res.status,
				error: new Error(`Could not load ${url}`)
			};
		}

		const allBlogs = await res.json()
		const blogsWithImage = allBlogs.filter( el => !!el.post?.image  )
		const blogFeatured = blogsWithImage.filter( el => el.post.date.isToday() ).random() ?? blogsWithImage[0]
		const blogs = allBlogs.filter( el => el.url !== blogFeatured.url  )
	// $: indexFeatured = blogs.findIndex( el => el.url == blogFeatured.url )

		return {
			// props: { blogs: blogs.filter(el=>!!el.post.description) }
			props: { blogs,	blogFeatured }
		};

	}
</script>
<script>
    import Meta from '$lib/components/meta.svelte'
	import Post from '$lib/components/post-image.svelte'
	import Featured from '$lib/components/featured.svelte'
	import FeaturedSmall from '$lib/components/featured-small.svelte'
	import PostSmall from '$lib/components/post-small.svelte'
	import Quote from '$lib/gadgets/quote.svelte'
	import Joke from '$lib/gadgets/joke.svelte'
	import Gaceta from '$lib/gadgets/gaceta.svelte'
	import Ephemeris from '$lib/gadgets/ephemeris.svelte'
	import '$lib/isToday'
	import '$lib/random'
	
	export let blogs = []
	export let blogFeatured = {}

</script>

<Meta/>

<div class="mb-12 space-y-24">

	<div>
		
		<div class="group text-center bg-gray-100 py-4 mb-4 hover:bg-red-500 hover:text-white transition duration-300">
			<a href="/today">
				<h2 class="text-xl sm:text-2xl font-bold group-hover:text-white">Lectura Rápida del Día</h2>
			</a>
		</div>

		<div class="md:flex md:items-center md:space-x-8">

			<div class="flex-shrink-0 w-full md:w-3/5"> 
				<Featured blog={blogFeatured} featured/>
			</div>

			<div class="flex justify-center">
				<div class="space-y-6">
					{#each blogs.slice(0,3) as blog (blog.post.url)}
						<FeaturedSmall {blog} />
					{/each}
				</div>
			</div>
			
		</div>
	</div>

	<div>
		<div class="text-3xl font-extralight mb-8">Lo Últimito</div>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 ">
			{#each blogs.slice(3,12) as blog (blog.post.url)}
				<Post {blog} />
			{/each}
		</div>
	</div>

	<div class="">
		<div class="text-3xl font-extralight mb-8">Un poquito más</div>
		<div class="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 ">
			{#each blogs.slice(12,25) as blog (blog.post.url)}
				<PostSmall {blog} />
			{/each}
		</div>
	</div>


<!-- 		<aside class="sidebar divide-y pl-8">
			<Gaceta/>
			<Quote/>
			<Joke/>
			<Ephemeris/>
		</aside>
 -->

</div>
