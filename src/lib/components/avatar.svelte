<script>
	export let blog
	export { _class as class}
	let _class = "w-7 h-7"

	const colors = ["text-red-500","text-red-700", "text-green-500", "text-blue-500", "text-indigo-500", "text-indigo-700","text-purple-500","text-purple-700","text-yellow-600","text-yellow-700","text-pink-500","text-pink-700"]

	let color = colors[ Math.floor( Math.random() * colors.length ) ] 

</script>

	<!-- // {#if (blog.logo || blog.twitter)} -->
		<img 
			src={ blog.logo }
			alt="{blog.title}" 
			class="{_class} mt-0 mb-0 object-center object-cover  " style="margin-top: 0; margin-bottom: 0;">
<!-- 	{:else}

		<svg xmlns="http://www.w3.org/2000/svg" class="{_class} {color}" viewBox="0 0 20 20" fill="currentColor">
		  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
		</svg>

	{/if}	
 -->
