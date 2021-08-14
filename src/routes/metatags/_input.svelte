<script>
	export let value
	export let label 
	export let disabled = false 
	export let rows = 1
	let klass = 'text-gray-800 bg-gray-100 px-2 py-2 hover:outline-none w-full disabled:text-gray-400'
	$: size = value.length	
</script>
<div>
	<label for={label} class="text-sm font-bold">{label}</label>
	{#if rows==1}
		<input 
			bind:value
			name="{label}" 
			class="{klass}" 
			on:input
			{disabled}
		/>
	{:else}	
		<textarea
			bind:value
			{rows}
			name="{label}" 
			class="{klass}"
			on:input
			{disabled}
		></textarea> 
	{/if}
</div>