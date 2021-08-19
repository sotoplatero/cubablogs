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

<div class="w-full sm:w-2/5 mx-auto text-center my-20">
	<h2 class="text-8xl font-bold">{status}</h2>
	<p class="text-2xl text-gray-600 mt-4">
		{#if status === 404}
			Esta página no se encuentra. Revise la dirección
		{/if}
		{#if status >= 500}
			Bueno tenemos un errorcito, nadie es perfecto. Nos enviamos una notificación y lo revisamos. Intentelo más tarde.
		{/if}
	</p>
	<p>
		Puedes vuelver al <a href="/" class=""><b>inicio</b></a>
	</p>
</div>
<!-- {#if parseInt}
	
{/if}
{JSON.stringify(error)} -->