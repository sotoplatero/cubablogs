import supabase from '$lib/supabase'
import getPost from '$lib/post'
// import { notify } from '$lib/bot'

export async function post() {

	// try	{
		let { data: blogs, error } = await supabase
			.from('blogs')
			.select('*')
			.eq('trashed',false)
			.order('updated_at', { ascending: true })
			.limit(5)

	    await Promise.all( 
	    	blogs.map( async blog => {

	    		const post = await getPost( blog.rss )

	    		if ( 
	    			JSON.stringify(post) !== '{}' &&
	    			post?.url !== blog.post?.url
    			) {
					const { data, error } = await supabase
					  .from('blogs')	
					  .update({post})
					  .eq('id', blog.id) 

					if (error) {
						notify(JSON.stringify(error,null,2),'admin')
					}
	    		}


	    	})
	    )

	// } catch (err) {
	// 	console.log(err)
	// }

	return {
		body: 'ok'
	}
}