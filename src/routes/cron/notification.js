import supabase from '$lib/supabase'
import { notify } from '$lib/bot'

export async function post() {

	let { data: blogs, error } = await supabase
		.from('blogs')
		.update({ notified_at: new Date })
		.is('notified_at',null)

	console.log(blogs)
	
	if (error?.length) {
		notify(`error ${JSON.stringify(error, null, 1)}`, 'admin')
	}

	if (blogs?.length) {
		let msg = `✨✨ Nuevas publicaci${blogs.length===1 ? 'ón' : 'ones'} ✨✨\n\n`
		msg += blogs.map( el => `[${el.post.title}](${el.post.url}) en *${el.title}* \n`).join('\n')
		notify(msg)
	}
 
	return {
		body: 'ok'
	};
}