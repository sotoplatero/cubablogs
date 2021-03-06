import supabase from '$lib/supabase'
import RSS from 'rss';
import cheerio from 'cheerio';
import isToday from '$lib/isToday'

export async function get() {

	const { data: blogs, error } = await supabase
		.from('blogs')
		.select('*')
		.order('post->>date', { ascending: false })
		.limit(10)

	var feed = new RSS({
		title: 'Noticias del Día',
		feed_url: 'https://cubablog.net/rss/today',
		site_url: 'https://cubablog.net/',
	    custom_namespaces: {
	      'media': 'http://search.yahoo.com/mrss/'
	    },		
	});

	blogs
		.filter( b => b.post.date.isToday() )
		.forEach( (blog) => {
			const post = blog.post
			const url = `http://cubablog.net/post/${blog.id}/${blog.post.url.replace(/https?:\/\//,'')}`
			const $ = cheerio.load(post.content)
			feed.item({
				title: post.title,
				description: $.text().split('.').filter((ele,idx)=>idx<=2).join(''),
				url: post.url,
				guid: post.url,
				date: post.date,
				custom_elements: post.image ? [
					{
						'media:content': {
							_attr: {
								medium:"image",
								url: post.image,
							}
						}
					}
				] : undefined
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