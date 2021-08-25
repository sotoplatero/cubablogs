<script>
	import SaveToPocket from '$lib/components/saveToPocket.svelte'
	import IntentTweet from '$lib/components/IntentTweet.svelte'
	export let post
	export let size = 6
	let _class = ''
	export {_class as class}

	let size_class = {
			4: 'w-4 h-4',
			5: 'w-5 h-5',
			6: 'w-6 h-6',
			7: 'w-7 h-7',
			8: 'w-8 h-8',
			9: 'w-9 h-9',
			10: 'w-10 h-10',
		}[size]
</script>
<div class="flex items-center space-x-2 {_class}">
	<SaveToPocket url={post.url}/>
	<IntentTweet {post} />
</div>