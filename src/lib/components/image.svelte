<script>
	export let url = ''
	export let alt = ''
	export { klass as class }
	let klass = ''

	$: [domain,path] = url
		.replace(/^https?:\/\//,'')
		.replace(/\//,'|')
		.split('|')
		
	$: src = `https://cdn.statically.io/img/${domain}/f=auto,w=600/${path}`

</script>

<img {src} {alt} class="{klass}">