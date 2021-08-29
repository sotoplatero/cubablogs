import cheerio from 'cheerio'
import normalizeUrl from 'normalize-url';

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

	return {
		body: {
			title: $('title')?.text().trim(),
			description: $('meta[name="description"]')?.attr('content').trim(),
			creator: $('meta[name="twitter:creator"],meta[property="twitter:creator"]')?.attr('content'),
			og_description: $('meta[property="og:description"],meta[name="og:description"]')?.attr('content'),
			og_image: $('meta[property="og:image"],meta[name="og:image"]')?.attr('content'),
			og_locale: $('meta[property="og:locale"]')?.attr('content'),
			twitter_image: $('meta[property="twitter:image"],meta[name="twitter:image"]')?.attr('content'),
			apple_touch_icon: $('link[rel="apple-touch-icon"]')?.attr('href'),
			icon32x32: $('link[rel="icon"][sizes="32x32"]')?.attr('href'),
			icon16x16: $('link[rel="icon"][sizes="16x16"]')?.attr('href'),
		}
	};
}