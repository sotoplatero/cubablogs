import {db} from '$lib/db'

export async function post() {

	const {data: blogs} = await db.all()

	blogs.map( async blog => {
		await fetch(`http://localhost:3000/blogs/add`,{
			method: 'post',
			body: JSON.stringify({ url: blog.url })
		})


	})


	return {
		body: 'ok'
	};
}

