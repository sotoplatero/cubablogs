import { getHostname } from 'tldts'
import pagination from '$lib/pagination'
import slug from '$lib/slug'
import supabase from '$lib/supabase'

export async function get({query}) {

	const p = query.get('page') || 1
	const order = query.get('order') || 'date'
	const limit = query.get('limit') || 12
	const q = query.get('q')

	const from = (p-1) * limit
	const to = p * limit

	// console.log(await pagination(p, limit))

	let { data: blogs, error } = await supabase
		.from('blogs')
		.select('*')
		.not('post','is', null)
		.order('post->>date', { ascending: false })
		.range(from,to)

	// blogs = blogs``
	// 	.filter( el => {
	// 		let filter = true
	// 		if (!!q) {
	// 			filter = (el.title + el.description).toLowerCase().includes(q.toLowerCase()) 
	// 		}
	// 		return filter && (el.title.trim().length >= 4 )
	// 	})	
	// 	.map( el => ({
	// 		...el, 
	// 		hostname: getHostname(el.url),
	// 		post: { 
	// 			...el.post,
	// 			slug: slug(el.post?.url),
	// 		}
	// 	}))


	return {
		body: blogs.map( el => ({
				...el, 
				hostname: getHostname(el.url),
				post: { 
					...el.post,
					slug: slug(el.post?.url),
				}
			}))
	};
}