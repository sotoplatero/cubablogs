import Parser from 'rss-parser';	
import { getHostname } from 'tldts'
import supabase from '$lib/supabase'

let parser = new Parser()

export async function get({params}) {
	const {id} = params

	let { data: blog, error } = await supabase
		.from('blogs')
		.select('*')
		.eq('id', id)
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
