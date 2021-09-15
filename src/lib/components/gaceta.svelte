<script>
	import {onMount} from 'svelte'
	let promiseGaceta = new Promise(r=>r)

	onMount(()=>{
		promiseGaceta = getGaceta()	
	})

	async function getGaceta() {
		const res = await fetch('/api/gaceta.json')
		return await res.json()
	}

</script>

<div class="gaceta w-full border-2 py-4 px-5">
	{#await promiseGaceta then gaceta}

		<a href="{gaceta.url}" class="text-gray-500 " target="_blank">
			<h2 class="mb-2">Gaceta {gaceta.number}: {gaceta.type}</h2>
		</a>
		<div class="space-y-3 text-sm">
			{#each gaceta.items as item, index}
			<div>
				<strong>{item.title}</strong>
				<p class="text-gray-600">{item.content}</p>
			</div>
			{/each}
		</div>
		<a href="{gaceta.file}" download class="mt-4 inline-block text-sm uppercase"><strong>Descargar</strong></a>
	{/await}
	
</div>