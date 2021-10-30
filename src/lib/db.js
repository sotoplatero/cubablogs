import supabase from '$lib/supabase'
import { getHostname } from 'tldts'

const db = {
	async all() {
		return { data: blogs, error } = await supabase
			.from('blogs')
			.select('*')
			.eq('trashed',false)
	},	
	async home({from = 0, to = 25}) {
		console.log(to)
		let { data: blogs, error } = await supabase
			.from('blogs')
			.select('*')
			.not('post','is', null)
			.neq('post->>title', '')
			.eq('trashed',false)
			.order('post->>date', { ascending: false })
			.range(from,to)

		if (blogs.length) {
			blogs = blogs.map( blog => ({
				...blog, 
				hostname: getHostname(blog.url),
				post: {
					...blog.post,
					time: blog.post.time || blog.post.words / 250
				}
			}))

		}

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

		let { data, error:e } = await supabase.rpc('blogs_today')

		if (e) console.error(e)
		else console.log(data)

		blogs = blogs.map( blog => ({...blog, hostname: getHostname(blog.url) }))

		return { blogs , error }	
	}	
}

export {db}