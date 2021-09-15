import cheerio from 'cheerio'
import '$lib/random'

export async function get() {
  try {

    let urls = [
      'https://chistes.yavendras.com',
      // 'http://www.todo-chistes.com/chistes-al-azar',
      'https://www.1000chistes.com/',
    ] 
    let data = [], response, body, $, menu;
    let url = urls.random() 
    response = await fetch( url );
    body = await response.text();
    $ = cheerio.load( body );

    if ( /yavendras/g.test(url) ) {
      // abrir un menu aleatorio
      let randomMenu = $('#HUMOR .submenu a[href$=".php"]').map((i,a)=>$(a).attr('href')).get().random();
      response = await fetch( 'https:'+randomMenu );
      body = await response.text();
      $ = cheerio.load( body );

      // seleccionar una de las paginas
      let pages = ( $('.pagination').first().find('li').length - 4)
      if ( pages > 1 )  {
        let randomPage = Math.floor( (Math.random() * pages) + 1 )
        response = await fetch( `https:${randomMenu}?pagina_actual=${randomPage}` );
        body = await response.text();
        $ = cheerio.load( body );
      }

      let jokes = $('.search-result-item-body .row.fila')
      let indexJoke = Math.floor(Math.random() * jokes.length)
      $joke = $(jokes[ indexJoke ])

      data = {
        url: 'http:' + $joke.find('.search-result-item-heading a').attr('href'),
        content: $joke.find('.description').html().trim(),
      }
    }

    if ( /1000chistes/g.test(url) ) {

      const categoryUrl = $( $('[itemprop="itemListElement"] > a').toArray().random() ).attr('href')
      const response1000chistes = await fetch(categoryUrl)
      const body1000chistes = await response1000chistes.text()
      $ = cheerio.load( body1000chistes );

      $joke = $( $('.chiste').toArray().random() )
      data = {
        url: $joke.find('h2 > a').attr('href'),
        content: $joke.find('[itemprop="articleBody"]').html(),
      }
      // 'itemprop="articleBody"'
    }

    if ( /todo-chistes/g.test(url) ) {
      data = {
        url: ' http://www.todo-chistes.com/' + $('.view-content article header h2 a').attr('href'),
        content: $('.field-chistes')
          .map( (i,el) => $(el)?.html() )
          .get().trim(),
      }
    }

    if ( /loschistes/g.test(url) ) {
      data = {
        url: ' http://www.todo-chistes.com/' + $('article header h2 a').attr('href'),
        content: $('.field-chistes').html().trim(),
      }
    }

    return {
      body: {...data},
    }
    
  } catch (err) {
    return { status: 500, body: err.toString() }
  }
}
