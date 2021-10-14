<script>
	export let blog
	export {_class as class}
	let _class = ''
	let date = new Date(blog.post.date).toLocaleDateString('es-ES', { month:"short", day:"numeric"})

</script>
<div class="text-gray-400 {_class}">
	<span class="font-medium whitespace-nowrap">{date}</span>
	{#if blog.post.time}
		<span class="mx-1">&bull;</span>
		<span>{Math.ceil(blog.post.time)} min</span>
	{/if}
</div>