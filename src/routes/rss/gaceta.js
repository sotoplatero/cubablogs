import RSS from 'rss';

export async function get(request) {
	const res = await fetch(`http://${request.host}/api/gaceta.json`)
	const gaceta = await res.json()

	// const domain = joke.url.split('/')[2]
	var feed = new RSS({
		title: 'Cubablog - Ultima Gaceta publicada.',
		feed_url: 'https://cubablog.net/rss/gaceta',
		site_url: 'https://cubablog.net/',
	});
	feed.item({
		title: `Gaceta ${gaceta.type} No.${gaceta.number}`,
		description: gaceta.items.map( i => `
			<h2>${i.title}</h2>
			<p>${i.content}</p>
			<br/>
		`).join(''),
		url: gaceta.url,
		guid: gaceta.url,
	})

	return {
		headers: { 
			'Cache-Control': `s-maxage=1, stale-while-revalidate`,
			'Content-Type': "application/xml" 
		},
		body: feed.xml()
	};
}