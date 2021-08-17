<script>
	import { browser } from '$app/env';	
	let kofiwidget

    if (browser) {
		kofiwidget2.init('Cómpranos un café', '#e33b3b', 'E1E05RU7A')
		kofiwidget = kofiwidget2.draw();
    }    

</script>

{#if kofiwidget}
	<!-- {@html kofiwidget2.draw()} -->
{/if}
