	
<script>
	import Spin from '$lib/ui/Spin.svelte'
	export let blogs = []
	let show = !!blogs.length
	let loading = false

	async function more(){
		const amount = 12
		const from = blogs.length 
		const to = blogs.length + amount - 1
		loading = true
		const res = await fetch(`/posts.json?from=${from}&to=${to}`)
		loading = false

		if (res.ok) {
			const moreBlogs = await res.json()
			blogs = [ ...blogs, ...moreBlogs ]
			show = moreBlogs.length === amount
		}

	}
</script>

{#if show}
	<div class="text-center flex justify-center">
		<button 
			on:click={more} 
			disabled={loading}
			class="flex items-center justify-center transition px-8 py-2 border-2 border-red-500 font-bold text-red-500 hover:bg-red-500 hover:text-white disabled:opacity-50 rounded-lg"
		>
			{#if loading}
				<Spin class="mr-2"/>
			{/if}
			Más
		</button>
	</div>
{/if}