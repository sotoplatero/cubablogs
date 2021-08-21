import supabase from '$lib/supabase'
import getPost from '$lib/post'

export async function post() {

	let { data: blogs, error } = await supabase
		.from('blogs')
		.select('id,rss,post->url')
		.order('updated_at', { ascending: true })
		.limit(10)

    await Promise.all( 
    	blogs.map( async ({id, rss, url}) => {

    		const post = await getPost(rss)

    		if ( JSON.stringify(post) === '{}' ) {
    			return
    		}

    		let dataToUpdate = { post }

    		if ( 
    			typeof post?.url !== 'undefined' && 
				post?.url !== url
			) {
				dataToUpdate = { post, notified_at: null}
			}

			const { data, error } = await supabase
			  .from('blogs')	
			  .update( dataToUpdate )
			  .eq('id', id) 
    	})
    )

	return {
		body: 'ok'
	};
}