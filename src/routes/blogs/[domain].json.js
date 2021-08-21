import Parser from 'rss-parser';	
import { getHostname } from 'tldts'
import supabase from '$lib/supabase'

let parser = new Parser()

export async function get({params}) {
	const {domain} = params

	let { data: blog, error } = await supabase
		.from('blogs')
		.select('id,rss')
		.like('post->>url', '%'+domain+'%')
		.single()	

	let feed = await parser.parseURL( blog.rss );
	feed = {
		...feed, 
		items: feed.items.map( 
			({title,link,pubDate}) => ({
				title,
				link,
				pubDate,
			}) 
		)
	}

	return {
		body: {
			feed,blog
		}
	};

}
