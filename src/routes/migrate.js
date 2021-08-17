import {db} from '$lib/db'
import { nanoid } from 'nanoid'


export async function post() {

	let blogs = await db.all()
	blogs = blogs.map( el => ({...el, id: nanoid()}) )
	// // console.log(blogs)
    await db.save(blogs)
	// notify(`Nuevo Blog: ${data.title} ${data.url}`)

	return {
		body: 'ok'
	};
}

