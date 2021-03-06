import supabase from '$lib/supabase'

export async function get() {

	const translate_re = /(\&|=)/g;
    const translate = {
		'&': '38',
		'=': '61',
    };
	const { data: blogs, error } = await supabase
		.from('blogs')
		.select('*')
		.neq('post->>title','')
		.neq('post->>image','')
		.eq('trashed',false)
		.order('post->>date', { ascending: false })
		.limit(10)

	const items = blogs.map( ({post}) =>`
        <item>
	        <title>${post.title}</title>
	        <description><![CDATA[${post.description}]]</description>
	        <author>${post.author}</author>
	        <guid><![CDATA[${post.url}]]></guid>
	        <link><![CDATA[${post.url}]]></link>
	        <pubDate>${post.date}</pubDate>
	        <media:content url="${post.image.replace(translate_re, (match, entity) => `&#${translate[entity]};`)}" medium="image"/>
        </item>`
    )

	const rssFeed = `<?xml version="1.0"?>
	<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:media="http://search.yahoo.com/mrss/">
		<channel>
			<title>CubaBlog » Últimas Noticias de Cuba por sus Blogueros</title>
			<atom:link href="https://cubablog.net/rss" rel="self" type="application/rss+xml" />
			<link>https://cubablog.net</link>
			<description>Descubre Cuba por su blogueros</description>
			${items.join('')}
		</channel>
	</rss>`;

	return {
		headers: { 
			'Cache-Control': `s-maxage=1, stale-while-revalidate`,
			'Content-Type': "application/xml" 
		},
		body: rssFeed
	};
}