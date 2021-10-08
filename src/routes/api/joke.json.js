import cheerio from 'cheerio'
import '$lib/random'
import urls from './_urls_jokes.js'

export async function get() {
  try {

    let data = [], response, body, $, menu;
    const url = urls.random()
    response = await fetch( url );
    body = await response.text();
    $ = cheerio.load( body );

    if ( /yavendras/g.test(url) ) {
      // seleccionar una de las paginas
      let pageTo = $( $('.pagination a').toArray().random() ).attr('href')
      response = await fetch( `https:${pageTo}` );
      body = await response.text();
      $ = cheerio.load( body );

      let joke = $('.search-result-item-body .row.fila').toArray().random()
      $joke = $(joke)

      data = {
        title: $joke.find('h4').text().trim(),
        url: 'http:' + $joke.find('.search-result-item-heading a').attr('href'),
        content: $joke.find('.description').html().trim(),
      }
    }

    if ( /1000chistes/g.test(url) ) {

      const pageUrl = $( $('#nav-links > a').toArray().random() ).attr('href')
      const response1000chistes = await fetch(`https://www.1000chistes.com${pageUrl}`)
      const body1000chistes = await response1000chistes.text()
      $ = cheerio.load( body1000chistes );

      $joke = $( $('.chiste').toArray().random() )
      data = {
        title: $joke.find('h2').text().trim(),
        url: $joke.find('h2 > a').attr('href'),
        content: $joke.find('[itemprop="articleBody"]').html(),
      }

    }

    if ( /todo-chistes/g.test(url) ) {
      console.log($('article.node h2'))
      data = {
        title: $('article.node h2').first().text().trim(),
        url: 'http://www.todo-chistes.com' + $('article.node h2 a').attr('href'),
        content: $('article.node .field-chistes,article.node .field-chiste').html().trim()
      }
    }

    if ( /loschistes/g.test(url) ) {
      data = {
        url: `http://www.todo-chistes.com/${ $('article header h2 a').attr('href') }`,
        content: $('article .field-chistes').html().trim(),
      }
    }

    return {
      body: {...data},
    }
    
  } catch (err) {
    return { status: 500, body: err.toString() }
  }
}
