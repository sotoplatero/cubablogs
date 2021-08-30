<script context="module">
	export async function load({ page, fetch }) {
		const {id} = page.params

		const res = await fetch(`/blogs/${id}.json`)
		const blog = await res.json()
		
		if ( !res.ok ) {
			return {
				status: res.status,
				error: new Error(`Could not load ${url}`)
			};
		}

		return {
			props: {blog}
		};

	}
</script>
<script>
	// export let feed
	export let blog
	// let post = feed.items[0]

	function formatDate(d) {
		return new Date(d).toLocaleDateString('es-ES', { month:"short", day:"numeric"})	
	} 
</script>

<svelte:head>
	<title>CubaBlog - {blog.title}</title>
</svelte:head>

<div class="w-full max-w-2xl mx-auto">
	<header class="mb-10 text-center">
		<a href="{blog.url}" target="_blank" rel="noopener nofollower">
			{#if blog.twitter || blog.logo}
				<img src="{blog.twitter ? blog.twitter.avatar : blog.logo}" class="w-32 h-32 mx-auto rounded-xl" alt="logo {blog.title}">
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" class="w-32 h-32 rounded-xl mx-auto bg-gray-100 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
				  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
				</svg>				
			{/if}
			<div class="w-full sm:w-3/4 mx-auto mt-6">
				<h1 class="text-3xl font-bold">
					{blog.title}
					<svg xmlns="http://www.w3.org/2000/svg" class="inline h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
					</svg>					
				</h1>
				{#if blog.description}
					<p class="text-lg text-gray-600 mt-4">{blog.description}</p>
				{/if}
			</div>
		</a>
	</header>
	<div>
		<p class="uppercase mb-4 text-gray-600">
			Últimos Artículos
		</p>
		<ul class="space-y-2 text-lg">
			{#each blog.items as item, index}
				<li>
					<a href="{item.link}" class="flex " target="_blank" rel="noopener nofollower">
						<span class="text-sm text-gray-400 mr-3 w-8 sm:w-12 inline-block flex-shrink-0">
							{formatDate(item.pubDate)}
						</span>
						<span class="font-semibold">{item.title}</span>
					</a >
				</li>
			{/each}
			
		</ul>
	</div>
</div>