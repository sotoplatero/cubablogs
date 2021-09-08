import Parser from 'rss-parser';
import slugify from '$lib/slug'	
import sanitizeHtml from 'sanitize-html'
import supabase from '$lib/supabase'
import { getHostname } from 'tldts'
let parser = new Parser()
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

	const link = url.replace(/^\d+\//,'')
	const feed = await parser.parseURL( blog.rss );
	let post = feed.items.find( el => el.link.indexOf(link))

	const options = {
	  	allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]),
		allowedAttributes: {
		  a: [ 'href', 'name', 'target' ],
		  img: [ 'src' ]
		},	 
	    exclusiveFilter: function(frame) {
	      return /p|table/.test(frame.tag) && !frame.text.trim();
	    }		 	
	 //  	transformTags: {
		// 	'img': sanitizeHtml.simpleTransform('ul', {class: 'foo'}),
		// }
	}
	const html = post['content:encoded'] ? post['content:encoded'] : post['content']
	post['body'] = sanitizeHtml( html, options)

	return {
		body: {
			...post,
			blog: {
				title: feed.title,
				url: feed.link,
				logo: blog.logo,
			}
		}
	};

}
