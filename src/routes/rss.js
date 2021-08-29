import rss from 'rss'
import supabase from '$lib/supabase'

export async function get() {

	const { data: blogs, error } = await supabase
		.from('blogs')
		.select('*')
		.order('post->>date', { ascending: false })
		.limit(10)

	const items = blogs.map( ({post}) =>`
        <item>
	        <title>${post.title}</title>
	        <description>${post.description}</description>
	        <author>${post.author}</author>
	        <link>${post.url}</link>
	        <guid>${post.url}</guid>
	        <pubDate>${post.date}</pubDate>
        </item>`
    )

	const rssFeed = `<?xml version="1.0"?>
	<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
		<channel>
			<title>CubaBlog » Últimas Noticias de Cuba por sus Blogueros</title>
			<atom:link href="https://cubablog.net/rss" rel="self" type="application/rss+xml" />
			<link>https://cubablog.net</link>
			<description>Descubre CUba por su blogueros</description>
			${items}
		</channel>
	</rss>`;

	return {
		headers: { 'Content-Type': "application/xml" },
		body: rssFeed
	};
}