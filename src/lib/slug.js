export default (url) => {
	if (!url) return null
	return url
		.replace(/^https?:\/\//,'')
		// .replace(/\/$/,'')
		// .replace(/\//g,'-')
		// .replace(/\-+/g,'-')

}