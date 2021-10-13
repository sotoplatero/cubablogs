<script >
	import { session } from '$app/stores';	
	import Image from '$lib/components/image.svelte'
	import SaveToPocket from '$lib/components/saveToPocket.svelte'
	import IntentTweet from '$lib/components/IntentTweet.svelte'
	import Share from '$lib/components/share.svelte'
	import Avatar from '$lib/components/avatar.svelte'
	export let blog

	// let image = blog.post.image ?? `https://cdn.statically.io/screenshot/${blog.post.url.replace(/^https?:\/\//,'')}`
	let image = blog.post.image 
	let avatar = (blog.twitter ? blog.twitter.avatar : blog.logo) 
	let date = new Date(blog.post.date).toLocaleDateString('es-ES', { month:"short", day:"numeric", year: "numeric"})
	$: url = `/post/${blog.id}/${blog.post.slug}`
</script>

<a href="{url}" >
<article class="group" >
	<div class="flex-shrink-0 block">

		<div class="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
			<Image {blog} class="object-center object-cover"/>
		</div>			

	</div>

	<div class="flex justify-between items-center mt-4">
		<div class="flex-grow">
			<div class='flex items-center mb-1'>
				<span class="flex-shrink-0 rounded-full shadow overflow-hidden ">
					<Avatar {blog} class="w-7 h-7"/>
				</span>
				<span class="ml-2 font-medium text-gray-600 line-clamp-1 break-all">
					{blog.hostname.replace(/^www\./,'')}
				</span>
			</div>		
			<!-- <a href="/posts/{blog.id}">{blog.id}</a>		 -->
			<h2 class="text-lg sm:text-lg font-semibold leading-normal transition text-gray-700 group-hover:text-gray-900">
				{blog.post.title}
			</h2>	
			<div class="flex items-center justify-between mt-1 text-gray-400">
				<span class="font-medium whitespace-nowrap">{date}</span>
			</div>
		</div>

	</div>
</article>
</a>
