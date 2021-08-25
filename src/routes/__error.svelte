<script context="module">
	export function load({ error, status }) {

		return {
			props: {
				error, status
			}
		};
	}
</script>

<script>
	// export let error;
	export let status;

</script>

<div class="w-full sm:w-2/5 mx-auto text-center my-16 sm:my-32">
<!-- 	<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
	</svg> -->	
	<h2 class="text-8xl font-bold">{status}</h2>
	<p class="text-2xl text-gray-400 mt-4">
		{#if status === 404}
			Esta página no se encuentra. Revise la dirección
		{/if}
		{#if status >= 500}
			Caramba!! tenemos un errorcito... nadie es perfecto. Intentalo más tarde.
		{/if}
	</p>
	<p class="text-2xl text-gray-600 mt-6">
		Puedes vuelver al <a href="/" class=""><b>inicio</b></a>
	</p>
</div>
<!-- {#if parseInt}
	
{/if}
{JSON.stringify(error)} -->