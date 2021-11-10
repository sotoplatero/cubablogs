import { getHostname } from 'tldts'
import { unfurl } from 'unfurl.js'

const TOKEN = import.meta.env.VITE_UMAMI_TOKEN

export default async () => {

    const today = new Date
    const endAt = today.valueOf()
    const startAt = today.setDate( today.getDate() - 7 );
    
    const url = `https://umami.dsoto.dev/api/website/9/metrics?type=url&start_at=${startAt}&end_at=${endAt}`
    const res = await fetch(url, {
        headers: { 'Cookie': `umami.auth=${TOKEN}` }
    })
    
    const urls = (await res.json())
        .filter( ({ x:url }) => url.split('/')[2] != '146' && /^\/post\/\d+/.test(url) )
        .filter( ( ele, index ) => index < 10 )

    return await Promise.all(urls.map( async ({ x, y: counter }) => {

        const url = `https://${ x.replace(/\/post\/\d+\//,'') }`
        const ogData = await unfurl( url )
    
        return {
            url: url,
            title: ogData.title,
            description: ogData.description,
            image: ogData.twitter_card?.images?.url || ogData.open_graph?.images?.url,
            blog: x.split('/')[2],
            hostname: getHostname(url),
            twitter: ogData.twitter_card?.site || ogData.twitter_card?.creator,
            counter
        }
    
    }))

}