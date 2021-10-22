// import cheerio from 'cheerio'
import { getDomain, getHostname } from 'tldts'
import supabase from '$lib/supabase'
import getPost from '$lib/post'

export async function post(request) {

	let { url } = JSON.parse(request.body)
	url = !/^http/.test(url) ? `https://${url}` : url

	try {

		const response = await fetch(`https://crawl.cubablog.net/api/site?url=${encodeURIComponent(url)}`)	
		if (!response.ok) {
			return { 
				status: response.status,
				body: response 
			}
		}
		let blog = await response.json()

		if ( !blog.rss ) return { 
			status: 404,
			body: ''
		}

		blog.rss = getDomain(blog.rss) 
			? blog.rss 
			: `${blog.url.match(/https?/)}://${getHostname(blog.url)}/${blog.rss}`

		let { data, error } = await supabase
			.from('blogs')
			.select('id')
			.eq('rss', blog.rss)
			// .single()

		let dataBlog = []
		if ( data?.length && data[0].id ) {

			({ data: dataBlog, error } = await supabase
				.from('blogs')
				.update(blog)
				.eq('id', data[0].id ))

		} else {

			if (!error) {
				({ data: dataBlog, error } = await supabase
					.from('blogs')
					.insert([ blog ]))
			}
		}

		return {
			body: dataBlog.pop()
		};

	} catch (e) {
		console.log(e)
		return {
			status: 500,
			body: e
		};		
	}

}