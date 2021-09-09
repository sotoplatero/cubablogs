<script context="module">
	export async function load({ page, fetch }) {
		const {url} = page.params

		const res = await fetch(`/post.json?url=${url}`)	

		if ( !res.ok ) {
			return {
				status: res.status,
				error: new Error(`Could not load ${url}`)
			};
		}
		const post = await res.json()
		return {
			props: {
				post,
			}
		};

	}
</script>
<script>
	import { convert } from 'html-to-text';	
	import Meta from '$lib/components/meta.svelte'	
	export let post
	let body = convert(post.body,{preserveNewlines: true})
</script>

<Meta
	title={post.title}
	description=""
	isPost={1}
	author={post.blog.title}
	avatar={post.blog.logo}
/>

<a href="/txt">&larr; Regresar</a>
{'\n\n'}
{post.title}
{'\n\n'}
{post.blog.title}
{'\n'}
{new Date(post.pubDate).toLocaleDateString(
	'es-ES', 
	{ 
		month:"short", 
		day:"numeric", 
		year: "numeric"
	})
}
{'\n\n\n'}
{ body }
{'\n\n\n'}

<a href="{post.link}" class="" target="_blank" rel="noopener nofollower">
	Leer el Original			
</a>
	
