import supabase from '$lib/supabase'
import { notify } from '$lib/bot'

export async function post() {

	let { data: blogs, error } = await supabase
		.from('blogs')
		.update({ notified_at: new Date })
		.is('notified_at',null)

	if (error.length) {
		console.log(error)
		notify(`error `,JSON.stringify(error, null, 1))
	}

	if (blogs) {
		let msg = '✨✨ Nuevas publicaciones ✨✨\n\n'
		msg += blogs.map( el => `[${el.post.title}](${el.post.url}) en  *${el.title}* \n`).join('\n')
		notify(msg)
	}
 
	return {
		body: 'ok'
	};
}