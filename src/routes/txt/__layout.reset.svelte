<script>
	import Header from '../_header.svelte'
	import Footer from '../_footer.svelte'
</script>
<div class="">
	<Header/>
	<div class="container">
		<slot></slot>
	</div>
	<Footer/>
</div>