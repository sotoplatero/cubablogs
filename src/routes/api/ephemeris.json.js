import cheerio from 'cheerio';

export async function get() {

  const day = (new Date).getDate()
  const month = new Intl.DateTimeFormat('es-CU', {month: 'long'}).format()

  let today = `${day}_de_${month}`

  const url = `https://www.ecured.cu/api.php?action=parse&page=${today}&format=json`
  const { parse } = await fetch( url ).then( res => res.json() )

  const $ = cheerio.load( parse['text']['*'] )
  const ephemeris = $( $('.mw-parser-output > ul > li').toArray().slice(0,4) ).map((i,el)=>$(el).html()).get()

  return {
    body: { 
      url: `https://www.ecured.cu/${today}`, 
      ephemeris 
    }
  }

}