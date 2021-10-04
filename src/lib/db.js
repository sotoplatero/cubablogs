import supabase from '$lib/supabase'
import { getHostname } from 'tldts'

const db = {
	async home({limit=24}) {
		let { data: blogs, error } = await supabase
			.from('blogs')
			.select('*')
			.not('post','is', null)
			.neq('post->>title', '')
			.eq('trashed',false)
			.order('post->>date', { ascending: false })
			.limit(limit)

		blogs = blogs.map( blog => ({...blog, hostname: getHostname(blog.url) }))

		return { blogs , error }	
	}
}

export {db}