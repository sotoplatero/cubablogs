
import {db} from '$lib/db'
import { getHostname } from 'tldts'
import slug from '$lib/slug'
import isToday from '$lib/isToday'

export async function get() {

	const { blogs, error } = await db.today()
	return {
		body: blogs
			.filter( el => el.post.date.isToday())
			.map( el => ({
				...el, 
				logo: el.logo || 'https://cubablog.net/avatar.svg',
				hostname: getHostname(el.url),
				post: { 
					...el.post,
					slug: slug(el.post?.url),
				}
			}))
	};
}