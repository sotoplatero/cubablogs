import {db} from '$lib/db'	
import Parser from 'rss-parser';	

let parser = new Parser()

export async function get({params}) {
	const {id} = params

	const blog = (await db.all()).find(el=>el.id==id)
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
