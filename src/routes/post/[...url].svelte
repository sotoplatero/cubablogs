<script context="module">
	export async function load({ page, fetch }) {
		const {url} = page.params

		const res = await fetch(`/post.json?url=${url}`)	

		if ( !res.ok ) {
			return {
				status: res.status,
				error: new Error(`Could not load ${url}`)
			};
		}

		return {
			props: {post: await res.json()}
		};

	}
</script>
<script>
	import { browser } from '$app/env';
	import Avatar from '$lib/components/avatar.svelte'	
	import Meta from '$lib/components/meta.svelte'	


	export let post
	let loading = false

	function print() {
		if (browser) window.print()
	}

	$: title = post ? post.title : ''

</script>

<Meta
	title={post.title}
	description="{post.description}"
	isPost={1}
	author={post.blog.title}
	avatar={post.blog.logo}
	url={`https://cubablog.net${post.url}`}
	image={post.image}
/>

<!-- <img src="{post.image}" alt=""> -->
<article class="post prose md:prose-lg xl:prose-xl mx-auto mt-10 min-h-screen">
	<div class="text-center mb-6">
		<h1 class="post-title">
			{post.title}
		</h1>
		<div class="text-center">
			<a href="/blogs/{post.blog.id}/{post.blog.url.replace(/^https?:\/\//,'')}" class="post-author flex items-center justify-center" >
				<Avatar blog={post.blog} class="w-12 h-12 !m-0 rounded-full overflow-hidd"/>
				<span class="ml-2">
					{post.blog.title}
				</span>
			</a>
			<div class="post-date" datetime="{new Date(post.pubDate).getTime()}">
				{new Date(post.pubDate).toLocaleDateString(
					'es-ES', 
					{ 
						month:"short", 
						day:"numeric", 
						year: "numeric"
					})
				}
			</div>				
		</div>
	</div>

	<div  class="flex items-center justify-end print:hidden space-x-2 mb-4 !text-gray-600 not-sr-only">
		<div class="text-center">
			<a href="{post.link}" class="text-sm" target="_blank" rel="noopener nofollower">
				Leer el Original		
			</a>			
		</div>			
		<button on:click={print} >
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
			</svg>			
		</button >
		<a href="https://cdn.statically.io/screenshot/pdf/{post.link.replace(/https?:\/\//,'')}" download>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
			</svg>			
		</a>
	</div>

	<div class="post-body text-justify">
		{@html post.body }
	</div>
	<div class="text-center mt-8 print:hidden">
		<a href="{post.link}" class="" target="_blank" rel="noopener nofollower">
			Leer el Original			
		</a>			
	</div>


</article>

<div class=" max-w-[64ch] mx-auto text-xl mt-16 print:hidden">
	<div class="line-clamp-1 text-base sm:text-lg">Más en <strong>{post.blog.title}</strong></div>
	<div class="sm:grid sm:grid-cols-2 space-y-6 sm:space-y-0 sm:gap-8 text-lg sm:text-xl border-t pt-4">
		{#each post.related as {url,title}, index}
			<h3 class="m-0 font-semibold text-center {index===0 ? 'sm:text-left' : 'sm:text-right'}">
				<a href="{url}">{title}</a>
			</h3>
		{/each}
	</div>
</div>