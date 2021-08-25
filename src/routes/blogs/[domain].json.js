import Parser from 'rss-parser';	
import { getHostname } from 'tldts'
import supabase from '$lib/supabase'

let parser = new Parser()

export async function get({params}) {
	const {domain} = params

	let { data: blog, error } = await supabase
		.from('blogs')
		.select('*')
		.like('url', '%'+domain+'%')
		.single()	

	let {items} = await parser.parseURL( blog.rss );
	items = items.map( 
			({title,link,pubDate}) => ({
				title,
				link,
				pubDate,
			}) 
		)
	

	return {
		body: {
			...blog, hostname: getHostname(blog.url), items
		}
	};

}
