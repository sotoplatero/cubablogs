import supabase from '$lib/supabase'
import { notify } from '$lib/bot'

export async function post() {

	let { data: blogs, error } = await supabase
		.from('blogs')
		.update({ notified_at: new Date })
		.is('notified_at',null)

	if (error) {
		notify(`error `,JSON.stringify(error, null, 1))
	}

	if (blogs.length) {
		let msg = `✨✨ Nuevas publicaci${blogs.length===1 ? 'ón' : 'ones'} ✨✨\n\n`
		msg += blogs.map( el => `[${el.post.title}](${el.post.url}) en  *${el.title}* \n`).join('\n')
		notify(msg)
	}
 
	return {
		body: 'ok'
	};
}