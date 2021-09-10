<script>
    import { dev } from '$app/env';	
	export let title = 'CubaBlog » Últimas Noticias de Cuba por sus Blogueros'
	export let description = 'Descubre que sucede en cuba contado por su blogueros'
	export let author = ''
	export let isPost = 0
	export let avatar = ''

	$: image = `https://og.beyondco.de/${title}.png?theme=dark&md=0&showLogo=0&body=${description}&fontSize=150px&isPost=${isPost}&author=${author}&authorAvatar=${avatar}`
</script>

<svelte:head>
	<meta property="og:title" content="{title}">
	<meta property="og:description" content="{description}">
	<meta property="og:image" content="{image}">

	<meta property="twitter:title" content="{title}">
	<meta property="twitter:description" content="{description}">
	<meta property="twitter:image" content="{image}">


	<link href="https://fonts.googleapis.com/css2?family=Lora&display=swap" rel="stylesheet"> 		
	{#if !dev }
		<script async defer data-website-id="5ff24f90-78df-49be-8d3f-54e5fb8d00bf" src="https://umami.dsoto.dev/umami.js"></script>		
	{/if}
</svelte:head>