export default (url) => {
	if (!url) return null
	return url
		.replace(/^https?:\/\//,'')
		.replace(/\/$/,'')
		// .replace(/\/$/,'')
		// .replace(/\//g,'-')
		// .replace(/\-+/g,'-')

}