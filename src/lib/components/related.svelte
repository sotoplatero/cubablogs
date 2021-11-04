<script>
	import Post from '$lib/post-image.svelte'
	let posts = []

	function getRelatedPosts(){

	}
</script>

<div class="">
	<div class="line-clamp-1 text-base sm:text-lg">
		Debe interesarte también... 
	</div>
	<div class="sm:grid grid-cols-2 sm:grid-cols-3 sm:gap-8 text-lg border-t pt-4">
		{#each posts as post, index}
			<h3 class="m-0 font-semibold text-center {index===0 ? 'sm:text-left' : 'sm:text-right'}">
				<a href="{url}">{title}</a>
			</h3>
		{/each}
	</div>
</div>