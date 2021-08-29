<script>
	let url
	let search = ''
	let error = ''
	let msg = ''
	let blog = {}
	let adding = false	

	const URLre =  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,8}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/

	function handleSubmit() {
		error = ''
		msg = ''
    if ( !url ) {
      error = "Escriba la URL del blog";
      return
    }
    if ( !URLre.test(url) ) {
      error = "La URL no es una dirección válida";
      return
    }
		addBlog()
	}

	async function addBlog(){

		adding = true
		const res = await fetch(`/blogs/add`,{
			method: 'post',
			body: JSON.stringify({url})
		})
		adding = false

		if (!res.ok) {
			error = (res.status === 400) 
				? 'La web no parece ser un blog'
				: "Ha ocurrido un error, intentelo más tarde";
			return
		}

		blog = await res.json() 
		msg = `El blog <b>${blog.title}</b> se ha agregado correctamente`
		url = ''

	}

</script>
<div class="sm:w-1/2 mx-auto text-center py-10 sm:py-24 mb-8">
	<h2 class="text-3xl font-semibold">Agregar Blog</h2>
	<p class="text-xl text-gray-500">
		Incluye tu blog, el de un amigo o los blogs que te gustan. Cualquiera puede agregar cualquier blog.
	</p>
	<form on:submit|preventDefault={handleSubmit} class="w-full mt-8 space-y-2 text-left">
		<label for="url" class="text-sm font-bold">URL del Blog</label>
		<input 
			type="text" 
			name="url" 
			bind:value={url} 
			class="border-2 border-gray-300 p-3 w-full focus:outline-none focus:border-red-500" 
			placeholder="Ej: https://dsoto.dev" 
			disabled={adding} >
		<div class="flex space-x-4">

			<button class="flex items-center py-3 px-6 transition bg-red-500 hover:bg-red-700 text-white font-bold whitespace-nowrap" disabled={adding}>
				<svg xmlns="http://www.w3.org/2000/svg" class="{ adding ? 'animate-spin' : ''} h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
				  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
				</svg>				
				<span class="ml-1">Agregar</span>
			</button>

			<a href="/blogs" class="py-3 px-6 text-gray-600 bg-gray-100 font-bold whitespace-nowrap transition hover:bg-gray-200">
				Regresar
			</a>

		</div>
	   {#if error}
			<div class="text-yellow-600">
				{error}
			</div>
	    {/if}		
	   {#if msg}
			<div class="text-green-600">
				{@html msg}
			</div>
	    {/if}		

	</form>
</div>