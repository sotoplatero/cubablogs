import cheerio from 'cheerio'
import { getDomain } from 'tldts'
import {db} from '$lib/db'
import {notify} from '$lib/bot'
import getPost from '$lib/post'

export async function post() {

	var blogs = await db.all()
	let blogsWithoutUpdate = blogs.filter( el => !isToday(el.update_at) )
	// let blogsWithoutUpdate = blogs

    await Promise.all( blogsWithoutUpdate.map( async (blog) => {
    	const post = await getPost(blog.rss)

    	if ( post.url !== blog.post.url ) {
	    	blog = { 
	    		...blog, 
	    		updated_at: new Date,
	    		post,
	    	}
		    const blogIndex = blogs.findIndex( el => el.url === blog.url )
		    blogs.splice(blogIndex,1,blog)	
		    notify(post.url)
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