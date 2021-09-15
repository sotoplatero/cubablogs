// import {Telegram} from 'telegraf'
import TelegramBot from 'node-telegram-bot-api';
import cheerio from 'cheerio'
import Parser from 'rss-parser';

let parser = new Parser({
	// timeout: 5000,
	customFields: {
		item: [
		    ['content:encoded','contentEncoded'],
		    ['media:content','media', {keepArray: true}],
		    ['dc:creator','dcCreator']
		]
	}
});

async function getOgImage(url) {
	console.log(url)
	const res = await fetch(url)
	if (!res.ok) return
	
	const html = await res.text()
	const $ = cheerio.load(html)
	const selector = 'meta[property="og:image:secure_url"],meta[property="og:image:url"],meta[property="og:image"],meta[name="og:image"],meta[name="twitter:image:src"],meta[name="twitter:image"],meta[itemprop="image"]'
	return !/blank.jpg$/.test($(selector)?.attr('content')) ? $(selector)?.attr('content') : null
}

export default async function (url) {

    	let feed
    	try	{
			feed = await parser.parseURL( url );
    	} catch (e) {
    		console.log('error' + e)
    		return {}
    	}
		console.log(feed)
		let item = feed.items[0]

		const extract = (string = '') => string.split('.').filter((el,idx)=>idx<3).join('.') + '.'
		
		const post = { 
			title: item.title,
			url: item.link,
			date: item.isoDate,
			author: item.creator || item.dcCreator,
			description: (function() {
				if (!!item.description) return item.description

				if (!!item.contentSnippet) {
					return extract( item.contentSnippet ) 
				} 
				const content = item.content || item.contentEncoded

				if (!content) return
				const $ = cheerio.load( content )

				return extract( $.text() )
			})(),

			image: await ( async function(){

				let image = item.media?.find( el => !/gravatar/g.test( el['$']['url'] ) )
				// console.log(image)
				if (image) return image['$']['url']

				const ogImage = await getOgImage(item.link)
				if (ogImage) return ogImage

				if (item.contentEncoded) {
					const $ = cheerio.load( item.contentEncoded )
					const img = $('img')
					return img.length ? img.attr('data-src') || img.attr('src') : null
				}
				return
			})(),

			categories: item.categories,
		}

		return post

}
