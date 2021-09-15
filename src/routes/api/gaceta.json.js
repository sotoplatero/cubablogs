import cheerio from 'cheerio'

export async function get() {
  try {
    let url = 'https://www.gacetaoficial.gob.cu'
    let response, body, $

    response = await fetch( url );
    body = await response.text();
    $ = cheerio.load( body );

    let date = $('[property="dc:date"]').attr('content')

    // if ( moment(date).isSame( moment(), 'day' ) ) {
    // let urlGaceta = url + $('.views-field-view-node a').attr('href')
      let data = {
        url: url + $('.views-field-view-node a').attr('href'),
        file: $('.views-field-field-fichero-gaceta a').attr('href'),
        type: $('.views-field-field-tipo-edicion-gaceta .field-content').first().text(),
        number: $('.views-field-field-numero-de-gaceta .field-content').first().text(),
        date: new Date($('.views-field-field-fecha-gaceta .date-display-single').first().text()),
      }


    response = await fetch( data.url );
    body = await response.text();
    $ = cheerio.load( body );

    data.items = $('.node-norma-juridica').map((i,el)=>({
      title: $('.title',el).text(),
      content: $('.field-type-text-with-summary p',el).text(),
    })).get()

    return {
      body: {...data},
    }
    
  } catch (err) {
    return { status: 500, body: err.toString() }
  }
}
