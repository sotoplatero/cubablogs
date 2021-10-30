<script >
	import { session } from '$app/stores';	
	import Image from '$lib/components/image.svelte'
	import Author from '$lib/components/author.svelte'
	import Details from '$lib/components/details.svelte'
	export let blog

	let avatar = (blog.twitter ? blog.twitter.avatar : blog.logo) 
	$: url = `/post/${blog.id}/${blog.post.slug}`

</script>

<a href="{url}"  class="text-gray-700 visited:!text-gray-400">
<article class="group" >
	<div class="flex-shrink-0 block">

		<div class="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
			<Image src={blog.post.image} alt={blog.post.title} />
		</div>			

	</div>

	<div class="mt-3">
		<div class="space-y-2">
			<h2 class="text-lg sm:text-lg font-semibold leading-normal transition ">
				{blog.post.title}
			</h2>	
			<Author {blog}/>
		</div>

	</div>
</article>
</a>
