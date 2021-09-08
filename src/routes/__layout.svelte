<script>
    import { navigating } from '$app/stores'
    import { dev } from '$app/env';
    import Navigator from '$lib/components/navigator.svelte'
	import "../app.postcss";
	import Header from './_header.svelte'
	import Footer from './_footer.svelte'
	import Spinner from '$lib/components/spinner.svelte'
</script>


<svelte:head>
	{#if !dev }
		<script async defer data-website-id="5ff24f90-78df-49be-8d3f-54e5fb8d00bf" src="https://umami.dsoto.dev/umami.js"></script>		
	{/if}
</svelte:head>

{#if $navigating }
    <Navigator/>
{/if}
<Header/>
<div class="container">
	<slot></slot>
</div>
<Footer/>
