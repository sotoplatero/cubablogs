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

<article class="group" >
	<a href={url} target="_blank" rel="noopener nofollower" >
		<div class="flex flex-col-reverse sm:flex-row justify-between items-center ">

			<div class="text-gray-500">
				<div class='mb-1 mt-2 md:mt-0 line-clamp-1 break-all font-sm'>
					{blog.title}
				</div>		

				<h2 class="text-normal sm:text-lg font-semibold !leading-snug transition text-gray-700 group-hover:text-gray-900">
					{blog.post.title}
				</h2>	
				<span class="text-sm sm:text-normal sm:font-medium whitespace-nowrap text-gray-500">{date}</span>

			</div>
			<div class="w-full sm:w-1/3 flex-shrink-0 mr-0 sm:mr-4">
				<div class="aspect-w-4 aspect-h-3 sm:aspect-h-4 overflow-hidden rounded-0 sm:rounded-lg -mx-6 sm:mx-0">
					<Image {blog} />
				</div>			
			</div>

		</div>
	</a>
</article>