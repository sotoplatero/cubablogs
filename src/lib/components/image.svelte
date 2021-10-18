<script>
	export let blog = {}
	export let width = 600
	export { klass as class }
	let klass = ''
	let hostname
	let path
	let src

	$: alt = blog.post && blog.post.title
	// $: src = setSrc()

	$: if (blog.post && blog.post.image) {
		const url = new URL(blog.post.image)
		hostname = url.hostname
		path = url.pathname + url.search

		src = /\.(jpg|jpeg|png|gif|webp)$/i.test( url.pathname ) 
				? `/img/600/450/${blog.post.image.replace(/https?:\/\//,'')}`
				: blog.post.image
	}

</script>

<img 
	src={src} 
	{alt} 
	class="object-center object-cover transition duration-500 group-hover:scale-105 bg-gray-100 shadow {klass}"
>