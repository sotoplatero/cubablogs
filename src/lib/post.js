// import {Telegram} from 'telegraf'
import TelegramBot from 'node-telegram-bot-api';
import cheerio from 'cheerio'
import Parser from 'rss-parser';
let parser = new Parser({customFields: {
		item: [
		    ['content:encoded','contentEncoded'],
		    ['media:content','media'],
		    ['dc:creator','dcCreator']
		]
	}});

async function getOgImage(url) {
	const res = await fetch(url)
	if (!res.ok) {
		return
	}
	const html = await res.text()
	const $ = cheerio.load(html)
	const selector = 'meta[property="og:image:secure_url"],meta[property="og:image:url"],meta[property="og:image"],meta[name="twitter:image:src"],meta[name="twitter:image"],meta[itemprop="image"]'
	return $(selector)?.attr('content')
}

export default async function (url) {

    	let feed
    	try	{
			feed = await parser.parseURL( url );
    	} catch (e) {
    		return { }
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
				if (item.media) return item.media['$']['url']
				if (item.contentEncoded) {
					const $ = cheerio.load( item.contentEncoded )
					const img = $('img')
					return img.length ? img.attr('data-src') || img.attr('src') : null
				}
				const ogImage = await getOgImage(item.link)
				console.log(ogImage)
				return ogImage
			})(),
			categories: item.categories,
		}

}
