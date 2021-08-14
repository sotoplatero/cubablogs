// import {Telegram} from 'telegraf'
import TelegramBot from 'node-telegram-bot-api';
import cheerio from 'cheerio'
import Parser from 'rss-parser';
let parser = new Parser({customFields: {
		item: [
		    ['content:encoded','contentEncoded'],
		    ['media:content','media', {keepArray: true}],
		    ['dc:creator','dcCreator']
		]
	}});

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
			image: ( function(){
				// console.log(item.media)
				if (item.media) return item.media['$']['url']
				const $ = cheerio.load( item.content + item.contentEncoded )
				return $('img').attr('src')
			})(),
			categories: item.categories,
		}

}
