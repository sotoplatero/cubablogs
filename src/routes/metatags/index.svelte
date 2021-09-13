<!-- <script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		const url = `/metatags.json?url=cubablog.net`;
		const res = await fetch(url);
		const metatags = await res.json()

		if (res.ok) {
			return {
				props: { metatags }
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script> -->
<script>
	import Avatar from '$lib/components/avatar.svelte'
	import Rule from './_rule.svelte'
	import { toClipboard } from 'copee';	
	import { onMount } from 'svelte'
	import FormInput from './_input.svelte'

	// export let metatags = {}
	let metatags = {}
	let url = ''
	let disabled = false
	$: ({ 
			title = '',
			description = '',
			creator = '',
			og_image = '',
			og_description = '',
			og_locale = '',
			twitter_image = '',
			apple_touch_icon = '',
			icon32x32 = '',
			icon16x16 = '',
			icon180x180 = '',
		} = metatags)

	async function getMetatag() {
		disabled = 1
		const res = await fetch(`/metatags.json?url=${url}`)
		disabled = 0
		if (!res.ok) return
		metatags = await res.json()
	}

	async function save(argument) {
		// body...
	}

</script>

<div class="w-1/2 mx-auto">
	<h2 class="text-3xl mb-8 font-semibold">
		Validador <i>meta tag</i>
	</h2>
	<form on:submit|preventDefault={getMetatag}>
		<FormInput bind:value={url} label="URL" />
	</form>
	<!-- https://ahrefs.com/blog/open-graph-meta-tags/ -->
	{#if JSON.stringify(metatags) !== '{}'}
		<div class="space-y-4 text">
			<Rule 
				condition={!!title} 
				title="Titulo" 
			/>
			<Rule 
				condition={ title.length > 4 && title.length <= 60 } 
				title="Logintud del título entre 4 y 60 caracteres"
			/>
			<Rule 
				condition={ title.split(' ').every( word => /[A-Z]/.test(word[0]))} 
				title="Uso de mayúsculas en la primera letra de cada palabra del título"
			/>
			<Rule 
				condition={ !!description } 
				title="Descripción"
			/>
			<Rule 
				condition={ description === og_description } 
				title="Descripción igual al Open Graph "
			/>
			<Rule 
				condition={ !!og_image } 
				title="Imagen Open Graph"
			/>
			<Rule 
				condition={ !!twitter_image } 
				title="Twitter Image"
			/>
			<Rule 
				condition={ !!apple_touch_icon } 
				title="Apple Icon"
			/>
			<Rule 
				condition={ !!icon32x32 } 
				title="Icon 32x32"
			/>
			<Rule 
				condition={ !!icon180x180 } 
				title="Icon 180x180"
			/>
		</div>
		
	{/if}
	
</div>


<!--  -->
<!-- <div class="grid grid-cols-3 gap-6"> -->
<!-- 	<div class="space-y-3"> -->
<!-- 		 -->
<!-- 		<FormInput bind:value={url} label="URL" on:input={getMetatag}/> -->
<!-- 		<FormInput bind:value={title} label="Título" {disabled}/> -->
<!-- 		<FormInput bind:value={description} label="Descripción" rows="{5}" {disabled}/> -->
<!-- 		<FormInput bind:value={image} label="Image" {disabled}/> -->
<!-- 		<FormInput bind:value={creator} label="Autor" {disabled}/> -->
		<!-- <FormInput bind:value={font} label="Google Font" {disabled}/> -->
<!-- 		<button on:click={save} class="flex items-center font-semibold py-3 px-6 border"> -->
<!-- 			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> -->
<!-- 			  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /> -->
<!-- 			</svg>			 -->
<!-- 			Copiar HTML -->
<!-- 		</button> -->
<!-- 	</div> -->
<!-- 	<div class="col-span-2"> -->
<!-- <pre class="overflow-auto p-5 text-blue-500 border"><code class="language-html"> -->
<!-- &lt;!-- Primary Meta Tags --> 
<!-- &lt;title>{title}&lt;/title> -->
<!-- &lt;meta name="title" content="{title}"> -->
<!--  -->
<!-- <span class="{ !description ? 'text-red-500' : '' }" > -->
<!-- &lt;meta name="description" content="{description}"> -->
<!-- </span> -->
<!--  -->
<!-- &lt;!-- Open Graph / Facebook -->
<!-- <span class="{ !og_image ? 'text-red-500' : '' }" > -->
<!-- &lt;meta property="og:type" content="website"> -->
<!-- &lt;meta property="og:url" content="{url}"> -->
<!-- &lt;meta property="og:title" content="{title}"> -->
<!-- &lt;meta property="og:description" content="{description}"> -->
<!-- &lt;meta property="og:image" content="{image}"> -->
<!-- </span> -->
<!--  -->
<!-- <span class="{ !twitter_image ? 'text-red-500' : '' }" > -->
<!-- &lt;!-- Twitter -->
<!-- &lt;meta property="twitter:card" content="summary_large_image"> -->
<!-- &lt;meta property="twitter:url" content="{url}"> -->
<!-- &lt;meta property="twitter:title" content="{title}"> -->
<!-- &lt;meta property="twitter:description" content="{description}"> -->
<!-- &lt;meta property="twitter:image" content="{image}"> -->
<!-- </span> -->
<!-- <span class="{ !creator ? 'text-red-500' : '' }" > -->
<!-- 	&lt;meta name="twitter:creator" content="{creator}"> -->
<!-- </span> -->
<!--  -->
<!-- &lt;!-- Favicon --> 
<!-- <span class="{ !apple_touch_icon ? 'text-red-500' : '' }"> -->
<!-- &lt;link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"> -->
<!-- </span> -->
<!-- <span class="{ !icon32x32 ? 'text-red-500' : '' }"> -->
<!-- &lt;link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"> -->
<!-- </span> -->
<!-- <span class="{ !icon16x16 ? 'text-red-500' : '' }"> -->
<!-- &lt;link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"> -->
<!-- </span> -->
<!-- &lt;link rel="manifest" href="/site.webmanifest"> -->
<!-- &lt;link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"> -->
<!-- &lt;meta name="msapplication-TileColor" content="#da532c"> -->
<!-- &lt;meta name="theme-color" content="#ffffff"> -->
<!--  -->
<!-- &lt;!-- RSS --> 
<!-- &lt;link rel="alternate" type="application/rss+xml" href="/feed.xml" title="{title}" /> -->
<!-- &lt;link rel="alternate" type="application/rss+json" href="/feed.json" title="{title}" /> -->
<!--  -->
<!-- {#if font} -->
<!-- &lt;!-- Google Font --> 
<!-- &lt;link rel="preconnect" href="https://fonts.googleapis.com"> -->
<!-- &lt;link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> -->
<!-- &lt;link href="https://fonts.googleapis.com/css2?family={font}:wght@100&display=swap" rel="stylesheet">  -->
<!-- {/if} -->
<!-- </code></pre> -->
<!-- 		 -->
<!-- 	</div> -->
<!-- </div> -->
