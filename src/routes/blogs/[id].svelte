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
	import Meta from '$lib/components/meta.svelte'
	// export let feed
	export let blog
	// let post = feed.items[0]

	function formatDate(d) {
		return new Date(d).toLocaleDateString('es-ES', { month:"short", day:"numeric"})	
	} 
</script>

<Meta
	title={blog.title}
	description={blog.description}
/>
<svelte:head>
	<title>CubaBlog - {blog.title}</title>
</svelte:head>

<div class="relative aspect-w-16 aspect-h-7 sm:aspect-h-5 md:aspect-h-3 bg-gray-50 overflow-hidden pattern" >
	<img src="{blog.image}" alt="" class="absolute h-full w-full object-cover blur">
</div>
<div class="w-full max-w-2xl mx-auto relative  -mt-24">
	<header class="mb-10 text-center">
		<a href="{blog.url}" target="_blank" rel="noopener nofollower">
			{#if  blog.logo}
				<img src="{blog.logo}" class="w-32 h-32 mx-auto rounded-xl bg-white shadow-xl " alt="logo {blog.title}">
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" class="w-32 h-32 rounded-xl mx-auto bg-gray-100 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
				  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
				</svg>				
			{/if}
			<div class="w-full sm:w-3/4 mx-auto mt-6">
				<h1 class="text-3xl font-bold">
					{blog.title}
				</h1>
				{#if blog.description}
					<p class="text-lg text-gray-600 mt-4">{blog.description}</p>
				{/if}
				<div class="flex justify-center mt-4 space-x-2 text-gray-500">
					<a href="{blog.url}" class="hover:text-blue-500" target="_blank" rel="noopener nofollower">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
						</svg>				
					</a>
					<a href="{blog.rss}" class="hover:text-yellow-500" target="_blank" rel="noopener nofollower">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
						</svg>					
					</a>
					{#if blog.twitter}
						<a href="{blog.twitter.url}" target="_blank" rel="noopener nofollower" class="hover:text-blue-400 font-medium flex items-center justify-center ">
							<svg class="w-6 h-6 inline fill-current" stroke="currentColor" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
						</a>
					{/if}
				</div>
			</div>
		</a>
	</header>
	<div>
		<ul class="space-y-2 text-lg">
			{#each blog.items as item, index}
				<li>
					<a href="/post/{blog.id}/{item.link.replace(/https?:\/\//,'')}" class="flex " >
						<span class="text-sm text-gray-400 mr-3 w-8 sm:w-12 inline-block flex-shrink-0 whitespace-nowrap">
							{formatDate(item.pubDate)}
						</span>
						<span class="font-semibold">{item.title}</span>
					</a >
				</li>
			{/each}
			
		</ul>
	</div>
</div>

<style>
	.pattern {
background-color: #dbdbdf;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cg fill='%23c7c7ca' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E");
}
</style>