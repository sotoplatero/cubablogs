import {db} from '$lib/db'

export async function get() {
	const blogs = await db.all()

	return {
		body: blogs
	};
}