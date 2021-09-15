import Parser from 'rss-parser';
import cheerio from 'cheerio';
import supabase from '$lib/supabase'
let parser = new Parser({
  customFields: {
    item: [
        ['content:encoded'],
        ['media:content', 'media:content',{keepArray: true}],
        ['dc:creator']
    ]
  }
});
import '$lib/random'

export async function get() {
  try {
    const { data: blogs, error } = await supabase.from('blogs').select('rss')
    if (error) return { status: 500, body: error }

    const rss = blogs.random().rss
    const feed = await parser.parseURL( rss )
    const item = feed.items.splice(1).random()
      const $ = cheerio.load( item['content:encoded'] + item['content'] )
      item['image'] =  $('img')?.attr('src')

    return {
      body: { ...item },
    }
    
  } catch (err) {
    return { status: 500, body: err.toString() }
  }
}
