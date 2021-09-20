<script>
	export let url = ''
	export let alt = ''
	export { klass as class }
	let klass = ''

	$: urlCleared = url.split('?')[0]
	$: urlArr = urlCleared 
		.replace(/^https?:\/\//,'')
		.split('/')

	$: src = /\.(jpg|jpeg|png|gif|webp)$/i.test(urlCleared) 
		? `https://cdn.statically.io/img/${urlArr[0]}/f=auto,w=600/${urlArr.slice(1).join('/')}`
		: url

</script>

<img {src} {alt} class="{klass}">