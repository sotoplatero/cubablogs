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

<a href={url} target="_blank" rel="noopener nofollower" class="">
	<article class="group" >
		<div class="flex flex-col sm:flex-row justify-between items-center ">
			<div class="w-full sm:w-1/3 flex-shrink-0 mr-4">
				<div class="aspect-w-4 aspect-h-3 sm:aspect-h-4 overflow-hidden rounded-lg">
					<Image {blog} />
				</div>			
			</div>

			<div class="sm:flex-grow">
				<div class='flex items-center mb-1 mt-2 md:mt-0 text-sm text-gray-600 break-all line-clamp-1 '>
					{blog.post.author || blog.hostname}
				</div>		

				<h2 class="text-sm sm:text-base font-semibold !leading-snug transition text-gray-700 group-hover:text-gray-900 line-clamp-3">
					{blog.post.title}
				</h2>	
				<span class="text-sm sm:text-normal sm:font-medium whitespace-nowrap text-gray-600">{date}</span>

			</div>

		</div>
	</article>
</a>