<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		const res = await fetch(`/today.json`);

		if ( !res.ok ) {
			return {
				status: res.status,
				error: new Error(`Could not load ${url}`)
			};
		}

		return {
			props: {
				blogs: await res.json(),
			}
		};

	}
</script>
<script>
	import PostImage from '$lib/components/post-image.svelte'
	import Image from '$lib/components/image.svelte'
	import Avatar from '$lib/components/avatar.svelte'
	// import Pagination from '$lib/components/pagination.svelte'
	// import Gaceta from '$lib/gadgets/gaceta.svelte'
	
	export let blogs = []
	let reading = ''

	function removeimage(node,src) {
		const url = new URL(src);
		const imageName = url.pathname.split('/').pop()
		console.log(imageName)
		const image = node.querySelector(`img[src~="${imageName}"]`)
		if (image) image.remove()
	}
		
</script>

<!-- <Gaceta/> -->
<div class="prose md:prose-lg xl:prose-xl mx-auto">
<!-- 	<div class="mb-6">
		<input type="text" bind:value={search} class="border border-gray-300 p-3 w-full focus:outline-none focus:border-gray-400 text-xl">
	</div> -->
	<!-- <div class="w-full max-w-screen-md mx-auto space-y-8 sm:space-y-24"> -->
		<h1 class="text-center">Lectura Rápida del Día</h1>
		{#if blogs.length === 0}
			<p class="text-center">
				Todavía no se han publicado articulos en el día de hoy, vuelva en un ratico
			</p>
		{/if}
		{#each blogs as blog (blog.id)}

			<article class="" >
				{#if blog.post.image}
					<div class="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg overflow-hidden">
						<!-- <img src="{blog.post.image}" alt="{blog.post.title}" class="object-cover !m-0" loading="lazy"> -->
						<Image {blog} />
					</div>			
				{/if}


				<div class="">
					<h2 class="sticky top-0 bg-white font-semibold transition text-gray-700 group-hover:text-gray-900 !mt-4 !mb-2">
						{blog.post.title}
					</h2>	
					<div class='flex items-center mb-1'>
						<span class="flex-shrink-0 rounded-full shadow overflow-hidden ">
							<Avatar {blog} class="w-9 h-9 !m-0"/>
						</span>
						<span class="ml-2 font-medium text-gray-600 line-clamp-1 break-all">
							{blog.hostname}
						</span>
					</div>
					{#if reading === blog.post.title}
						<div class="" use:removeimage={blog.post.image}>
							<div class="image-none">
								{@html blog.post.content}
							</div>
							<div class="text-center mt-4">
								<a href="{blog.post.url}" class="" target="_blank" rel="noopener nofollower">
									Leer el Original		
								</a>			
							</div>	
						</div>
					{/if}

					{#if reading !== blog.post.title}
						<button 
							on:click={()=> reading = blog.post.title }
							class="bg-gray-100 text-center w-full py-3 mt-6 font-bold hover:bg-gray-700 hover:text-white transition duration-300"
						>
							Leer &darr;
						</button>
					{/if}
				</div>
			</article>
			<div class="text-center text-4xl my-12">***</div>
		{/each}
	<!-- </div> -->

</div>

<style>
	.image-none img {
		 display: none;
	}
</style>