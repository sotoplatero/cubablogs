<script>
    import { dev } from '$app/env';	

	export let title = 'CubaBlog » Últimas Noticias de Cuba por sus Blogueros'
	export let description = 'Descubre que sucede en cuba contado por su blogueros'
	export let url = 'https://cubablog.net'
	export let author = ''
	export let isPost = 0
	export let avatar = ''
	export let image = ''

	$: src = image || `https://og.beyondco.de/${title}.png?theme=dark&md=0&showLogo=0&body=${description}&fontSize=150px&isPost=${isPost}&author=${author}&authorAvatar=${avatar}`
</script>

<svelte:head>
	<meta property="og:title" content="{title}">
	<meta property="og:description" content="{description}">
	<meta property="og:image" content="{src}">

	<meta name="twitter:title" content="{title}">
	<meta name="twitter:description" content="{description}">
	<meta name="twitter:image" content="{src}">
	<meta property="og:url" content="{url}">

	<link rel="canonical" href="{url}" />
	<link href="https://fonts.googleapis.com/css2?family=Lora&display=swap" rel="stylesheet"> 		
	{#if !dev }
		<script async defer data-website-id="5ff24f90-78df-49be-8d3f-54e5fb8d00bf" src="https://umami.dsoto.dev/umami.js"></script>		
	{/if}
</svelte:head>