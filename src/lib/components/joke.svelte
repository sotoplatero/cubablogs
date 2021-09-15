<script>
	let promiseJoke = getJoke()	

	async function getJoke() {
		const res = await fetch('/api/joke.json')
		return await res.json()
	}

	function randomJoke() {
		promiseJoke = getJoke()
	}	
</script>
<div class="joke w-full bg-gray-100 py-4 px-6">
	{#await promiseJoke}
		<span class="text-gray-600">Cargando...</span>
	{:then joke}
		<strong class="border-b">Chiste</strong>
		<a href="{joke.url}" class="block mb-4" target="_blank" rel="noopener">
			<p class="">{@html joke.content}</p>
		</a>
		<button on:click={randomJoke} class="flex items-center text-gray-700 hover:text-gray-900">
<!-- 			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
			</svg> -->			
			<strong>Actualizar</strong>
		</button>

	{/await}				
</div>