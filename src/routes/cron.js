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
	let blogsWithoutUpdate = blogs.filter( el => !isToday(el.update_at) )

    await Promise.all( blogsWithoutUpdate.map( async (blog) => {
    	let feed
    	try	{
			feed = await parser.parseURL( blog.rss );
    	} catch (e) {
    		return { ...blog, update_at: new Date }
    	}
		
		let item = feed.items[0]
		const content = item.content || item.contentEncoded

		const blogUpdated = { 
			...blog,
			update_at: new Date,
			post: {
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
			},
		}
	    const blogIndex = blogs.findIndex(el=>el.url===blog.url)
	    blogs.splice(blogIndex,1,blogUpdated)		
    }))

	console.log(blogs)
	// notify(`Nuevo Blog: ${data.title} ${data.url}`)

	return {
		body: true
	};
}

const isToday = (date) => {
	
	if (!date) return false

    const today = new Date()
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
};