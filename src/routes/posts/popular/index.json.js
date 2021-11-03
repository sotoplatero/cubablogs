
import {db} from '$lib/db'
import { getHostname } from 'tldts'
import slug from '$lib/slug'
import og from 'open-graph-scraper'

const TOKEN = import.meta.env.VITE_UMAMI_TOKEN

export async function get() {

	try {

		const today = new Date
		const endAt = today.valueOf()
		const startAt = today.setDate( today.getDate() - 7 );

		const url = `https://umami.dsoto.dev/api/website/9/metrics?type=url&start_at=${startAt}&end_at=${endAt}`
		const res = await fetch(url, {
			headers: { 'Cookie': `umami.auth=${TOKEN}` }
		})

		const urls = (await res.json())
			.filter( ({x:url}) => url.split('/')[2] != '146' && /^\/post/.test(url) )
			.filter( (ele,index) => index < 10 )

		const posts =  await Promise.all(urls.map( async ({ x, y: counter }) => {
			const url = `https://${x.replace(/\/post\/\d+\//,'')}`
			const ogData = await og({url, onlyGetOpenGraphInfo: true}).then(({result}) => result)

			return {
				url: ogData.ogUrl,
				title: ogData.ogTitle,
				description: ogData.ogDescription,
				image: ogData.ogImage?.url || ogData.twitterImage?.url,
				blog: x.split('/')[2],
				counter
			}

		}))

		return {
			headers: { 
				'Cache-Control': `s-maxage=1, stale-while-revalidate`,
			},	
			body: posts
		};
		
	} catch(err) {
		console.log(err)
		return {
			status: 500,
			body: err
		}
	}
}