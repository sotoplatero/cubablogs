import cheerio from 'cheerio'
import normalizeUrl from 'normalize-url';
import {parse} from 'himalaya'



export async function get({query}) {
	let url = query.get('url')
	url = normalizeUrl(url, {forceHttps: true})

	let res = await fetch(url)
	if (!res.ok) {
		url = normalizeUrl(url)
		let res = await fetch(url)
	} 

	const html = await res.text()
	const $ = cheerio.load(html)
	const json = parse(html)
	const twitter_image = $('meta[property^="twitter:image"],meta[name^="twitter:image"]')?.attr('content')

	return {
		body: {
			json: json
				.filter( el => el.tagName==='html')[0]
				.children
				.filter( el => el.tagName==='head')[0]
				.children,
			content_type: $('meta[http-equiv="Content-Type"]')?.attr('content').trim(),
			viewport: $('meta[name=viewport]')?.attr('content').trim(),
			title: $('title')?.text().trim(),
			description: $('meta[name="description"]')?.attr('content').trim(),
			creator: $('meta[name="twitter:creator"],meta[property="twitter:creator"]')?.attr('content'),
			og_description: $('meta[property="og:description"],meta[name="og:description"]')?.attr('content'),
			og_image: $('meta[property^="og:image"],meta[name^="og:image"]')?.attr('content'),
			og_type: $('meta[property="og:type"],meta[name="og:type"]')?.attr('content'),
			og_locale: $('meta[property="og:locale"]')?.attr('content'),
			twitter_image,
			msapplication_tile_image: $('meta[name="msapplication-TileImage"]')?.attr('content'),
			msapplication_tile_color: $('meta[name="msapplication-TileColor"]')?.attr('content'),
			apple_touch_icon_precomposed: $('link[rel="apple-touch-icon-precomposed"]')?.attr('href'),
			apple_touch_icon: $('link[rel="apple-touch-icon"]')?.attr('href'),
			icon32x32: $('link[rel="icon"][sizes="32x32"]')?.attr('href'),
			icon16x16: $('link[rel="icon"][sizes="16x16"]')?.attr('href'),
			icon180x180: $('link[rel="icon"][sizes="180x180"]')?.attr('href'),
		}
	};
}