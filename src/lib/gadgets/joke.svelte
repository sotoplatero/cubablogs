<script>
	import {onMount} from 'svelte'
	import Loading from '$lib/ui/loading.svelte'

	import '$lib/random'

	let promiseJoke = new Promise(r=>r)
	let emojis = [ '😊','☺','🙂','😎','😄','🥲','😁','🤭','😃','😆' ]


	onMount(()=>{
		promiseJoke = getJoke()	
	})

	async function getJoke() {
		const res = await fetch('/api/joke.json')
		return await res.json()
	}

	function randomJoke() {
		try {
			promiseJoke = getJoke()
		} catch (e) { console.log(e)}
	}	
</script>
<div class="joke w-full py-6 px-6">
	{#await promiseJoke}

		<Loading />

	{:then joke}

		<h2 class="mb-2 font-bold">Chiste {emojis.random()}</h2>
		<a href="{joke.url}" class="block mb-4" target="_blank" rel="noopener">
			<p class="">{@html joke.content}</p>
		</a>
		<button on:click={randomJoke} class="flex items-center text-gray-700 hover:text-gray-900 text-sm uppercase">
			<strong>Más &rarr;</strong>
		</button>
		
	{/await}				
</div>