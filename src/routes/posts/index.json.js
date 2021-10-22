
import {db} from '$lib/db'
import { getHostname } from 'tldts'
import slug from '$lib/slug'

export async function get() {

	const { blogs, error } = await db.home({ limit: 25 })

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