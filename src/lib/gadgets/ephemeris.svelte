<script>
	import {onMount} from 'svelte'
	import Loading from '$lib/ui/loading.svelte'

	let promiseEphemeris = new Promise(r=>r)

	onMount(()=>{
		promiseEphemeris = getEphemeris()	
	})

	async function getEphemeris() {
		const res = await fetch('/api/ephemeris.json')
		return await res.json()
	}

</script>

<div class="gaceta w-full py-4 px-5">
	{#await promiseEphemeris }
		<Loading/>
	{:then ephemeris}

		<h2 class="mb-2 font-bold">Efemerides</h2>
		<div class="space-y-3">
			{#each ephemeris.days as day, index}
				<div>{@html day}</div>
			{/each}
		</div>
		<a href="{ephemeris.url}" class="mt-4 inline-block" target="_blank">
			MÁS &rarr;
		</a>

	{/await}
	
</div>

<style>
	/*a{ @apply text-blue-500; }*/
</style>