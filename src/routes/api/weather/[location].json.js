const key = import.meta.env.VITE_OPENWEATHER_KEY
export async function get({params}) {

  const location = params.location

  try {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&lang=es&units=metric`
    const res = await fetch(url)
    const data = await res.json()

    return {
      headers: {

      },
      body: {...data, location},
    }
    
  } catch (err) {
    return { status: 500, body: err.toString() }
  }
}

