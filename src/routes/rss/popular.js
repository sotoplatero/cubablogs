import supabase from '$lib/supabase'
import RSS from 'rss';
import cheerio from 'cheerio';
import isToday from '$lib/isToday'

export async function get() {

	var feed = new RSS({
		title: 'Más Visitados',
		feed_url: 'https://cubablog.net/rss/popular',
		site_url: 'https://cubablog.net/',
	    custom_namespaces: {
	      'media': 'http://search.yahoo.com/mrss/'
	    },		
	});

	const posts = await (await fetch('https://cubablog.net/posts/popular.json')).json()

	posts
		.filter((el,idx) => idx <= 2)
		.forEach( (post, idx) => {
			const order = idx + 1 
			feed.item({
				title: `${order}. ${post.title}`,
				description: post.description,
				url: post.url,
				guid: post.url,
			})	
		})


	return {
		headers: { 
			'Cache-Control': `s-maxage=1, stale-while-revalidate`,
			'Content-Type': "application/xml" 
		},
		body: feed.xml()
	};
}

const feed = () =>`
`