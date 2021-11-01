
import {db} from '$lib/db'
import { getHostname } from 'tldts'
import slug from '$lib/slug'

const TOKEN = import.meta.env.VITE_UMAMI_TOKEN

export async function get() {

	const today = new Date
	const endAt = today.valueOf()
	const startAt = today.setDate( today.getDate() - 7 );

	const url = `https://umami.dsoto.dev/api/website/9/metrics?type=url&start_at=${startAt}&end_at=${endAt}`
	const res = await fetch(url,{
		headers: { 'Cookie': `umami.auth=${TOKEN}` }
	})

	const urls = await res.json()

	return {
		headers: { 
			'Cache-Control': `s-maxage=1, stale-while-revalidate`,
		},
		body: urls
			.filter( url => /^\/post/.test(url.x) && url.y > 1 )
			.map(url=>({
				blog: url.x.split('/')[2],
				url: url.x,
				counter: url.y,
			}))
	};
}