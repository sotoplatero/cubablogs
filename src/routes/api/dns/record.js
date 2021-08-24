
export async function post({body, headers}) {
	// let { name, type, value, ttl = 60 } = JSON.parse(body)

	const {authorization} = headers
	const token = authorization?.replace(/Bearer/i,'').trim()
	if (token !== import.meta.env.VITE_CUBABLOG_TOKEN) {
		return {
			status: 401,
		};		
	}
	
	const url = `https://api.vercel.com/v4/domains/cubablog.net/records`
	const res = await fetch(url,{
		method: 'POST',
		credentials: "include",
		headers: {
			Authorization: `Bearer ${import.meta.env.VITE_VERCEL_TOKEN}`,
		},
		body: body

	})

	// if (!res.ok) return

	return {
		status: res.status,
		body: await res.json()
	};
}
