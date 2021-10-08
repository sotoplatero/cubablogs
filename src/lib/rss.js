
const translate_re = /(\&|=)/g;
const translate = {
	'&': '38',
	'=': '61',
};

export default ({ path, title, description, items }) => `<?xml version="1.0"?>
	<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:media="http://search.yahoo.com/mrss/">
		<channel>
			<title>${title}</title>
			<atom:link href="https://cubablog.net${path}" rel="self" type="application/rss+xml" />
			<link>https://cubablog.net</link>
				${items.map( item => `
			        <item>
				        <title>${item.title}</title>
				        <author>${item.author }</author>
				        <description><![CDATA[${item.description}]]</description>
				        <guid><![CDATA[${item.link}]]></guid>
				        <link><![CDATA[${item.link}]]></link>
				        <pubDate>${item.date || new Date}</pubDate>
				        ${item.image && item.image.replace(translate_re, (match, entity) => `<media:content url="&#${translate[entity]};" medium="image"/>`)}
			        </item>
				`)}
		    )
		</channel>
	</rss>
	`	