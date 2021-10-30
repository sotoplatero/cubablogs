<script>
	import Avatar from '$lib/components/avatar.svelte'	
	export let blog
	export let size = 8
	export {_class as class}
	let _class = ''

	let sizeAvatar = {
		6: 'w-6 h-6',
		7: 'w-7 h-7',
		8: 'w-8 h-8',
	}[size]

	let date = new Date(blog.post.date).toLocaleDateString('es-ES', { month:"short", day:"numeric"})

</script>

<div class='flex items-center mb-1 text-gray-400 leading-tight  {_class}'>
	<span class="flex-shrink-0 rounded-full shadow overflow-hidden rounded-0 mr-3">
		<Avatar {blog} class="{sizeAvatar}"/>
	</span>
	<div>
		<div class="break-all line-clamp-1">
			{ blog.hostname.replace(/^www\./,'')}
		</div>
		<div class="">
			<span class="font-medium whitespace-nowrap">{date}</span>
			{#if blog.post.time}
				<span class="mx-1">&bull;</span>
				<span>{Math.ceil(blog.post.time)} min</span>
			{/if}	
		</div>	
	</div>	
</div>	