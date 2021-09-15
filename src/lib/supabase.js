import { dev } from '$app/env';
import { createClient } from '@supabase/supabase-js'
import { notify } from '$lib/bot'
import lodash from 'lodash';

const { isEmpty, has } = lodash;
const supabaseUrl = 'https://bzrhnhkwybsruominalg.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
const channel = dev ? 'admin' : 'public'

const createBlogSubscription  = supabase
  .from('blogs')
  .on('INSERT', ({ new: blog }) => {
    notify(`✨ Nuevo Blog\n\n [${blog.title}](${blog.url})`,channel)
  })
  .subscribe()

const updateBlogSubscription = supabase
  .from('blogs')
  .on('UPDATE', ({ new: newRecord, old: oldRecord }) => {

    if (
      !isEmpty(newRecord.post) &&
      has(newRecord, 'post.url') &&
      newRecord.post.url != oldRecord.post.url
    ) {

      const {title,url} = newRecord.post
      const link = `https://cubablog.net/post/${newRecord.id}/${url.replace(/https?:\/\//,'')}`
      sleep(1000)
      notify(`✨ Nuevo Artículo\n\n [${title}](${link}) publicado en **${newRecord.title}**`, channel)

    }
    
  })
  .subscribe()

export default supabase

