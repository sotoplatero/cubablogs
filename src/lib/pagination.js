import supabase from '$lib/supabase'

export default async (page = 1, per_page = 10) => {

	const { data, error, count } = await supabase
		.from('blogs')
		.select('id', {}, { count: 'exact', head: true })
	page = parseInt(page)
	const total_pages = Math.ceil( count / per_page );

	return {
		page,
		count,
		per_page,
		prev_page: page - 1 ? page - 1 : 0,
		next_page: (total_pages > page) ? page + 1 : total_pages,
		total_pages,
	};
}