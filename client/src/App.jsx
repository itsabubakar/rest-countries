import { useEffect, useState } from "react"
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState()
  const [page, setPage] = useState(1)

  const getCountries = async () => {
    const country = await axios(`http://localhost:8080/?page=${page}`)
    setCountries(country.data.resultInfo)
  }

  useEffect(() => {
    getCountries()
    console.log('foo')
  }, [page])


  return (
    <div className="text-3xl text-amber-500">
      <h2>First 8 countries</h2>
      <div>
        {countries?.map((country) => (
          <p>{country.name.common}</p>
        ))}

        <p className="mt-4">page: {page}</p>
        <button className="text-blue-400 border ml-4 mt-4" onClick={() => setPage(page + 1)}>next</button>
      </div>
    </div>
  )
}
export default App