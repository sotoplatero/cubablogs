<script>
	import TwitterIcon from '$lib/icons/TwitterIcon.svelte'
	export let post
	$: text = encodeURIComponent(post.title)
	$: url = `https://twitter.com/intent/tweet?text=${text}&url=${post.url}&via=cubablognet`
</script>

<a href="{url}" target="_blank" rel="noopener nofollower">
	<TwitterIcon class="w-6 h-6 hover:grayscale-0"/>
</a>
