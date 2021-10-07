import supabase from '$lib/supabase'
import RSS from 'rss';
import isToday from '$lib/isToday'

export async function get() {

	const { data: blogs, error } = await supabase
		.from('blogs')
		.select('*')
		.order('post->>date', { ascending: false })
		.limit(10)

	var feed = new RSS({
		title: 'CubaBlog » Últimas Noticias de Cuba por sus Blogueros',
		feed_url: 'https://cubablog.net/rss/today',
		site_url: 'https://cubablog.net/',
	});
	blogs
		.filter( b => b.post.date.isToday() )
		.forEach( (blog) => {
			const post = blog.post
			const url = `http://cubablog.net/post/${blog.id}/${blog.post.url.replace(/https?:\/\//,'')}`
			feed.item({
				title: post.title,
				description: post.content,
				url: url,
				guid: url,
				date: post.date,
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