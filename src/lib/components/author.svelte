<script>
	import Avatar from '$lib/components/avatar.svelte'	
	export let blog
	export let size = 7
	export {_class as class}
	let _class = ''

	let sizeAvatar = {
		6: 'w-6 h-6',
		7: 'w-7 h-7',
		8: 'w-8 h-8',
	}[size]
</script>
<div class='text-gray-400 flex items-center mb-1 font-medium {_class}'>
	<span class="flex-shrink-0 rounded-full shadow overflow-hidden rounded-0 ">
		<Avatar {blog} class="{sizeAvatar}"/>
	</span>
	<span class="ml-2 line-clamp-1">
		{ blog.hostname}
	</span>
</div>	