<script>
	export let blog
	export { _class as class}
	let _class = "w-7 h-7"

	const handleError = (evt) => evt.target.src = '/avatar.svg'
</script>

<img 
	src={ blog.logo }
	alt="{ blog.title }" 
	on:error={handleError}
	class="{_class} mt-0 mb-0 object-center object-cover overflow-hidden" >
