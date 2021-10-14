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

<div class='flex items-center mb-1 uppercase text-sm text-gray-400 tracking-wider {_class}'>
	<span class="flex-shrink-0 rounded-full shadow overflow-hidden rounded-0 ">
		<Avatar {blog} class="{sizeAvatar}"/>
	</span>
	<span class="ml-1 break-all line-clamp-1">
		{ blog.hostname.replace(/^www\./,'')}
	</span>
</div>	