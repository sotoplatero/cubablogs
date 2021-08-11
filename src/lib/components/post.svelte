<script >
	export let blog
</script>
<div >
	<div class="group " >
		<div>
			<div class='flex items-center mb-2'>
				<img 
					src="{(blog.twitter ? blog.twitter.avatar + `?fallback=${blog.logo}` : null) || blog.image}" 
					alt="{blog.title}" 
					class="w-8 h-8 object-center object-cover rounded-full overflow-hidden">
				<span class="text-lg ml-2 font-semibold">
					<!-- {blog.post.author || ''} <span class="text-gray-500">en</span> --> <a href="{blog.url}" target="_blank" rel="noopener nofollower">{blog.title}</a>
				</span>
			</div>
			<div class="flex ">
				<div class="mr-auto">
					<a href={blog.post.url} target="_blank" rel="noopener nofollower">
						<h2 class="text-xl sm:text-3xl font-bold sm:font-semibold leading-tight transition">
							{blog.post.title}
						</h2>
						<p class="mt-1 transition text-gray-500 group-hover:text-gray-600 sm:line-clamp-3 text-base sm:text-lg sm:text-justify hidden">
							{blog.post.description}
						</p>
					</a>
					<div class="mt-2 text-gray-400 space-x-4">
						<span class="font-semibold">
							{ new Date(blog.post.date).toLocaleDateString('es-ES', { month:"short", day:"numeric"}) }
						</span>
						<span class="hidden sm:inline">{@html (blog.post.categories || []).join(' &bull; ') }</span>
					</div>
				</div>
				{#if blog.post.image}
					<a href={blog.post.url} target="_blank" rel="noopener nofollower" class="w-1/4 flex-shrink-0 ml-2 sm:ml-6">
						<div class="aspect-w-4 aspect-h-4 overflow-hidden rounded-lg">
							<img src="{ blog.post.image || ''}" alt="{blog.post.title}" class="object-center object-cover">
						</div>			
					</a>
				{/if}
			</div>
		</div>
	</div>
</div>