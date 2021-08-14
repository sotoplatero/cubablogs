<script >
	import SaveToPocket from '$lib/components/saveToPocket.svelte'
	import Avatar from '$lib/components/avatar.svelte'
	export let blog
	let avatar = (blog.twitter ? blog.twitter.avatar : blog.logo) || blog.image
	let date = new Date(blog.post.date).toLocaleDateString('es-ES', { month:"short", day:"numeric"})
</script>
<div >
	<div class="group " >
		<div>
			<div class='flex items-center mb-2'>
				{#if avatar}
					<img 
						src="{avatar}" 
						alt="{blog.title}" 
						class="w-8 h-8 object-center object-cover rounded-full overflow-hidden">
				{:else}
					<Avatar text={blog.title} class="w-8 h-8 rounded-full"/>
				{/if}
				<span class="text-lg ml-2 font-semibold">
					<!-- {blog.post.author || ''} <span class="text-gray-500">en</span> --> <a href="{blog.url}" target="_blank" rel="noopener nofollower" class="text-gray-600">{blog.title}</a>
				</span>
			</div>
			<div class="flex ">
				<div class="mr-auto">
					<a href={blog.post.url} target="_blank" rel="noopener nofollower">
						<h2 class="text-xl sm:text-2xl font-semibold leading-tight transition text-gray-800 group-hover:text-gray-900">
							{blog.post.title}
						</h2>	
						<p class="mt-1 transition text-gray-500 group-hover:text-gray-600 text-base sm:text-lg sm:text-justify hidden sm:block">
							{blog.post.description}
						</p>
<!-- 						{#if blog.post.categories}
							<span class="text-sm text-gray-400 mt-1 hidden sm:line-clamp-1">
								{blog.post.categories.join(', ') }
							</span>
						{/if} -->
					</a>
					<div class="flex items-center mt-3 text-gray-400">
						<span class="font-semibold whitespace-nowrap">{date}</span>
						<div class="ml-auto">
							<SaveToPocket url={blog.post.url}/>
						</div>
					</div>
				</div>
				{#if blog.post.image}
					<a href={blog.post.url} target="_blank" rel="noopener nofollower" class="w-1/3 sm:w-1/4 flex-shrink-0 ml-2 sm:ml-6">
						<div class="aspect-w-4 aspect-h-4 overflow-hidden rounded-lg">
							<img src="{ blog.post.image || ''}" alt="{blog.post.title}" class="object-center object-cover">
						</div>			
					</a>
				{/if}
			</div>
		</div>
	</div>
</div>