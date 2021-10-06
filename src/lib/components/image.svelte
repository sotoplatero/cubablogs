<script>
	export let blog = {}
	export { klass as class }
	let klass = ''

	$: alt = blog.post && blog.post.title
	$: src = setSrc()

	function setSrc() {
		const url = blog.post && blog.post.image
		const urlWithoutQueryString = url && url.split('?')[0]
		const urlArr = urlWithoutQueryString && urlWithoutQueryString.replace(/^https?:\/\//,'').split('/')

		return (!!blog.post && blog.post.image) 
			? /\.(jpg|jpeg|png|gif|webp)$/i.test( blog.post.image ) 
				? `https://cdn.statically.io/img/${urlArr[0]}/f=auto,w=600/${urlArr.slice(1).join('/')}`
				: `/api/img/${blog.post.image.replace(/https?:\/\//,'')}` 
			: `https://cdn.statically.io/screenshot/${blog.hostname}`
	} 


</script>

<img src={src} {alt} class="object-center object-cover transition duration-500 group-hover:scale-105 bg-gray-100 {klass} ">