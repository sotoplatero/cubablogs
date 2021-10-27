<script >
	import { session } from '$app/stores';	
	import Image from '$lib/components/image.svelte'
	import Author from '$lib/components/author.svelte'	
	import Details from '$lib/components/details.svelte'	
	export let blog

	let avatar = (blog.twitter ? blog.twitter.avatar : blog.logo) 
	let date = new Date(blog.post.date).toLocaleDateString('es-ES', { month:"short", day:"numeric", year: "numeric"})
	$: url = `/post/${blog.id}/${blog.post.slug}`	
</script>

<article class="group" >
	<a href={url}  >
		<div class="flex flex-col-reverse sm:flex-row justify-between items-center sm:space-x-2">

			<div class="">
				<Author {blog} class="font-normal" />

				<h2 class="text-base sm:text-xl font-semibold !leading-snug transition group-hover:text-gray-900 line-clamp-3">
					{blog.post.title}
				</h2>	
				<Details {blog} class="font-normal" />

			</div>
			<div class="w-full sm:w-1/3 flex-shrink-0 mr-0 sm:mr-4">
				<div class="aspect-w-4 aspect-h-3 sm:aspect-h-4 overflow-hidden rounded-0 sm:rounded-lg -mx-6 sm:mx-0">
					<Image src={blog.post.image} alt={blog.post.title} />
				</div>			
			</div>

		</div>
	</a>
</article>