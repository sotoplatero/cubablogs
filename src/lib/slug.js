export default (url) => {
	if (!url) return null
	return url
		.replace(/^https?:\/\//,'')
		// .replace(/[a-bA-Z0-9\-]/g,'-')
		// .replace(/\-+/g,'-')

}