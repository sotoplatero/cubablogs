<script>
	export let blog = {}
	export let width = 600
	export { klass as class }
	let klass = ''
	let src
	const gray = 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='

	const alt = blog.post && blog.post.title
	$: src = (blog.post && blog.post.image) 
		? `/img/600/450/${blog.post.image.replace(/https?:\/\//,'')}`
		: gray

</script>

<img 
	src={src} 
	{alt} 
	class="object-center object-cover transition duration-500 group-hover:scale-105 bg-gray-100 shadow {klass} !m-0"
>