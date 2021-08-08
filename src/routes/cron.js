import cheerio from 'cheerio'
import { getDomain } from 'tldts'
import {db} from '$lib/db'
import {notify} from '$lib/bot'
import Parser from 'rss-parser';
let parser = new Parser({customFields: {
    item: [
	    ['content:encoded','contentEncoded'],
	    ['media:content','media']
    ]
  }});

export async function post() {

	var blogs = await db.all()
	// console.log(blogs)
	const startTime = new Date()
	let executionTime

	for (let blog of blogs){
		console.log(blog.rss)
		try	{
			if (isToday(blog.updated_at)) continue

			let feed = await parser.parseURL( blog.rss );
			
			let item = feed.items[0]
			const content = item.content || item.contentEncoded

			let post = {
				title: item.title,
				url: item.link,
				date: item.pubDate,
				description: (function(){
					if (!!item.contentSnippet) {
						return item.contentSnippet.substring(0, 250) 
					} 
					if (!item.content) return
					const $ = cheerio.load( item.content )
					return $.text().substring(0, 250)
				})(),
				image: ( function(){
					if (item.media) return item.media['$']['url']
					if (!content) return
					const $ = cheerio.load( content )
					return $('img').attr('src')
				})(),
			}
			blog.post = post
			blog.updated_at = new Date()

			let endTime = new Date()
			executionTime = endTime - startTime
			console.log(executionTime)

		} catch (e) {
			console.log(e)
		}
		// console.log(blog)
	
	}
	// notify(`Nuevo Blog: ${data.title} ${data.url}`)

	return {
		body: blogs
	};
}

const isToday = (date) => {
	
	if (!date) return false

    const today = new Date()
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
};