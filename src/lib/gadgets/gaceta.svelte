<script>
	import {onMount} from 'svelte'
	import Loading from '$lib/ui/loading.svelte'

	let promiseGaceta = new Promise(r=>r)

	onMount(()=>{
		promiseGaceta = getGaceta()	
	})

	async function getGaceta() {
		const res = await fetch('/api/gaceta.json')
		return await res.json()
	}

</script>

<div class="gaceta w-full py-4 px-5">
	{#await promiseGaceta }
		<Loading/>
	{:then gaceta}

		<a href="{gaceta.url}" class=" " target="_blank">
			<h2 class="mb-2 text-medium font-semibold">Gaceta {gaceta.number}: {gaceta.type}</h2>
		</a>
		<div class="space-y-3">
			{#each gaceta.items as item, index}
			<div>
				<strong>{item.title}</strong>
				<p class="text-gray-600">{item.content}</p>
			</div>
			{/each}
		</div>
		<a href="{gaceta.file}" download class="mt-4 inline-block text-sm uppercase">
		PDF &darr;</a>
	{/await}
	
</div>