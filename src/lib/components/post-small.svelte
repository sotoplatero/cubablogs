<script >
	import { session } from '$app/stores';	
	import Image from '$lib/components/image.svelte'
	import Author from '$lib/components/author.svelte'
	import Details from '$lib/components/details.svelte'	
	export let blog

	// let image = blog.post.image ?? `https://cdn.statically.io/screenshot/${blog.post.url.replace(/^https?:\/\//,'')}`
	let image = blog.post.image 
	let avatar = (blog.twitter ? blog.twitter.avatar : blog.logo) 
	let date = new Date(blog.post.date).toLocaleDateString('es-ES', { month:"short", day:"numeric", year: "numeric"})
	$: url = `/post/${blog.id}/${blog.post.slug}`	
</script>

<a href={url} class="">
	<article class="group" >
		<div class="flex flex-col sm:flex-row justify-between items-center ">
			<div class="w-full sm:w-1/3 flex-shrink-0 mr-4">
				<div class="aspect-w-4 aspect-h-3 sm:aspect-h-4 overflow-hidden rounded-lg">
					<Image src={blog.post.image} alt={blog.post.title} />
				</div>			
			</div>

			<div class="sm:flex-grow text-sm sm:text-base">
				<Author {blog} size="6" class=""/>

				<h2 class=" font-semibold !leading-snug transition text-gray-700 group-hover:text-gray-900 line-clamp-3">
					{blog.post.title}
				</h2>	
				<Details {blog}/>

			</div>

		</div>
	</article>
</a>