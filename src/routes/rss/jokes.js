import supabase from '$lib/supabase'
import rss from '$lib/rss'

export async function get(request) {
	const res = await fetch(`http://${request.host}/api/joke.json`)
	const joke = await res.json()

	const domain = joke.url.split('/')[2]
	const params = {
		title: 'Chistes de Cubablog',
		path: request.path,
		items: [ {...joke} ].map( joke => ({
			title: domain,
			author: domain,
			description: joke.content,
			link: joke.url,
		}))
	}

	console.log(rss(params))
	return {
		headers: { 
			'Cache-Control': `s-maxage=1, stale-while-revalidate`,
			'Content-Type': "application/xml" 
		},
		body: rss(params)
	};
}