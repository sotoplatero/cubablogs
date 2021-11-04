
import getPopular from '$lib/util/getPopular'

const TOKEN = import.meta.env.VITE_UMAMI_TOKEN

export async function get() {

	try {
		const popular = await getPopular()

		return {
			headers: { 
				'Cache-Control': `s-maxage=1, stale-while-revalidate`,
			},	
			body: popular
		};
		
	} catch(err) {
		console.log(err)
		return {
			status: 500,
			body: err
		}
	}
}