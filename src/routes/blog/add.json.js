import cheerio from 'cheerio'
import { getDomain } from 'tldts'
import {db} from '$lib/db'

async function clearbit(url) {
	const domain = getDomain(url)
	const response = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${domain}`)
	const data = await response.json()
	return data[0]?.logo
}

export async function post({ query }) {
	let url = query.get('url');
	url = !/^http/.test(url) ? `https://${url}` : url

	const response = await fetch(url)
	const html = await response.text()
	const $ = cheerio.load( html )

	const selectors = {
		title: 'meta[property="og:title"],meta[name="twitter:title"],meta[property="twitter:title"]',
		description: 'meta[property="description"],meta[name="description"],meta[itemprop="description"]',
		author: 'meta[name="author"],meta[property="article:author"],[itemprop*="author" i] [itemprop="name"],[itemprop*="author" i],[rel="author"]',
		image: 'meta[property="og:image:secure_url"],meta[property="og:image:url"],meta[property="og:image"],meta[name="twitter:image:src"],meta[name="twitter:image"],meta[itemprop="image"]',
		logo: 'link[rel="apple-touch-icon"][sizes="180x180"],link[rel="icon"][sizes="32x32"],link[rel="apple-touch-icon"]',
		rss: 'link[type="application/rss+xml"],link[type="application/atom+xml"]',
		twitter: 'meta[name="twitter:creator"],meta[property="twitter:creator"]',
		github: 'a[href*="github.com"]',
	}
	const data = {
		url,
		title: $(selectors.title).attr('content') || $('title').text(),
		description: $(selectors.description).attr('content'),
		author: $(selectors.author).attr('content'),
		logo: ( function(){
			let logo = $(selectors.logo).attr('href') 
			if (!logo) return
			return getDomain(logo) ? logo : url + logo
		})(),
		image: $(selectors.image).attr('content'),

		rss: ( function() {
			let rss = $(selectors.rss).attr('href') 
			if (!rss) return

			return getDomain(rss) ? rss : url + rss
		})(),

		twitter: ( function() {
			let user = $(selectors.twitter).attr('content')
			if (!user) return
			let username = user.replace(/@/,'')

			return {
				user,
				url: `https://twitter.com/${username}`,
				avatar: `https://unavatar.io/twitter/${username}`
			}
		})(),

		github: { 
			url: $(selectors.github).attr('href'),
		}
	}

	const blogs = await db.add(data)

	return {
		body: blogs
	};
}