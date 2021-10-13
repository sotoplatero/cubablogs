import Parser from 'rss-parser';
// import slugify from '$lib/slug'	
import sanitizeHtml from 'sanitize-html'
import supabase from '$lib/supabase'
// import getOgImage from '$lib/ogimage'
import { getHostname } from 'tldts'

import '$lib/random'
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

	const link = url.replace(/^\d+\//,'').toLowerCase()
	const feed = await parser.parseURL( blog.rss );
	const post = feed.items.find( el => el.link.toLowerCase().indexOf(link) >= 0)

	const articleRes = await fetch(`https://crawl.cubablog.net/api/article?url=${encodeURIComponent(post.link)}`)
	const article = articleRes.ok ? await articleRes.json() : {}
	if (!post) return {}

	const options = {
	  	allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]),
	  	allowVulnerableTags: true,
		allowedAttributes: {
			a: [ 'href', 'name', 'target' ],
			img: [ 'src', 'data-*', 'alt' ],
			// script: ['src'],
			blockquote: ['class','data-*'],
		},	 
		allowedScriptDomains: ['twitter.com'],
	  	transformTags: {
			'img': function(tagName, attribs) {
			    return {
			        tagName: 'img',
			        attribs: {
			          src: attribs['data-srcset'] || attribs['data-src'] || attribs['src'] || '',
			          alt: attribs['alt'] || ''
			        }
		        }		      	
		     }
		}
	}
	
	const content = post['content:encoded'] ? post['content:encoded'] : post['content']
	const body = article.content.length > content.length 
		? sanitizeHtml(article.content,options) 
		: sanitizeHtml(content,options)

	return {
		body: { 
			...post,
			url: `/post/${blog.id}/${post.link.replace(/https?:\/\//,'')}`,
			body: article.content.length > body.length ? article.content :  body,
			image: article.image,
			blog: {
				id: blog.id,
				title: feed.title,
				url: feed.link,
				logo: blog.logo || 'https://cubablog.net/avatar.svg',
			},
			related: feed.items
				.filter( el => el.link.toLowerCase().indexOf(link) === -1 )
				.shuffle()
				.slice(0,2)
				.map( el => ({
					title: el.title,
					url: `/post/${blog.id}/${el.link.replace(/https?:\/\//,'')}`
				}))
		}
	};

}
