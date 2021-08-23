import supabase from '$lib/supabase'
import { notify } from '$lib/bot'

export async function post() {

	let { data: blogs, error } = await supabase
		.from('blogs')
		.select('title, title_post:post->>title, post->>url')
		.is('notified_at',null)

	if (error) {
		notify(`error `,'admin')
	}

	if (blogs.length) {
		let msg = 'Nuevas publicacion:\n\n'
		msg += blogs.map( el => `[${el.title_post}](${el.url}) en  *${el.title}* \n`).join('\n\n')
		notify(msg)
	}
 
	return {
		body: 'ok'
	};
}