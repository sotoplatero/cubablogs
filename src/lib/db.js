import supabase from '$lib/supabase'
import { getHostname } from 'tldts'

const db = {
	async home({limit=25}) {
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
	},
	async today() {
		let today = new Date()
		// todayMidnight.setHours(0,0,0,0)	
		const year = today.getFullYear()
		const month = today.getMonth() + 1
		const day = today.getDate() -1
		const d = `${year}-${month}-${day}`
		let { data: blogs, error } = await supabase
			.from('blogs')
			.select('*')
			.not('post','is', null)
			.not('post->>image', 'is', null)
			.neq('post->>title', '')
			// .gte('post->>date',d)
			.eq('trashed',false)
			.order('post->>date', { ascending: false })
			.limit(10)

		blogs = blogs.map( blog => ({...blog, hostname: getHostname(blog.url) }))

		return { blogs , error }	
	}	
}

export {db}