<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				error: status
			}
		};
	}
</script>

<script>
	export let error;

</script>

{error}