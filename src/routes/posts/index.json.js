import {db} from '$lib/db'
import paginate from '$lib/paginate'

export async function get({query}) {
	const page = query.get('page') || 1

	let blogs = await db.all()
	blogs = blogs
		.filter( (el,index) => !!el.post && !!el.post.title )
		.sort( (a,b) => (new Date(b.post.date)) - (new Date(a.post.date)) )

	blogs = paginate(blogs,page)

	return {
		body: blogs
	};
}