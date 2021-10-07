import RSS from 'rss';

export async function get(request) {
	const res = await fetch(`http://${request.host}/api/joke.json`)
	const joke = await res.json()

	const domain = joke.url.split('/')[2]
	var feed = new RSS({
		title: 'Chiste de Cubablog',
		feed_url: 'https://cubablog.net/rss/joke',
		site_url: 'https://cubablog.net/',
	});
	feed.item({
		title: domain,
		description: joke.content,
		url: joke.url,
		guid: joke.url,
	})

	return {
		headers: { 
			'Cache-Control': `s-maxage=1, stale-while-revalidate`,
			'Content-Type': "application/xml" 
		},
		body: feed.xml()
	};
}