// import sharp from 'sharp'

// export async function get({params, query}) {

//     const res = await fetch(`https://${params.url}`)
// 	if (res.ok) {
//         // const resImage = await fetch(src)
//         const imageResponse = await res.arrayBuffer()
//         const imageBuffer = Buffer.from(imageResponse, 'binary')
        
//         const imageBufferResize = await sharp(imageBuffer)
//           .resize({
//             width: parseInt(params.width),
//             height: parseInt(params.height),
//             fit: 'inside',
//             // position: sharp.strategy.entropy
//           })
//           .toBuffer()  

//         const img = Buffer.from(imageBufferResize, 'binary')

//         return {
//             headers: { 
//                 // 'Content-Disposition': `attachment; filename="${params.url.replace('/','-')}"`,
//                 'content-type': res.headers.get('content-type'),
//                 'Cache-Control': 's-maxage=1, stale-while-revalidate',
//             },
//             body: img
//         }; 
//     }
    
//     return {
//         headers: { 
//             'Cache-Control': `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`,
//         }, 
//         body: ''
//     }


// }