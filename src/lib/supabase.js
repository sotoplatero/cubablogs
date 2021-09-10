import { createClient } from '@supabase/supabase-js'
import {notify} from '$lib/bot'
import lodash from 'lodash';

const { isEmpty, has } = lodash;
const supabaseUrl = 'https://bzrhnhkwybsruominalg.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const createBlogSubscription  = supabase
  .from('blogs')
  .on('INSERT', ({ new: blog }) => {
    notify(`✨ Nuevo Blog\n\n [${blog.title}](${blog.url})`)
  })
  .subscribe()

const updateBlogSubscription = supabase
  .from('blogs')
  .on('UPDATE', payload => {

    const { new: newRecord, old: oldRecord } = payload

    if (
      !isEmpty(newRecord.post) &&
      has(newRecord, 'post.url') &&
      newRecord.post.url != oldRecord.post.url
    ) {
      const {title,url} = newRecord.post
      notify(`✨ Nuevo Artículo\n\n [${title}](${url})`,'admin')
    }
    
  })
  .subscribe()

export default supabase

