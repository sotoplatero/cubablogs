import cheerio from 'cheerio'

export async function get({params}) {


    const res = await fetch(`https://${params.url}`)

        console.log(res)
	if (res.ok) {
        // const resImage = await fetch(src)
        const buffer = await res.arrayBuffer()
        const uint = new Uint8Array(buffer)
        console.log(uint)
        return {
            headers: { 
                'Content-Disposition': `attachment; filename="${params.url.replace('/','-')}"`,
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