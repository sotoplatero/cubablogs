<script>
	import {onMount} from 'svelte'	
	import Loading from '$lib/ui/loading.svelte'
	
	let promiseQuote = new Promise(r=>r)	

	onMount(()=>{
		promiseQuote = getQuote()	
	})

	async function getQuote() {
		const res = await fetch('/api/quote.json')
		return await res.json()
	}

	function randomQuote() {
		promiseQuote = getQuote()
	}	
</script>
<div class="quote py-4 px-6">
	{#await promiseQuote }
		<Loading/>
	{:then quote}
		<a href="{quote.url}" class="block mb-3" target="_blank">
			<p class="italic">{quote.content}</p>
			<p class="text-right text-sm"><em>{quote.author}</em></p>
		</a>
		<button on:click={randomQuote} class="text-gray-700 hover:text-gray-900 text-sm uppercase">
			Actualizar
		</button>

	{/await}				
</div>