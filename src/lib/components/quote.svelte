<script>
	let promiseQuote = getQuote()	

	async function getQuote() {
		const res = await fetch('/api/quote.json')
		return await res.json()
	}

	function randomQuote() {
		promiseQuote = getQuote()
	}	
</script>
<div class="quote border border-yellow-500 py-4 px-6">
	{#await promiseQuote }
	<span class="text-gray-600">Cargando...</span>
	{:then quote}
		<a href="{quote.url}" class="block mb-3" target="_blank">
			<h2 class="mb-1">{quote.content}</h2>
			<p class="text-right text-sm"><em>{quote.author}</em></p>
		</a>
		<button on:click={randomQuote} class="text-gray-700 hover:text-gray-900">
			<strong>Actualizar</strong>
		</button>

	{/await}				
</div>