import {db} from '$lib/db'


export async function post() {

	// let blogs = await db.all()
	// blogs = blogs.map( el => ({...el, created_at: new Date}) )
	// // console.log(blogs)
 //    await db.save(blogs)
	// notify(`Nuevo Blog: ${data.title} ${data.url}`)

	return {
		body: 'ok'
	};
}

