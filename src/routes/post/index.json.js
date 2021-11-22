import supabase from '$lib/supabase'
import getPost from '$lib/post'

/**
 * @type {import('@sveltejs/kit').Load}
 */
export async function get({query}) {
	const url = encodeURI(query.get('url'))
	const idBlog = parseInt(url)

	let { data: blog, error } = await supabase
		.from('blogs')
		.select('*')
		.eq('id', idBlog)
		.single()	

	if (error) {
		return {
			status: 404,
			body: {}
		}		
	}

	const link = url.replace(/^\d+\//,'').toLowerCase()
	const post = ( blog.post.url.toLowerCase().indexOf(link) < 0 ) 
		? await getPost( blog.rss, link )
		: blog.post

	return {
		headers: { 
			'Cache-Control': `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`,
		},		
		body: { 
			...post,
			link: `/post/${blog.id}/${post.url.replace(/https?:\/\//,'')}`,
			blog: {
				id: blog.id,
				title: blog.title,
				url: blog.url,
				logo: blog.logo,
				publisher: blog.hostname.replace(/^www\./,''),
			},
		}
	};

}
