import cheerio from 'cheerio'
import { getDomain } from 'tldts'
import {db} from '$lib/db'
import {notify} from '$lib/bot'
import getPost from '$lib/post'

export async function post() {

	var blogs = await db.all()
	let blogsWithoutUpdate = blogs
		.sort( (a,b) => (new Date(a.scheduled_at || 0)) - (new Date(b.scheduled_at || 0)) )
		.filter( (el,index) => index < 10 )
	// let blogsWithoutUpdate = blogs

    await Promise.all( blogsWithoutUpdate.map( async (blog) => {
    	const post = await getPost(blog.rss)
    	console.log(blog.url + ' '+  blog.scheduled_at)

    	blog.scheduled_at = new Date
    	if ( (post?.url !== blog.post.url) ) {
	    	blog = { 
	    		...blog, 
	    		updated_at: new Date,
	    		post,
	    	}
		    const blogIndex = blogs.findIndex( el => el.url === blog.url )
		    blogs.splice(blogIndex,1,blog)	
		    notify(`Nueva entrada en ${blog.title} ${post.url}`)
    	}

    }))

	// console.log(blogs)
    await db.save(blogs)
	// notify(`Nuevo Blog: ${data.title} ${data.url}`)

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