<script context="module">
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

		return {
			// props: { blogs: blogs.filter(el=>!!el.post.description) }
			props: { blogs: await res.json() }
		};

	}
</script>
<script>
    import Meta from '$lib/components/meta.svelte'
	import Post from '$lib/components/post.svelte'
	import Quote from '$lib/components/quote.svelte'
	import Joke from '$lib/components/joke.svelte'
	
	export let blogs = []
	let promiseGaceta = getGaceta()

	let blogFeatured = blogs.find( el => !!el.post.image )
	$: indexFeatured = blogs.findIndex( el => el.url == blogFeatured.url )

	async function getGaceta() {
		const res = await fetch('/api/gaceta.json')
		return await res.json()
	}

</script>

<Meta/>

<div class="mb-12">
	<div class="mb-20"> 
		<Post blog={blogFeatured} featured/>
	</div>

	<div class="grid grid-cols-3 gap-12">
		<div class="posts col-span-2 space-y-8 sm:space-y-16 ">
			{#each blogs.filter( (el, idx) => idx !== indexFeatured ) as blog (blog.post.url)}
				<Post {blog} />
			{/each}
		</div>

		<div class="space-y-8">
			<div class="gaceta border py-4 px-5">
				{#await promiseGaceta then gaceta}
					<a href="{gaceta.url}" class="text-gray-500 " target="_blank">
						<h2 class="mb-2">Gaceta {gaceta.number}: {gaceta.type}</h2>
					</a>
					<div class="space-y-3 text-sm">
						{#each gaceta.items as item, index}
						<div>
							<strong>{item.title}</strong>
							<p class="text-gray-600">{item.content}</p>
						</div>
						{/each}
					</div>
					<a href="{gaceta.file}" download class="mt-4 inline-block">Descargar</a>
				{/await}
				
			</div>

			<Quote/>
			<Joke/>
		</div>
	</div>

	<a href="/posts" class="flex items-center justify-center mt-16 text-xl font-semibold hover:underline">
		Todos los artículos
		<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
		</svg>		
	</a>

</div>
