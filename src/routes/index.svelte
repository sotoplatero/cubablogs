<script context="module">
	import '$lib/isToday'
	import '$lib/random'	
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		const url = `/blogs.json`;
		const res = await fetch(url);

		if (!res.ok) {
			return {
				status: res.status,
				error: new Error(`Could not load ${url}`)
			};
		}

		const allBlogs = await res.json()
		console.log(allBlogs)
		const blogsWithImage = allBlogs.filter( el => !!el.post?.image )
		const blogFeatured = blogsWithImage.filter( el => el.post.date.isToday() ).random() ?? blogsWithImage[0]
		const blogs = allBlogs.filter( el => el.url !== blogFeatured.url )
	// $: indexFeatured = blogs.findIndex( el => el.url == blogFeatured.url )

		return {
			// props: { blogs: blogs.filter(el=>!!el.post.description) }
			props: { blogs,	blogFeatured }
		};

	}
</script>
<script>
    import Meta from '$lib/components/meta.svelte'
	import Post from '$lib/components/post.svelte'
	import Quote from '$lib/gadgets/quote.svelte'
	import Joke from '$lib/gadgets/joke.svelte'
	import Gaceta from '$lib/gadgets/gaceta.svelte'
	import Ephemeris from '$lib/gadgets/ephemeris.svelte'
	import '$lib/isToday'
	import '$lib/random'
	
	export let blogs = []
	export let blogFeatured = {}

	// $: blogFeatured = blogs.filter( el+ => !!el.post.image && el.post.date.isToday() ).random()
	// $: indexFeatured = blogs.findIndex( el => el.url == blogFeatured.url )

</script>

<Meta/>

<div class="mb-12">
	<div class="mb-20"> 
		<Post blog={blogFeatured} featured/>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-12 divide-x">

		<div class="md:col-span-2">
			<div class="posts space-y-8 sm:space-y-16 ">
				{#each blogs as blog (blog.post.url)}
					<Post {blog} />
				{/each}
			</div>
			
			<a href="/posts" class="flex items-center justify-center mt-16 text-xl font-semibold hover:underline">
				Todos los artículos
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
				</svg>		
			</a>
		</div>

		<aside class="sidebar divide-y pl-8">
			<Gaceta/>
			<Quote/>
			<Joke/>
			<Ephemeris/>
		</aside>

	</div>


</div>
