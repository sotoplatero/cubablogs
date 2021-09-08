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
		
		let item = feed.items[0]

		return { 
			title: item.title,
			url: item.link,
			date: item.isoDate,
			author: item.creator || item.dcCreator,
			description: (function(){
				if (!!item.contentSnippet) {
					return item.contentSnippet.substring(0, 250) 
				} 
				const content = item.content || item.contentEncoded
				if (!content) return
				const $ = cheerio.load( content )
				return $.text().substring(0, 250)
			})(),

			image: await ( async function(){

				let image = item.media?.find( el => !/gravatar/g.test( el['$']['url'] ) )['$']['url']
				if (image) return image

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

}
