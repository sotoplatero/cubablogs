import RSS from 'rss';

export async function get(request) {
	const res = await fetch(`http://${request.host}/api/insmet.json`)
	const insmet = await res.json()

	// const domain = joke.url.split('/')[2]
	var feed = new RSS({
		title: 'Cubablog - Estado del Tiempo.',
		feed_url: 'https://cubablog.net/rss/insmet',
		site_url: 'https://cubablog.net/',
	});
	feed.item({
		title: insmet.title,
		description: insmet.map + insmet.content,
		url: insmet.url,
		guid: insmet.title,
	})

	return {
		headers: { 
			'Cache-Control': `s-maxage=1, stale-while-revalidate`,
			'Content-Type': "application/xml" 
		},
		body: feed.xml()
	};
}