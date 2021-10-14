<script >
	import { session } from '$app/stores';	
	import Image from '$lib/components/image.svelte'
	import Author from '$lib/components/author.svelte'
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

		<div class="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg bg-gray-100 -mx-6 sm:mx-0">
			<Image {blog} class="object-center object-cover "/>
		</div>			

	</div>

	<div class="flex justify-between items-center mt-4">
		<div class="flex-grow">
			<Author {blog}/>	
			<!-- <a href="/posts/{blog.id}">{blog.id}</a>		 -->
			<h2 class="text-xl sm:text-3xl font-semibold leading-normal transition text-gray-700 group-hover:text-gray-900">
				{blog.post.title}
			</h2>	
			<div class="flex items-center justify-between mt-1 text-gray-400">
			</div>
		</div>

	</div>
</article>
</a>
