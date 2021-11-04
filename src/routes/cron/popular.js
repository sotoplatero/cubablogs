import { TwitterApi } from 'twitter-api-v2';
import getPopular from '$lib/util/getPopular'
import '$lib/random'

const userClient = new TwitterApi({
	appKey: import.meta.env.VITE_CONSUMER_KEY,
	appSecret: import.meta.env.VITE_CONSUMER_SECRET,
	accessToken: import.meta.env.VITE_ACCESS_TOKEN_KEY,
	accessSecret: import.meta.env.VITE_ACCESS_TOKEN_SECRET,
});

export async function post() {

    const presentations = [
        'Aquí tienen los 4 artículos más populares de la semana',
        'Vean los 4 artículos más visitados esta última semana',
        'Termina la semana y te presentamos un listado con los 4 artículos más visitados',
    ]

    const posts = await getPopular()

    const tweetsText = posts
        .filter( (el,idx) => idx < 4 )
        .map( (el,idx) => {
            const author = el.twitter ? `por ${el.twitter}` : '' 
            return `${idx+1} - ${el.title} ${el.url} ${author}` 
        })

    await userClient.v1.tweetThread([
        presentations.random(),
        ...tweetsText,
        'Puedes ver el listado completo en https://cubablog.net/posts/popular'
    ]); 
    
    return { 
        body: 'ok'
    }

}

