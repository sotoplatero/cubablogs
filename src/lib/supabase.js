import { createClient } from '@supabase/supabase-js'
import {notify} from '$lib/bot'

const supabaseUrl = 'https://bzrhnhkwybsruominalg.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

supabase
  .from('blogs')
  .on('INSERT', ({ new: blog }) => {
    notify(`✨ Nuevo Blog\n\n [${blog.title}](${blog.url})`)
  })
  .subscribe()

export default supabase

