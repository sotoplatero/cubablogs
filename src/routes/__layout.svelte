<script>
	import Header from './_header.svelte'
	import Footer from './_footer.svelte'
	import "../app.postcss";
</script>
<div class="w-full sm:w-11/12 md:w-10/12 mx-auto px-2">
	<Header/>
	<slot></slot>
	<Footer/>
</div>