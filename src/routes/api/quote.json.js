import cheerio from 'cheerio'

export async function get() {
  try {
    let response, body, $
    let random

    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    const randomLetter = Math.floor(Math.random() * letters.length)
    response = await fetch( `https://proverbia.net/autor/index/${letters[randomLetter]}` );
    body = await response.text();
    $ = cheerio.load( body );

    const authors = $('.list-group-item a').map( (i,el) => $(el).attr('href') ).get()
    const randomAuthors = Math.floor(Math.random() * authors.length)
    const urlAuthor = `https://proverbia.net${authors[randomAuthors]}`

    response = await fetch( urlAuthor );
    body = await response.text();
    $ = cheerio.load( body );

    const blockquotes = $('blockquote p').map( (i,el) => $(el).text() ).get()
    const randomBlockquote = Math.floor(Math.random() * blockquotes.length)

    const data = {
      content: blockquotes[randomBlockquote],
      author: $('h1').text(),
      about: $('.bio').text(),
      url: urlAuthor,
    }

    return {
      body: {...data},
    }
    
  } catch (err) {
    return { status: 500, body: err.toString() }
  }
}

