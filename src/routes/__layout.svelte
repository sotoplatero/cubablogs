<script>
    import { navigating } from '$app/stores'
    import Navigator from '$lib/components/navigator.svelte'
	import "../app.postcss";
	import Header from './_header.svelte'
	import Footer from './_footer.svelte'
</script>



{#if $navigating }
    <Navigator/>
{/if}
<div class="antialiased">
	<Header/>
	<div class="container">
		<slot></slot>
	</div>
	<Footer/>
</div>
