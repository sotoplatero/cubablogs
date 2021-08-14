<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				error, status
			}
		};
	}
</script>

<script>
	export let error;
	export let status;

</script>

{status}
{JSON.stringify(error)}