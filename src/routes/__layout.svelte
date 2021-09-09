<script>
    import { navigating } from '$app/stores'
    import Navigator from '$lib/components/navigator.svelte'
	import "../app.postcss";
	import Header from './_header.svelte'
	import Footer from './_footer.svelte'
	import Spinner from '$lib/components/spinner.svelte'
</script>



{#if $navigating }
    <Navigator/>
{/if}
<Header/>
<div class="container">
	<slot></slot>
</div>
<Footer/>
