import {db} from '$lib/db'
import paginate from '$lib/paginate'
import getPost from '$lib/post'
import { getHostname } from 'tldts'

export async function get({params}) {
	const {domain} = params

	const blog = (await db.all()).find(el=> getHostname(el.url)==domain)
	console.log(blog)
	let post = await getPost( blog.rss );

	return {
		body: blog
	};
}