<script >
	import SaveToPocket from '$lib/components/saveToPocket.svelte'
	import Avatar from '$lib/components/avatar.svelte'
	export let blog
	export let featured = false

	let avatar = (blog.twitter ? blog.twitter.avatar : blog.logo) || blog.image
	let date = new Date(blog.post.date).toLocaleDateString('es-ES', { month:"short", day:"numeric", year: "numeric"})
</script>

<div class="group" >
	<div>

		<div class="flex ">
			<div class="mr-auto">
				<div class='flex items-center mb-1'>
					{#if avatar}
						<img 
							src="{avatar}" 
							alt="{blog.title}" 
							class="w-8 h-8 object-center object-cover rounded-full overflow-hidden shadow">
					{:else}
						<Avatar text={blog.title} class="w-8 h-8 rounded-full shadow"/>
					{/if}
					<span class="text-lg ml-2 font-semibold">
						<!-- {blog.post.author || ''} <span class="text-gray-500">en</span> --> <a href="{blog.url}" target="_blank" rel="noopener nofollower" class="text-gray-600">{blog.title}</a>
					</span>
				</div>				
				<a href={blog.post.url} target="_blank" rel="noopener nofollower">
					<h2 class="text-xl  { featured ? 'sm:text-5xl' : 'sm:text-2xl'} font-bold !leading-snug transition text-gray-800 group-hover:text-gray-900">
						{blog.post.title}
					</h2>	
					<p class="mt-3 transition text-gray-500 group-hover:text-gray-600 text-base {featured ? 'sm:text-xl' :'sm:text-lg'} sm:text-justify hidden sm:block">
						{blog.post.description}
					</p>
				</a>
				<div class="flex items-center mt-3 text-gray-400">
					<span class="font-semibold whitespace-nowrap">{date}</span>
					<div class="ml-auto">
						<SaveToPocket url={blog.post.url}/>
					</div>
				</div>
			</div>
			{#if blog.post.image}
				<a href={blog.post.url} target="_blank" rel="noopener nofollower" class="w-1/3 { featured ? 'sm:w-1/2' : 'sm:w-1/4'}  flex-shrink-0 ml-2 sm:ml-8">
					<div class="aspect-w-4 { featured ? 'aspect-h-3' : 'aspect-h-4'} overflow-hidden rounded-lg">
						<img src="{ blog.post.image || ''}" alt="{blog.post.title}" class="object-center object-cover">
					</div>			
				</a>
			{/if}
		</div>
	</div>
</div>
