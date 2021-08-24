import {db} from '$lib/db'	
import Parser from 'rss-parser';
import slugify from '$lib/slug'	
let parser = new Parser()
import sanitizeHtml from 'sanitize-html';
import supabase from '$lib/supabase'
/**
 * @type {import('@sveltejs/kit').Load}
 */
export async function get({query}) {
	const url = query.get('url')

	let { data: blog, error } = await supabase
		.from('blogs')
		.select('id,rss')
		.like('post->>url', '%'+slugify(url)+'%')
		.single()	

	const feed = await parser.parseURL( blog.rss );
	let post = feed.items.find( el => slugify(el.link) === slugify(url))

	const options = {
	  	allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]),
		allowedAttributes: {
		  a: [ 'href', 'name', 'target' ],
		  // We don't currently allow img itself by default, but this
		  // would make sense if we did. You could add srcset here,
		  // and if you do the URL is checked for safety
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
			}
		}
	};

}
