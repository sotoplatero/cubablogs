import Parser from 'rss-parser';
import slugify from '$lib/slug'	
import supabase from '$lib/supabase'
import getOgImage from '$lib/ogimage'
import { getHostname } from 'tldts'
// import Mercury from '@postlight/mercury-parser';
// import { Readability } from '@mozilla/readability'
import pkg from 'article-parser';
const { extract } = pkg;

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
	const post = feed.items.find( el => el.link.indexOf(link) >= 0 )
	// const article = await Mercury.parse(post.link)

	const html = await fetch('https://' +link).then(res=>res.text())

    const article = await extract('https://' + link,{
    	wordsPerMinute: 250,
    	sanitizeHtmlOptions: {
		  	transformTags: {
				'img': function(tagName, attribs) {
				    return {
				        // tagName: 'img',
				        attribs: {
				          src: attribs['data-srcset'] || attribs['src'] || '',
				        }
			        }		      	
			     }
			}    		
    	}
    });
	  // try {
	  //   console.log(article);
	  // } catch (err) {
	  //   console.trace(err);
	  // }

	// const text = await fetch(blog.rss).then(res=>res.text())
	// console.log(text)

	// if (!post) return {}




	// const options = {
	//   	allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img','script' ]),
	//   	allowVulnerableTags: true,
	// 	allowedAttributes: {
	// 		a: [ 'href', 'name', 'target' ],
	// 		img: [ 'src', 'data-*', 'alt' ],
	// 		script: ['src'],
	// 		blockquote: ['class','data-*'],
	// 	},	 
	// 	allowedScriptDomains: ['twitter.com'],
	//   	transformTags: {
	// 		'img': function(tagName, attribs) {
	// 		    return {
	// 		        tagName: 'img',
	// 		        attribs: {
	// 		          src: attribs['data-srcset'] || attribs['src'] || '',
	// 		          alt: attribs['alt'] || ''
	// 		        }
	// 	        }		      	
	// 	     }
	// 	}
	// }
	// const content = post['content:encoded'] ? post['content:encoded'] : post['content']

	return {
		body: { 
			article,
			title: article.title,
			pubDate: post.pubDate,
			link: post.link,
			url: `/post/${blog.id}/${post.link.replace(/https?:\/\//,'')}`,
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
