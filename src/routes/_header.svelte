<script>
	import Logo from '$lib/logo.svelte'
</script>
<div class="container print:hidden bg-white">
	<div class="flex items-center py-4 mb-6 sm:mb-12">
		<a href="/" class="mr-auto flex-shrink-0">
			<h1 class="brand flex items-center justify-center text-3xl text-gray-800 ">
				<img src="/logo.png" alt="Logo Cubablog" class=" w-8 h-8">	
				<span class="hidden sm:inline font-extrabold ml-1 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-[#FF2602] to-blue-500">
					CubaBlog
				</span>
				<!-- <Logo class="h-10 fill-current text-black"/> -->
			</h1>
		</a>
		<div class="flex items-center space-x-2 sm:space-x-6">
			<a href="/posts" class="font-bold transition text-gray-600 hover:text-gray-800">
				Artículos
			</a>
			<a href="/blogs" class="font-bold transition text-gray-600 hover:text-gray-800">
				Blogs
			</a>
			<a href="/add" class="flex items-center py-2 px-2 sm:px-6 bg-red-500 text-white font-semibold whitespace-nowrap rounded-xl" >
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
				</svg>				
				<span class="ml-1 hidden sm:inline "> Blog</span>
			</a>		
		</div>
		<!-- <p class="text-xl text-gray-500">Blogs sobre Cuba y por Cubanos</p> -->
	<!-- 	<a href="" class="flex items-center py-3 px-4 bg-red-500 text-white font-bold whitespace-nowrap border-2 border-red-500">
			<svg class="w-6 h-6 fill-current" stroke="currentColor" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Telegram</title><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>		
			Siguenos en Telegram
		</a> -->
	</div>
	
</div>

<style>

</style>