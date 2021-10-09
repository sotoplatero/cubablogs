import cheerio from 'cheerio'

export async function get() {

  const selectorMap = '.bordeBlanco > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > p:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > p:nth-child(2)'

  try {
    const decoder = new TextDecoder("iso-8859-1");    
    const res = await fetch( 'http://www.insmet.cu/asp/genesis.asp?TB0=PLANTILLAS&TB1=PTM&TB2=/Pronostico/Ptm.txt' )
    let html = await res.arrayBuffer()
    // console.log(html)
    const $ = cheerio.load( decoder.decode(html) );
    const $table = $('.contenidoPagina[valign="top"]')
    const data = {
      // html: $table.html().trim(),
      title: $table.find('b').first().html(),
      content: $table.find('p[align="justify"]').html(),
      author: $table.find('[id^="name"] ').text(),
      // avatar: `http://www.insmet.cu` + $table.find('#autor1').attr('src').replace(/^\.\./,''),
      map: $(selectorMap).html().trim(),
      tmax: $('#tmax').text().replace(/\D/g,''),
      tmin: $('#tmin').text().replace(/\D/g,''),
      state: $('#estado').text(),
      icon: `http://www.insmet.cu` + $('table[summary] #icono').attr('src').replace(/^\.\./,''),
    }
    console.log(data)
    return {
      body: {...data},
    }
    
  } catch (err) {
    console.log(err)
    return { status: 500, body: err }
  }
}
