import {db} from '$lib/db'	
import Parser from 'rss-parser';	
import { getHostname } from 'tldts'

let parser = new Parser()

export async function get({params}) {
	const {domain} = params

	const blog = (await db.all()).find(el=> getHostname(el.url)==domain)
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
