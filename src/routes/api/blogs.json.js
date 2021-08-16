import {db} from '$lib/db'
// import paginate from '$lib/paginate'

export async function get({query}) {
	const limit = query.get('limit') || 10
	const q = query.get('q')

	let blogs = await db.all()

	blogs = blogs
		// .map(el => ({...el, post: null}))
		.sort((a,b)=>{
			return a.title.toLowerCase()>b.title.toLowerCase() ? 1 : -1
		})

	if (!!q) {
		blogs = blogs.filter( el => {
			return el.title.toLowerCase().includes(q.toLowerCase()) 
		})
	}

	return {
		body: blogs.slice(0, limit)
	};
}