import {db} from '$lib/db'

export async function post() {

	const {data: blogs} = await db.all()

	blogs.map( blog => {
		fetch(`http://localhost:3000/blogs/add`,{
			method: 'post',
			body: JSON.stringify({ url: blog.url })
		}).then(res=>{
			console.log(res.json())
		})
	})


	return {
		body: 'ok'
	};
}

