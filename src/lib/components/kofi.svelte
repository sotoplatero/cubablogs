<script>
	import {mount} from 'svelte'
	import kofiwidget2 from 'https://storage.ko-fi.com/cdn/widget/Widget_2.js'
	let kofiwidget
	mount(()=>{
		kofiwidget2.init('Cómpranos un café', '#e33b3b', 'E1E05RU7A')
		kofiwidget = kofiwidget2.draw();
	})
</script>
<footer class="mt-20">
	{@html kofiwidget}
</footer>