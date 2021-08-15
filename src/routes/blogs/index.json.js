import {db} from '$lib/db'

export async function get() {
	const blogs = await db.all()

	return {
		body: blogs.sort( (a,b) => (new Date(b.post.date)) - (new Date(a.post.date)) )
	};
}