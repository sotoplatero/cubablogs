<script>
	import {onMount} from 'svelte'
	import { page } from '$app/stores';
	import { browser } from '$app/env';
	import Loading from '$lib/components/loading.svelte'

	let post
	let loading = true

	onMount( async () => {
		const {slug} = $page.params
		const res = await fetch(`/post.json?url=${slug}`)
		loading = false

		if (res.ok) {
			post = await res.json()
		}

	})

	function print() {
		if (browser) window.print()
	}

	$: title = post ? post.title : ''

</script>

<svelte:head>
	<title>CubaBlog - {title}</title>
</svelte:head>

<article class="post prose prose-xl mx-auto">
{#if post}
		<div class="text-center mb-8">
			<a href="{post.blog.url}" class="text-lg font-semibold" target="_blank" rel="noopener nofollower" >
				{post.blog.title}
			</a>
			<h1 class="post-title">
				{post.title}
			</h1>
			<div class="text-center mt-8">
				<a href="{post.link}" class="" target="_blank" rel="noopener nofollower">
					Leer el Original			
				</a>			
			</div>			
		</div>
		<div  class="flex items-center justify-end print:hidden space-x-2 mb-4 !text-gray-600">
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
		<article class="text-justify">
			{@html post['body'] }
			<div class="text-center mt-8">
				<a href="{post.link}" class="" target="_blank" rel="noopener nofollower">
					Leer el Original			
				</a>			
			</div>
		</article>
{:else}
	<Loading />
{/if}
</article>