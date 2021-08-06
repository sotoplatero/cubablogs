import { Octokit } from "@octokit/rest";
// import {
//   createOAuthAppAuth,
//   createOAuthUserAuth,
// } from "@octokit/auth-oauth-app";

import { decode,encode } from 'js-base64';
import { getDomain, getHostname } from 'tldts'

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_ACCESS_TOKEN,
});
// const octokit = new Octokit({
//   authStrategy: createOAuthAppAuth,
//   auth: {
//     clientId: import.meta.env.VITE_GITHUB_CLIENT_ID,
//     clientSecret: import.meta.env.VITE_GITHUB_CLIENT_SECRET,
//   },
// });

const options = {
  owner: 'sotoplatero',
	repo: 'data',
	path: `cubablogs/db.json`,
}

const message = '+'
// let sha

export const db = {

	sha: '',
	blogs: [], 

	async all() {

		if (this.blogs.length) return this.blogs

	  let {data} = await octokit.repos.getContent(options)
	  this.sha = data.sha
	  this.blogs = JSON.parse( decode(data.content) )

	  return this.blogs
	},

	async add(blog) {
		let blogs = await this.all()

		let indexBlog = blogs.findIndex( el => getHostname(el.url) === getHostname(blog.url) ) 
		blogs = ( indexBlog > 0 ) ? blogs.splice( indexBlog, 1, blog ) : [...blogs, blog]

		this.save(blogs)

		return blogs
	},

	async find(url) {
		let blogs = await this.all()

		return blogs.find( el => el.url === url )		
	},

	async save(blogs) {

		const content = encode( JSON.stringify(blogs) );
		const sha = this.sha

		const { data } = await octokit.repos.createOrUpdateFileContents({
		  ...options,
		  message,
		  sha,
		  content,
		});

		this.blogs = blogs

		return blogs

	}

}
