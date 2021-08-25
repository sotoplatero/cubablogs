const VERCEL_TOKEN = import.meta.env.VITE_VERCEL_TOKEN
const CUBABLOG_TOKEN = import.meta.env.VITE_CUBABLOG_TOKEN

export async function del({params, headers}) {
	// let { name, type, value, ttl = 60 } = JSON.parse(body)

	const {authorization} = headers
	const token = authorization?.replace(/Bearer/i,'').trim()
	if (token !== CUBABLOG_TOKEN) {
		return {
			status: 401,
		};		
	}

	const url = `https://api.vercel.com//v2/domains/:domain/records/${params.id}`
	const res = await fetch(url,{
		method: 'DELETE',
		credentials: "include",
		headers: {
			Authorization: `Bearer ${VERCEL_TOKEN}`,
		},
		body: body

	})

	return {
		status: res.status,
		body: await res.json()
	};
}
