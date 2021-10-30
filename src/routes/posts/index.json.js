
import {db} from '$lib/db'
import { getHostname } from 'tldts'
import slug from '$lib/slug'

export async function get({query}) {

	const from = query.get('from') || 0
	const to = query.get('to') || 15
	const { blogs, error } = await db.home({ from, to })

	return {
		headers: { 
			'Cache-Control': `s-maxage=1, stale-while-revalidate`,
		},
		body: blogs.map( el => ({
			...el, 
			logo: el.logo || 'https://cubablog.net/avatar.svg',
			post: { 
				...el.post,
				slug: slug(el.post?.url),
			}
		}))
	};
}