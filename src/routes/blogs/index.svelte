<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		const p = page.query.get('page') ?? 1
		const res = await fetch(`/blogs.json?page=${p}`);

		if (res.ok) {
			return {
				props: {
					blogs: await res.json(),
					p,
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>
<script>
	import Pagination from '$lib/components/pagination.svelte'
	import Avatar from '$lib/components/avatar.svelte'		

	export let blogs = []
	export let p = 1
	let q = ''

	function debounce(func, timeout = 300){
	  let timer;
	  return (...args) => {
	    clearTimeout(timer)
	    timer = setTimeout(() => { func.apply(this, args); }, timeout)
	  }
	}

	async function search() {

		const res = await fetch(`/blogs.json?q=${q}`)
		if (res.ok) {
			(blogs = await res.json())  
		}
	}



</script>

<div class="mb-12">
	<div class="flex items-center justify-end mb-6">
		<!-- <span class="font-semibold text-gray-600 mr-auto">{blogs.length} de {total} blogs</span> -->
		<div class="flex items-center border border-gray-200 p-3  focus:border-gray-400 text-xl">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
			</svg>
			<input type="text" bind:value={q} on:input={debounce(()=>search())} class="focus:outline-none ml-2">
		</div>
	</div>

	<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-12">
	{#each blogs as blog (blog.url)}
		<div >
			<a href="/blogs/{blog.id}/{blog.url.replace(/^https?:\/\//,'')}" class="group mb-auto">
				<div class="overflow-hidden rounded-lg">
					<Avatar blog={blog} class="w-32 h-32 mx-auto rounded-xl "/>
				</div>	
				<div>
					<div class="mb-4 mt-3 text-center">
						<h2 class="text-lg sm:text-xl font-semibold line-clamp-1">
							{blog.title}
						</h2>
						<!-- <p class="text-gray-400 truncate text-green-400 text-sm">{blog.url}</p> -->
					</div>
					{#if blog.description}
						<p class="transition text-gray-500 group-hover:text-gray-700 line-clamp-2 text-justify">
							{blog.description}
						</p>
					{/if}
				</div>
			</a>
			<div class="flex items-center justify-center space-x-4 mt-4 text-gray-400">
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
<!-- 					<a href="https://twitter.com/{blog.twitter.replace(/\@/,'')}" target="_blank" rel="noopener nofollower" class="hover:text-blue-400 font-medium flex items-center justify-center ">
						<svg class="w-6 h-6 inline fill-current" stroke="currentColor" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
					</a> -->
				{/if}
					
			</div>
		</div>
	{/each}
	</div>

	<div class="mt-10">
		<Pagination {p}/>
	</div>
</div>
