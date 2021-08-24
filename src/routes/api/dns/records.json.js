
export async function get({ headers}) {

	const {authorization} = headers
	const token = authorization?.replace(/Bearer/i,'').trim()
	if (token !== import.meta.env.VITE_CUBABLOG_TOKEN) {
		return {
			status: 401,
		};		
	}
	const url = `https://api.vercel.com/v4/domains/cubablog.net/records`
	const res = await fetch(url,{
		credentials: "include",
		headers: {
			Authorization: `Bearer ${import.meta.env.VITE_VERCEL_TOKEN}`,
		},
	})

	return {
		status: res.status,
		body: await res.json()
	};
}
