import supabase from '$lib/supabase'

export async function post() {

	let blogs = await db.all()
	blogs = blogs.map( el => ({ 
		title: el.title,
		url: el.url,
		description: el.description,
		logo: el.logo,
		image: el.image,
		twitter: el.twitter,
		github: el.github,
		rss: el.rss,
		scheduled_at: el.scheduled_at,
		created_at: el.created_at ?? new Date,
		post: el.post,
	}))
	console.log(blogs)
	const { data, error } = await supabase
	  .from('blogs')
	  .insert(blogs)	

	console.log(error)
    // await db.save(blogs)
	// notify(`Nuevo Blog: ${data.title} ${data.url}`)

	return {
		body: 'ok'
	};
}

