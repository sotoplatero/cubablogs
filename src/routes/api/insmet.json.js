import cheerio from 'cheerio'

export async function get() {

  const selectorMap = '.bordeBlanco > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > p:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > p:nth-child(2)'

  try {
    const decoder = new TextDecoder("iso-8859-1");   
    const url  = 'http://www.insmet.cu/asp/link.asp?PRONOSTICO'
    const res = await fetch( url )
    const buffer = await res.arrayBuffer()
    const html = decoder.decode(buffer)
    
    const $ = cheerio.load( html );
    const $table = $('.contenidoPagina[valign="top"]')
    console.log($table.find('p[align="justify"]').html())
    const data = {
      url,
      title: $table.find('b').first().text(),
      content: $table.find('p[align="justify"]').html(),
      author: $table.find('[id^="name"] ').map(el=>$(el).html()).get(),
      // avatar: `http://www.insmet.cu` + $table.find('#autor1').attr('src').replace(/^\.\./,''),
      map: $(selectorMap).html().trim().replace(/\.{2}/g,'http://www.insmet.cu'),
      // tmax: $('#tmax').text().replace(/\D/g,''),
      // tmin: $('#tmin').text().replace(/\D/g,''),
      // state: $('#estado').text(),
      icon: `http://www.insmet.cu` + $('table[summary] #icono').attr('src'),
    }
    return {
      body: {...data},
    }
    
  } catch (err) {
    console.log(err)
    return { status: 500, body: err }
  }
}
