import cheerio from 'cheerio'
import { getDomain } from 'tldts'
import {db} from '$lib/db'
import {notify} from '$lib/bot'
import getPost from '$lib/post'

export async function post() {

	let msg = []
	var blogs = await db.all()
	let blogsWithoutUpdate = blogs
		.sort( (a,b) => (new Date(a.scheduled_at || 0)) - (new Date(b.scheduled_at || 0)) )
		.filter( (el,index) => index < 5 )

    await Promise.all( blogsWithoutUpdate.map( async (blog) => {
    	blog.scheduled_at = new Date
    	console.log(blog.url)
    	let post = await getPost(blog.rss)

    	if  ( !!post && (post.url !== blog.post.url) ) {
	    	blog = { 
	    		...blog, 
	    		updated_at: new Date,
	    		post,
	    	}
	    	msg.push(`✨ Nuevo Artículo en *${blog.title}* \n [${post.title}](${post.url})`)
    	}

    	return await db.add(blog)

    }))

    if ( msg.length ) {
	    notify( msg.join('\n\n') )
    }
		    
	return {
		body: 'ok'
	};
}

const isToday = (date) => {
	
	if (!date) return false
	date = new Date(date)
    const today = new Date()
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
};