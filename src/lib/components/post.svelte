<script >
	import { session } from '$app/stores';	
	import Image from '$lib/components/image.svelte'
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
	<div class="flex justify-between items-center">
		<div class="flex-grow">
			<div class='flex items-center mb-1'>
				<span class="flex-shrink-0 rounded-full shadow overflow-hidden ">
					<Avatar {blog} class="w-7 h-7"/>
				</span>
				<span class="ml-2 font-medium">
					<a href="/blogs/{blog.id}/{blog.url.replace(/https?:\/\//,'')}" class="text-gray-600 line-clamp-1" >
						{blog.title}
					</a>
				</span>
			</div>		
			<!-- <a href="/posts/{blog.id}">{blog.id}</a>		 -->
				<h2 class="text-lg { featured ? 'sm:text-4xl' : 'sm:text-2xl'} font-bold !leading-tight transition text-gray-800 group-hover:text-gray-900">
					<a href="/post/{blog.id}/{blog.post.slug}" >
							{blog.post.title}
					</a>
				</h2>	
				{#if blog.post.description}
					<p class="mt-3 transition text-gray-500 group-hover:text-gray-600 text-base {featured ? 'sm:text-xl' :'sm:text-lg'} sm:text-justify hidden sm:line-clamp-5">
						{blog.post.description.split('.').filter((el,idx)=>idx<3).join('.') + '.'}
					</p>
				{/if}
			<div class="flex items-center justify-between mt-3 text-gray-400">
				<span class="font-medium whitespace-nowrap">{date}</span>
				<Share post={blog.post} class=""/>
			</div>
		</div>
		<a href={blog.post.url} target="_blank" rel="noopener nofollower" class="w-1/3 { featured ? 'sm:w-1/2' : 'sm:w-2/6'}  flex-shrink-0 ml-2 sm:ml-6">

			<div class="aspect-w-4 { featured ? 'aspect-h-3' : 'aspect-h-4'} overflow-hidden rounded">
			{#if blog.post.image}
				<Image 
					url={blog.post.image} 
					alt={blog.post.title} 
					class="object-center object-cover"/>
				<!-- <img src="{ image }" alt="{blog.post.title}" class="object-center object-cover"> -->
			{/if}
			</div>			

		</a>
	</div>
</article>
