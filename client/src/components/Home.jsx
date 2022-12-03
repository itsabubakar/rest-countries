import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {

    const [countries, setCountries] = useState()
    const [loading, setLoading] = useState(false)
    const [searchBox, setSearchBox] = useState('')
    const [page, setPage] = useState(1)
    const [value, setValue] = useState(false)

    const [prev, setPrev] = useState(false)
    const [next, setNext] = useState(false)


    // function to fetch the data
    const getCountries = async (url) => {
        if (url) {
            const country = await axios.get(url).then((response) => {
                setCountries(response.data.resultInfo)
                setLoading(false)

                // checking if next page is available
                if (!response.data.next) {
                    setNext(true)
                } else {
                    console.log('next page available')
                    setNext(false)
                }

                // checking if previous page is available
                if (!response.data.prev) {
                    // console.log('no prev page')
                    setPrev(true)
                } else {
                    // console.log('prev page available');
                    setPrev(false)
                }

            })
            return country
        }

        // default one that runs if no url is passed
        const country = await axios.get(`/?page=${page}`).then((response) => {
            setCountries(response.data.resultInfo)
            setLoading(false)
            console.log(response)

            // checking if next page is available
            if (!response.data.next) {
                setNext(true)
            } else {
                console.log('next page available')
                setNext(false)
            }

            // checking if previous page is available
            if (!response.data.prev) {
                // console.log('no prev page')
                setPrev(true)
            } else {
                // console.log('prev page available');
                setPrev(false)
            }

        }).catch((error) => {
            console.log(error)
        })

        return country
    }

    const handleChange = async (e) => {
        setValue(e.target.value)
    }

    const handleSearchBox = (e) => {
        setSearchBox(e.target.value)
    }


    // search by country

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const country = await axios(`/countries?name=${searchBox}`).then((response) => {
            try {
                setCountries(response.data)
                setLoading(false)
                console.log(response);
            } catch (error) {
                // setCountries([{name:{common: "Not found"}])}
                console.log(error)
            }
        })

    }


    // use effect for all countries
    useEffect(() => {
        setLoading(true)
        if (value) {
            getCountries(`/continent?page=${page}&region=${value}`)
        } else {
            getCountries()
        }
    }, [page, value])


    return (
        <div className="flex justify-center h-screen">
            <div className="max-w-xl my-20 ">
                <div className="border-2 p-10 shadow">
                    {loading && 'fetching'}
                    {!loading && 'done fetching'}
                    <div className="flex justify-between">
                        <h2 className="text-3xl ">Countries</h2>
                        <div>
                            <label>
                                Filter by region
                                <select value={value} onChange={handleChange}>
                                    <option>all</option>
                                    <option value="africa">Africa</option>
                                    <option value="asia">Asia</option>
                                    <option value="america">America</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" className="border-2" value={searchBox} onChange={handleSearchBox} />
                        <button type="submit">submit</button>
                    </form>
                    <p>The region is set to {value}</p>
                    <div className="grid grid-cols-4 gap-x-4 gap-y-8 mt-10">
                        {Array.isArray(countries) && countries?.map((country) => (
                            <Link to={`country/${country.name.common}`}><p className="text-lg">{country.name.common}</p></Link>
                        ))}
                        {!Array.isArray(countries) && <p>country {searchBox} not found</p>}
                    </div>
                    <div className="flex gap-5 justify-center">
                        <button disabled={prev} className={`${prev ? 'bg-black' : ''} text-blue-400 border ml-4 mt-4`} onClick={() => setPage(page - 1)}>prev</button>
                        <p className="mt-4">page: {page}</p>
                        <button disabled={next} className={`${next ? 'bg-black' : ''} text-blue-400 border ml-4 mt-4`} onClick={() => setPage(page + 1)}>next</button>
                    </div>

                </div>

            </div>


        </div>
    )
}
export default Home