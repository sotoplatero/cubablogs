import { Octokit } from "@octokit/rest";
import {notify} from '$lib/bot'
import { v4 as uuidv4 } from 'uuid';
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

export const db = {

	blogs: [], 


	async all() {

	  let {data} = await octokit.repos.getContent(options)
	  let blogs = JSON.parse( decode(data.content) )

	  return blogs
	},

	async add(blog) {
		let blogs = await this.all()

		let indexBlog = blogs.findIndex( el => getHostname(el.url) === getHostname(blog.url) ) 

		// update
		if ( indexBlog > 0 ) {
			blog.updated_at = new Date
			blogs.splice( indexBlog, 1, blog )
		} else { // create
			blog.created_at = new Date
			blog.id = uuidv4()
			blogs.splice( blogs.length, 0, blog )
			notify(`Nuevo Blog: ${blog.title} ${blog.url}`)
		}

		this.save(blogs)

		return blogs
	},

	async find(url) {
		let blogs = await this.all()

		return blogs.find( el => el.url === url )		
	},

	async save(blogs) {

		const {data} = await octokit.repos.getContent(options)

		await octokit.repos.createOrUpdateFileContents({
		  ...options,
		  message: '+',
		  sha: data.sha,
		  content: encode( JSON.stringify(blogs) ),
		});

		return blogs

	}

}
