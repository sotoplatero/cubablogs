import {db} from '$lib/db'
import paginate from '$lib/paginate'

export async function get({query}) {
	const p = query.get('page') || 1
	const q = query.get('q')

	let blogs = await db.all()

	blogs = blogs
		.filter( el => el.title.trim().length >= 4 )	
		.map(el => ({...el, post: null}))
		.sort((a,b)=>{
			return a.title.toLowerCase()>b.title.toLowerCase() ? 1 : -1
		})

	if (!!q) {
		blogs = blogs
			.filter( el => {
				return (el.title + el.description).toLowerCase().includes(q.toLowerCase()) 
			})
	}

	return {
		body: paginate( blogs, p, 12 )
	};
}