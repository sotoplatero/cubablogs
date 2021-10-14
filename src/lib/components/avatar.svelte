<script>
	export let blog
	export { _class as class}
	let _class = "w-7 h-7"

	const colors = ["text-red-500","text-red-700", "text-green-500", "text-blue-500", "text-indigo-500", "text-indigo-700","text-purple-500","text-purple-700","text-yellow-600","text-yellow-700","text-pink-500","text-pink-700"]

	let color = colors[ Math.floor( Math.random() * colors.length ) ] 
	function fallback(evt) {
		evt.target.src = '/avatar.svg'
	}
</script>

<img 
	src={ blog.logo }
	alt="{ blog.title }" 
	on:error={()=>fallback(event)}
	class="{_class} mt-0 mb-0 object-center object-cover overflow-hidden" >
