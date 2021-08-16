import {db} from '$lib/db'
import { v4 as uuidv4 } from 'uuid';


export async function post() {

	let blogs = await db.all()
	blogs = blogs.map( el => ({...el, id: uuidv4()}) )
	// // console.log(blogs)
    await db.save(blogs)
	// notify(`Nuevo Blog: ${data.title} ${data.url}`)

	return {
		body: 'ok'
	};
}

