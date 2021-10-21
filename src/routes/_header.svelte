<script>
	import Logo from '$lib/logo.svelte'
</script>
<div class="container print:hidden bg-white">
	<div class="flex items-center py-4 mb-6 sm:mb-12">
		<a href="/" class="mr-auto flex-shrink-0">
			<h1 class="brand flex items-center justify-center text-3xl text-gray-800 ">
				<img src="/logo.png" alt="Logo Cubablog" class=" w-8 h-8">	
				<span class="hidden sm:inline font-bold ml-1 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-[#FF2602] to-blue-500">
					CubaBlog
				</span>
				<!-- <Logo class="h-10 fill-current text-black"/> -->
			</h1>
		</a>
		<div class="flex items-center space-x-2 sm:space-x-6">
<!-- 			<a href="/posts" class="font-bold transition text-gray-600 hover:text-gray-800">
				Artículos
			</a> -->
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

	</div>
	
</div>
