import { TwitterApi } from 'twitter-api-v2';

console.log({
	appKey: import.meta.env.VITE_CONSUMER_KEY,
	appSecret: import.meta.env.VITE_CONSUMER_SECRET,
	accessToken: import.meta.env.VITE_ACCESS_TOKEN_KEY,
	accessSecret: import.meta.env.VITE_ACCESS_TOKEN_SECRET,
})
const userClient = new TwitterApi({
	appKey: import.meta.env.VITE_CONSUMER_KEY,
	appSecret: import.meta.env.VITE_CONSUMER_SECRET,
	accessToken: import.meta.env.VITE_ACCESS_TOKEN_KEY,
	accessSecret: import.meta.env.VITE_ACCESS_TOKEN_SECRET,
});

export async function post() {
    const res = await fetch('http://localhost:3000/posts/popular.json')
    const posts = (await res.json())

    const tweetsText = posts
        .filter( (el,idx) => idx < 4 )
        .map( (el,idx) => `${idx+1} - ${el.title} ${el.url}` )

    await userClient.v1.tweetThread( tweetsText ); 
    
    return { 
        body: 'ok'
    }

}

