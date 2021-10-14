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
				? `https://cdn.statically.io/img/${hostname}/f=auto,w=600${path}`
				: blog.post.image
	}

	function setSrc() {
		const url = blog.post && blog.post.image
		const urlWithoutQueryString = url && url.split('?')[0]
		const urlArr = urlWithoutQueryString && urlWithoutQueryString.replace(/^https?:\/\//,'').split('/')

		return (!!blog.post && blog.post.image) 
			? /\.(jpg|jpeg|png|gif|webp)$/i.test( blog.post.image ) 
				? `https://cdn.statically.io/img/${urlArr[0]}/f=auto,w=600/${urlArr.slice(1).join('/')}`
				: blog.post.image
			: `https://cdn.statically.io/screenshot/${blog.hostname}`
	} 

	// $: src = /\.(jpg|jpeg|png|gif|webp)$/i.test(url) 
	// 	? `https://cdn.statically.io/img/${urlArr[0]}/f=auto,w=500/${urlArr.slice(1).join('/')}`
	// 	: url

</script>

<img src={src} {alt} class="object-center object-cover transition duration-500 group-hover:scale-105 bg-gray-100 shadow {klass} ">