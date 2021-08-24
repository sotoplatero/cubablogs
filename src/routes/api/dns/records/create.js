
export async function post({body, headers}) {
	let { name, type, value, ttl } = JSON.parse(body)
	// console.log(headers)
	const url = `https://api.vercel.com/v4/domains/cubablog.net/record`
	const res = await fetch(url,{
		method: 'POST',
		Authorization: `Bearer ${import.meta.env.VITE_VERCEL_TOKEN}`,
		body: JSON.stringify({
			name: 'lolo',
			type: 'A',
			value: '152.25.58.41'
		})
	})

	if (!res.ok) return

	const id = await res.json
	return {
		body: id
	};
}