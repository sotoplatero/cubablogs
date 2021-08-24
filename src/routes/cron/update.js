import supabase from '$lib/supabase'
import getPost from '$lib/post'

export async function post() {

	let { data: blogs, error } = await supabase
		.from('blogs')
		.select('id,rss,post->url')
		.order('updated_at', { ascending: true })
		// .limit(3)

    await Promise.all( 
    	blogs.map( async ({id, rss, url}) => {

    		const post = await getPost(rss)
    		let dataToUpdate = { rss }

    		if ( JSON.stringify(post) !== '{}' ) {
	    		dataToUpdate = { post }
    		}

    		if ( 
    			typeof post?.url !== 'undefined' && 
				post?.url !== url
			) {
				dataToUpdate = { post, notified_at: null}
    			console.log('update -> ' + rss)
			}

			const { data, error } = await supabase
			  .from('blogs')	
			  .update( dataToUpdate )
			  .eq('id', id) 

			if (error) {
				notify(`error `,'admin')
			}
			console.log(error)
    	})
    )

	return {
		body: 'ok'
	};
}