import cheerio from 'cheerio'
import { getDomain, getHostname } from 'tldts'
import supabase from '$lib/supabase'
import getPost from '$lib/post'

async function clearbit(url) {
	const domain = getDomain(url)
	const response = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${domain}`)
	const data = await response.json()
	return data[0]?.logo
}

export async function post(request) {
	let { url } = JSON.parse(request.body)
	url = !/^http/.test(url) ? `https://${url}` : url
	let blog = {}

	try {

		const response = await fetch(url)

		if (!response.ok) {
			return { body: response }
		}
		const html = await response.text()
		const $ = cheerio.load( html )

		const selectors = {
			title: 'meta[property="og:title"],meta[name="twitter:title"],meta[property="twitter:title"]',
			description: 'meta[property="description"],meta[name="description"],meta[itemprop="description"],meta[property="og:description"]',
			author: 'meta[name="author"],meta[property="article:author"],[itemprop*="author" i] [itemprop="name"],[itemprop*="author" i],[rel="author"]',
			image: 'meta[property="og:image:secure_url"],meta[property="og:image:url"],meta[property="og:image"],meta[name="twitter:image:src"],meta[name="twitter:image"],meta[itemprop="image"]',
			logoBig: 'link[rel="icon"][sizes="192x192"],link[rel="apple-touch-icon"][sizes="180x180"],link[rel="apple-touch-icon"]',
			logoSmall: 'link[rel="icon"][sizes="32x32"]link[rel="icon"]',
			rss: 'link[type="application/rss+xml"],link[type="application/atom+xml"]',
			twitter: 'meta[name="twitter:creator"],meta[property="twitter:creator"]',
			github: 'a[href*="github.com"]',
			keywords: 'meta[name="keywords"]',
		}

		let rss = $(selectors.rss).attr('href') 
		if (!rss) return { 
			status: 400,
			body: ''
		}
		rss = getDomain(rss) ? rss : url + rss

		const post = await getPost(rss)

		blog = {
			url,

			title: $('title').text() || $(selectors.title).attr('content'),

			description: $(selectors.description).attr('content'),

			author: $(selectors.author).attr('content'),

			logo: await ( async function(){
				let logo = $(selectors.logoBig).attr('href') 
				if (!logo) {
					logo = $('meta[name="msapplication-TileImage"]').attr('content') 
				}
				if (!logo) {
					logo = $(selectors.logoSmall).attr('href') 
				}
				if (!logo) return null
				return getDomain(logo) ? logo : url + logo
			})(),

			image: $(selectors.image).attr('content'),

			twitter: ( function() {
				let user = $(selectors.twitter).attr('content')
				if ( !user ) {
					let url = $('[href*="twitter.com"]').attr('href')
					if ( !url || !/\@?w{1,15}$/.test(url) ) return 
					user = url.split('/').pop()
				}
				let username = user.replace(/@/g,'')

				return {
					user: username,
					url: `https://twitter.com/${username}`,
					avatar: `https://unavatar.io/twitter/${username}`
				}
			})(),

			github: { 
				url: $(selectors.github)?.attr('href'),
			},
			rss,
			post,
		}

		let { data, error } = await supabase
		  .from('blogs')
		  .select('id,url')
		  .like('url', '%'+getHostname(url)+'%')
		  .single()

		if (data) {
			({ data: blog, error } = await supabase
				.from('blogs')
				.update(blog)
				.eq('id',data.id))
		} else {
			({ data: blog, error } = await supabase
				.from('blogs')
				.insert([blog]))
		}

	} catch (e) {
		console.log(e)
		return {
			body: e
		};		
	}

	return {
		body: blog.pop()
	};
}