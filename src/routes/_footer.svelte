<script>
	import Kofi from '$lib/components/kofi.svelte'
	import TelegramCannelIcon from '$lib/icons/TelegramChannel.svelte'
	import TwitterIcon from '$lib/icons/TwitterIcon.svelte'
</script>
<footer class="py-12 mt-16 bg-gray-100 print:hidden">
	<div class="container">
		<div class="flex items-center justify-center space-x-4 mb-8">
			<a href="https://t.me/cubablog">
				<TelegramCannelIcon/>
			</a>	
			<a href="https://twitter.com/cubablognet">
				<TwitterIcon/>
			</a>	
		</div>
		<div class="w-3/4 mx-auto text-center">
			<p class="mb-4 w-full sm:w-1/2 mx-auto text-gray-700">Si ❤️ <b>Cubablog</b> apoyanos y compranos café para estar despiertos y seguir mejorandolo 🚀</p>
			<Kofi label="Compranos Café" />
		</div>
		
	</div>
</footer>