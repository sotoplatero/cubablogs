import lodash from 'lodash';
import { notify } from '$lib/bot'

const { isEmpty, has } = lodash;

export async function post({body, headers}) {

	const { record, old_record } = body

	// NEW ARTICLES NOTIFICATION
	if ( 
		!isEmpty(record) && 
		has(record, 'post.url') &&
		record.post.url != old_record.post.url
	) {
		notify(`Nuevo Artículo`, 'admin')
	}

	return {
		body: 'ok'
	};
}
