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

<div class="gaceta w-full py-6 ">
	{#await promiseGaceta }
		<Loading/>
	{:then gaceta}

		<a href="{gaceta.url}" class=" " target="_blank">
			<h2 class="mb-2 font-semibold">Gaceta {gaceta.number}: {gaceta.type}</h2>
		</a>
		<div class="space-y-3">
			{#each gaceta.items as item, index}
			<div>
				<div class="font-semibold">{item.title}</div>
				<p class="">{item.content}</p>
			</div>
			{/each}
		</div>
		<a href="{gaceta.file}" download class="mt-4 inline-block font-semibold text-sm uppercase">
		PDF &darr;</a>
	{/await}
	
</div>