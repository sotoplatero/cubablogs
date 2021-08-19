import {db} from '$lib/db'
import paginate from '$lib/paginate'
import slug from '$lib/slug'
import { getHostname } from 'tldts'

export async function get({query}) {

	const p = query.get('page') || 1
	const order = query.get('order') || 'date'
	const limit = query.get('limit') || 12
	const q = query.get('q')

	let blogs = await db.all()
	blogs = blogs
		.filter( el => {
			let filter = true
			if (!!q) {
				filter = (el.title + el.description).toLowerCase().includes(q.toLowerCase()) 
			}
			return filter && (el.title.trim().length >= 4 )
		})	
		.map( el => ({
			...el, 
			hostname: getHostname(el.url),
			post: { 
				...el.post,
				slug: slug(el.post?.url),
			}
		}))
		.sort( (a,b) => {
			return ( order === 'title' )
				? a.title.toLowerCase()>b.title.toLowerCase() ? 1 : -1
				: (new Date(b.post.date)) - (new Date(a.post.date)) 
		})

	return {
		body: paginate( blogs, p, limit )
	};
}