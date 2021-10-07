import { getHostname } from 'tldts'
import pagination from '$lib/pagination'
import slug from '$lib/slug'
import supabase from '$lib/supabase'

export async function get({query}) {

	const p = query.get('page') || 1
	const order = query.get('order') || 'date'
	let limit = query.get('limit') || 16
	const q = query.get('q')

	const from = (p-1) * limit
	const to = p * limit -1
	let blogs = []
	let error = null

	// console.log(await pagination(p, limit))
	if (!!q) {
		({ data: blogs, error } = await supabase
			.from('blogs')
			.select('*')
			.textSearch('title', `'${q}'`)
			.order('post->>date', { ascending: false })
			.range(from,to))

	} else {
		({ data: blogs, error } = await supabase
			.from('blogs')
			.select('*')
			.not('post','is', null)
			.order('post->>date', { ascending: false })
			.range(from,to))
	}

	return {
		body: blogs.map( el => ({
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