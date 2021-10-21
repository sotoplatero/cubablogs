// import {Telegram} from 'telegraf'
import cheerio from 'cheerio'
import Parser from 'rss-parser';
import sanitizeHtml from 'sanitize-html'

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

const optionsSanitizeHtml = {
  	allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]),
  	allowVulnerableTags: true,
	allowedAttributes: {
		a: [ 'href', 'name', 'target' ],
		img: [ 'src', 'data-*', 'alt' ],
	},	 
  	transformTags: {
		img: function(tagName, attribs) {
		    return {
		        tagName: 'img',
		        attribs: {
		          src: attribs['data-srcset'] || attribs['data-src'] || attribs['src'] || '',
		          alt: attribs['alt'] || ''
		        }
	        }		      	
	     },
	     a: sanitizeHtml.simpleTransform('a', { target: '_blank', rel: 'noopener nofollower' }),
	}
}

export default async function (rss, link = null) {

	try {
		const feed = await parser.parseURL( rss );
		const item = link 
			? feed.items.find( el => el.link.toLowerCase().indexOf(link) >= 0)
			: feed.items[0]

		const articleRes = await fetch(`https://crawl.cubablog.net/api/article?url=${encodeURIComponent(item.link)}`)
		const article = articleRes.ok ? await articleRes.json() : {}
		const wpm = 250

		return { 
			title: item.title,
			url: item.link,
			date: item.isoDate,
			author: item.creator || item.dcCreator || article.author,
			image: article.image,
			content: sanitizeHtml( article.content, optionsSanitizeHtml ),
			description: article.excerpt,
			categories: item.categories,
			words: article.words,
			time: article.words / wpm,
		}

	} catch (err) {
		console.log(err)
		return {}
	}


}
