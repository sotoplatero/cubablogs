<script>
	import { page } from '$app/stores';	
	export let next_page
	export let prev_page

	$: prev_url = `${$page.path}?page=${prev_page}`
	$: next_url = `${$page.path}?page=${next_page}` 

</script>

<div class="flex items-center justify-center space-x-4">
	{#if prev_page}
		<a href="{prev_url}" class="flex items-center justify-center  text-xl font-semibold text-gray-600 hover:text-gray-800" disabled={!prev_page}>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
			</svg>	
		</a>
	{:else}
		<span class="text-gray-400">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
			</svg>			
		</span>
	{/if}
	{#if next_page}
		<a href="{next_url}" class="flex items-center justify-center  text-xl font-semibold text-gray-600 hover:text-gray-800">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
			</svg>	
		</a>
	{:else}
		<span class="text-gray-400">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
			</svg>	
		</span>
	{/if}
</div>