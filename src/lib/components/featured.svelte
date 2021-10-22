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

<a href="{url}" >
<article class="" >
	<div class="relative overflow-hidden rounded-lg ">

		<div class="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 -mx-6 sm:mx-0">
			<Image src={blog.post.image} alt={blog.post.title} />
		</div>			

		<div class="relative sm:absolute w-full bottom-0 p-6 text-gray-800 bg-gray-700 bg-opacity-50 drop-shadow-lg">
			<div class="space-y-2">
				<Author {blog} class="text-gray-200"/>	
				<!-- <a href="/posts/{blog.id}">{blog.id}</a>		 -->
				<h2 class="text-xl sm:text-3xl font-semibold leading-normal transition text-white group-hover:text-gray-900 ">
					{blog.post.title}
				</h2>	
				<Details {blog} class="text-gray-200"/>	
			</div>

		</div>
	</div>

</article>
</a>
