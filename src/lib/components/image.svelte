<script>
	export let url = ''
	export let alt = ''
	export { klass as class }
	let klass = ''

	$: [domain,path] = url
		.replace(/^https?:\/\//,'')
		.replace(/\//,'|')
		.split('|')

	$: src = /\.(jpg|jpeg|png|gif|webp)$/i.test(url) 
		? `https://cdn.statically.io/img/${domain}/f=auto,w=600/${path}`
		: url

</script>

<img {src} {alt} class="{klass}">