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
	import Pagination from '$lib/components/pagination.svelte'
	
	export let blogs = []
	export let p = 1

	$: filteredBlogs = blogs

	function removeimage(node,src) {
		console.log(src)
		const image = node.querySelector(`img[src^="${src}"]`)
		if (image) image.remove()
	}
		
</script>

<div class="prose prose-lg mx-auto">
<!-- 	<div class="mb-6">
		<input type="text" bind:value={search} class="border border-gray-300 p-3 w-full focus:outline-none focus:border-gray-400 text-xl">
	</div> -->
	<!-- <div class="w-full max-w-screen-md mx-auto space-y-8 sm:space-y-24"> -->
		{#each filteredBlogs as blog (blog.id)}

			<article class="border rounded-xl overflow-hidden" >
				{#if blog.post.image}
					<div class="aspect-w-16 aspect-h-9 overflow-hidden ">
						<img src="{blog.post.image}" alt="{blog.post.title}" class="object-cover !m-0" loading="lazy">
					</div>			
				{/if}


				<div class="p-4">
					<h2 class="font-semibold transition text-gray-700 group-hover:text-gray-900 !mb-2">
						{blog.post.title}
					</h2>	
					<div class='flex items-center mb-1'>
						<span class="flex-shrink-0 rounded-full shadow overflow-hidden ">
							<Avatar {blog} class="w-9 h-9"/>
						</span>
						<span class="ml-2 font-medium text-gray-600 line-clamp-1 break-all">
							{blog.hostname}
						</span>
					</div>		
					<div class="h-96 overflow-hidden" use:removeimage={blog.post.image}>
						{@html blog.post.content}
					</div>
					<div class="text-center mt-4">
						<a href="{blog.post.url}" class="" target="_blank" rel="noopener nofollower">
							Leer el Original		
						</a>			
					</div>	
				</div>
			</article>
			<div class="text-center text-4xl my-12">***</div>
		{/each}
	<!-- </div> -->

</div>
