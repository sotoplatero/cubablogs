import cheerio from 'cheerio'

export default async function (url) {
	const res = await fetch(url)
	if (!res.ok) return ''
	
	const html = await res.text()
	const $ = cheerio.load(html)
	
	const selector = 'meta[property="og:image:secure_url"],meta[property="og:image:url"],meta[property="og:image"],meta[name="og:image"],meta[name="twitter:image:src"],meta[name="twitter:image"],meta[itemprop="image"]'
	const src = $(selector)?.attr('content')
	if (!src) return ''

	return !/blank.jpg$/.test(src) ? src : ''
}