<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		const res = await fetch(`/posts/popular.json`);

		if ( !res.ok ) {
			return {
				status: res.status,
				error: new Error(`Could not load ${url}`)
			};
		}

		return {
			props: {
				posts: await res.json(),
			}
		};

	}
</script>
<script>
	export let posts = []
</script>

<article class="w-11/12 w-3/5 mx-auto">
	<h2 class="text-5xl mb-16 leading-snug">10 Articulos Más Populares de los últimos 7 días</h2>
	<div class="space-y-16">
		{#each posts as post, index}
			<div class='flex items-center'>
				<div class="mr-6 text-7xl font-bold">
					{index+1}
				</div>
				<div class="">
					<h3><a href="{post.url}" target="_blank" rel="noopener nofollower">{post.title}</a></h3>
					<p class="leading-normal">{post.description}</p>
	
				</div>
				<div class="w-full sm:w-1/4 flex-shrink-0 ml-4">

					{#if  post.image}
						<div class="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
							<img src="{post.image}" alt="{post.title}" class="w-full h-full object-center object-cover ">
						</div>
						
					{/if}

				</div>	
			</div>
		{/each}
	</div>
</article>

<style>
	h3{ @apply text-2xl font-semibold mb-4;}
	p{ @apply text-lg ;}
</style>