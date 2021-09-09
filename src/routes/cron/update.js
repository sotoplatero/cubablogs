import supabase from '$lib/supabase'
import getPost from '$lib/post'

export async function post() {

	try	{
		let { data: blogs, error } = await supabase
			.from('blogs')
			.select('id,rss,post->url')
			.order('updated_at', { ascending: true })
			.limit()

	    await Promise.all( 
	    	blogs.map( async ({id, rss, url}) => {

	    		const post = await getPost(rss)
	    		let dataToUpdate = { rss }

	    		if ( JSON.stringify(post) !== '{}' ) {
		    		dataToUpdate = { post }

		    		if ( post?.url != url ) {
						dataToUpdate.notified_at = null
					}
	    		}

				const { data, error } = await supabase
				  .from('blogs')	
				  .update( dataToUpdate )
				  .eq('id', id) 

				if (error) {
					notify(JSON.stringify(error,null,2),'admin')
				}
	    	})
	    )

	} catch (err) {
		console.log(err)
	}

	return {
		body: 'ok'
	};
}