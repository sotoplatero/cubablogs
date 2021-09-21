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

		<a href="{gaceta.url}" class="mb-2 block" target="_blank">
			<h2 class="font-semibold">Gaceta {gaceta.number}: {gaceta.type}</h2>
			<span class="text-gray-600">{new Date(gaceta.date).toLocaleDateString('es-CU')}</span>
		</a>
		<div class="space-y-3">
			{#each gaceta.items.filter((el,idx)=>idx<3) as item, index}
			<div>
				<div class="font-semibold">{item.title}</div>
				<p class="">{item.content}</p>
			</div>
			{/each}
		</div>
		<div class="space-x-4">
			<a href="{gaceta.url}" download class="mt-4 inline-block font-semibold text-sm uppercase">
				MÁs &rarr;
			</a>
			<a href="{gaceta.file}" download class="mt-4 inline-block font-semibold text-sm uppercase">
				PDF &darr;
			</a>
		</div>
	{/await}
	
</div>