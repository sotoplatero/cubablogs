
export async function post({body, headers}) {
	// let { name, type, value, ttl = 60 } = JSON.parse(body)

	console.log(body)
	
	return {
		body: 'ok'
	};
}
