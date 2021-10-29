<script>
	import {onMount} from 'svelte'
	import Loading from '$lib/ui/loading.svelte'


	let location = 'La Habana'
	let promiseWeather = getWethear()
	const locations = ['La Habana','Pinar del Rio','Mayabeque','Artemisa']

	// onMount(()=>{
	// 	promiseWeather = getWethear()	
	// })

	async function getWethear() {
		const res = await fetch(`/api/weather/${encodeURIComponent(location)}.json`)
		return await res.json()
	}

</script>
	{#await promiseWeather}
		<Loading />
	{:then { weather: [w] ,main,visibility,wind,cloud} }
		<div class="flex items-center text-sm">
			<img 
				src="http://openweathermap.org/img/wn/{w.icon.replace('n','d')}.png" 
				alt="{w.main}" 
				class="drop-shadow-sm bg-gray-300 rounded h-12 w-12"
			>
			<div class="ml-2">
				<p>{main.temp}</p>
				<p>{w.description}</p>
			</div>
		</div>
	{/await}