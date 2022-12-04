import { useEffect, useRef, useState } from "react"
import Filter from "./Filter"
import Header from "./Header"
import axios from "axios"
import { Link } from "react-router-dom"

const HomePage = () => {
    const [countries, setCountries] = useState()
    const [loading, setLoading] = useState(false)
    const [searchBox, setSearchBox] = useState('')
    const [page, setPage] = useState(1)
    const [value, setValue] = useState(false)

    const [prev, setPrev] = useState(false)
    const [next, setNext] = useState(false)

    const oldRef = useRef(null)



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
        const country = await axios.get(`http://localhost:5000/api?page=${page}`).then((response) => {
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
        const country = await axios(`http://localhost:5000/api/countries?name=${searchBox}`).then((response) => {
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
            getCountries(`http://localhost:5000/api/continent?page=${page}&region=${value}`)
            oldRef.current = value.toString()
        } else {
            getCountries()
        }
    }, [page, value])


    return (
        <div className="">
            <Header />
            <main className="flex justify-center dark:bg-secondary px-5 md:px-0 min-h-screen dark:text-white">
                {loading && <div className="grid min-h-screen place-content-center">

                    <div className="flex items-center gap-2 text-gray-500">
                        <span className="h-10 w-10 block rounded-full border-4 border-t-blue-300 animate-spin"></span>
                    </div>
                </div>
                }
                {!loading && (
                    <div className="max-w-3xl w-full">
                        {/* Form and filter */}
                        <Filter
                            handleSubmit={handleSubmit}
                            searchValue={searchBox}
                            onChange={handleSearchBox}
                            optionsValue={value}
                            handleChange={handleChange}
                            oldRef={oldRef.current}
                        />

                        {/* Countries */}
                        <div>
                            {Array.isArray(countries) && countries?.map((country) => (
                                <Link to={`country/${country.name.common}`}><p className="text-lg">{country.name.common}</p></Link>
                            ))}
                            {!Array.isArray(countries) && <p>country {searchBox} not found</p>}
                        </div>
                    </div>
                )}
            </main>

        </div>
    )
}
export default HomePage