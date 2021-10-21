// import cheerio from 'cheerio'
// import { getDomain, getHostname } from 'tldts'
import supabase from '$lib/supabase'
import getPost from '$lib/post'

export async function post(request) {

	let { url } = JSON.parse(request.body)
	url = !/^http/.test(url) ? `https://${url}` : url

	try {

		const response = await fetch(`https://crawl.cubablog.net/api/site?url=${encodeURIComponent(url)}`)	
		if (!response.ok) {
			return { body: response }
		}
		let blog = await response.json()

		if ( !blog.rss ) return { 
			status: 400,
			body: ''
		}

		let { data, error } = await supabase
			.from('blogs')
			.select('id')
			.eq('rss', blog.rss)
			.single()

		if ( data && data.id ) {

			({ data: blog, error } = await supabase
				.from('blogs')
				.update(blog)
				.eq('id', data.id ))

		} else {

			({ data: blog, error } = await supabase
				.from('blogs')
				.insert([ blog ]))

		}

		return {
			body: blog.pop()
		};

	} catch (e) {
		console.log(e)
		return {
			status: 500,
			body: e
		};		
	}

}