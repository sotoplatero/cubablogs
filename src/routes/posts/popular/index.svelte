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
	import Meta from '$lib/components/meta.svelte'
	export let posts = []
	let title = '10 Artículos Más Populares de los últimos 7 días'
</script>

<!-- svelte-ignore missing-declaration -->
<Meta
	title="CubaBlog - 10 Artículos Más Populares"
	description="Listado de los 10 árticulos más visitados en los últimos 7 días"
	url={`https://cubablog.net/posts/popular`}
/>

<article class="sm:w-3/5 mx-auto">
	<h2 class="text-3xl sm:text-5xl mb-16 leading-snug text-center">{title}</h2>
	<div class="space-y-16">
		{#each posts as post, index}
			<div class='flex items-center'>
				<div class="flex-shrink-0 mr-3 sm:mr-6 text-7xl font-bold w-20 text-right">
					{index+1}
				</div>
				<div class="flex flex-col flex-col-reverse sm:flex-row  items-center">
					<div>
						<h3><a href="{post.url}" target="_blank" rel="noopener nofollower">{post.title}</a></h3>
						<p class="leading-normal hidden sm:block">{post.description}</p>
						<p class="text-red-500">{post.hostname}</p>
					</div>
					<div class="w-full sm:w-1/4 flex-shrink-0 sm:ml-4">
	
						{#if  post.image}
							<div class="aspect-w-16 sm:aspect-w-4 aspect-h-9 sm:aspect-h-3 rounded-lg overflow-hidden">
								
								<img src="{post.image}" alt="{post.title}" class="w-full h-full object-center object-cover ">
							</div>
							
						{/if}
	
					</div>	
				</div>
			</div>
		{/each}
	</div>
</article>

<style>
	h3{ @apply text-lg sm:text-2xl font-semibold sm:mb-4;}
	p{ @apply text-base sm:text-lg ;}
</style>