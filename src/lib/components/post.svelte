<script >
	import SaveToPocket from '$lib/components/saveToPocket.svelte'
	import IntentTweet from '$lib/components/IntentTweet.svelte'
	import Share from '$lib/components/share.svelte'
	import Avatar from '$lib/components/avatar.svelte'
	export let blog
	export let featured = false

	// let image = blog.post.image ?? `https://cdn.statically.io/screenshot/${blog.post.url.replace(/^https?:\/\//,'')}`
	let image = blog.post.image 
	let avatar = (blog.twitter ? blog.twitter.avatar : blog.logo) 
	let date = new Date(blog.post.date).toLocaleDateString('es-ES', { month:"short", day:"numeric", year: "numeric"})
</script>

<article class="group" >
	<div class="flex justify-between">
		<div class="flex-grow">
			<div class='flex items-center mb-1'>
				<span class="flex-shrink-0 rounded-full shadow overflow-hidden ">
					{#if avatar}
						<img 
							src="{avatar}" 
							alt="{blog.title}" 
							class="w-7 h-7 object-center object-cover  ">
					{:else}
						<Avatar class="w-7 h-7"/>
					{/if}
				</span>
				<span class="ml-2 font-medium sm:font-semibold">
					<a href="/blogs/{blog.id}" class="text-gray-600 line-clamp-1">
						{blog.title}
					</a>
				</span>
			</div>		
			<!-- <a href="/posts/{blog.id}">{blog.id}</a>		 -->
			<a href="/post/{blog.id}/{blog.post.slug}" >
				<h2 class="text-lg { featured ? 'sm:text-5xl' : 'sm:text-2xl'} font-bold !leading-tight transition text-gray-800 group-hover:text-gray-900">
					{blog.post.title}
				</h2>	
				<p class="mt-3 transition text-gray-500 group-hover:text-gray-600 text-base {featured ? 'sm:text-xl' :'sm:text-lg'} sm:text-justify hidden sm:block">
					{blog.post.description}
				</p>
			</a>
			<div class="flex items-center justify-between mt-3 text-gray-400">
				<span class="font-medium sm:font-semibold whitespace-nowrap">{date}</span>
				<Share post={blog.post} class=""/>
			</div>
		</div>
		{#if image}
			<a href={blog.post.url} target="_blank" rel="noopener nofollower" class="w-1/3 { featured ? 'sm:w-1/2' : 'sm:w-1/4'}  flex-shrink-0 ml-2 sm:ml-16">
				<div class="aspect-w-4 { featured ? 'aspect-h-3' : 'aspect-h-4'} overflow-hidden rounded-lg">
					<img src="{ image }" alt="{blog.post.title}" class="object-center object-cover">
				</div>			
			</a>
		{/if}
	</div>
</article>
