import cheerio from 'cheerio'

export async function get({params}) {

    const url = `https://${params.url}`
    const res = await fetch(url, {
        headers: { referer: url }
    })
    
	if (res.ok) {
        const buffer = await res.arrayBuffer()
        const uint = new Uint8Array(buffer)
        return {
            headers: { 
                // 'Content-Disposition': `attachment; filename="${params.url.replace('/','-')}"`,
                'content-type': res.headers.get('content-type'),
                'Cache-Control': `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`,
            },
            body: uint
        }; 
    }
    
    return {
        headers: { 
            'Cache-Control': `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`,
        },        
        body: ''
    }


}