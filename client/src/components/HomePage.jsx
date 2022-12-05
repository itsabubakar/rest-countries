import { useEffect, useRef, useState } from "react"
import Header from "./Header"
import axios from "axios"
import CountryInfo from "./CountryInfo"
import Loading from "./Loading"

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


    // // search by country

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const country = await axios(`/api/countries?name=${searchBox}`).then((response) => {
            try {
                setCountries(response.data)
                setLoading(false)
                setPage(false)
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
            getCountries(`/api/continent?page=${page}&region=${value}`)
            oldRef.current = value.toString()
        } else {
            getCountries()
        }
    }, [page, value])


    return (
        <div className="">
            <Header />
            <main className="flex justify-center dark:bg-secondary pb-10 px-5 md:px-0 min-h-screen dark:text-white">
                {loading && <Loading />}
                {!loading && (
                    <div className="max-w-5xl w-full">
                        {/* Form and filter */}
                        <div className="flex flex-col sm:flex-row gap-y-5 justify-between my-10">
                            <form onSubmit={handleSubmit}>
                                <input type="text" className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded py-2 px-4 text-sm dark:bg-primary dark:text-white outline-none" value={searchBox} onChange={handleSearchBox} placeholder="Search for a country" />
                            </form>
                            <label className="flex flex-col gap-1">
                                <span className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] px-4 py-2 rounded dark:text-white dark:bg-primary text-base">Filter by region</span>
                                <select className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-white px-2 py-2 rounded capitalize dark:bg-primary dark:text-white text-base" value={value} onChange={handleChange}>
                                    <option>{oldRef.current == null ? "All" : oldRef.current}</option>
                                    <option value="africa">Africa</option>
                                    <option value="asia">Asia</option>
                                    <option value="america">America</option>
                                </select>
                            </label>
                        </div>

                        {/* Countries */}
                        <div>
                            <div className="grid gap-y-14 px-5 sm:grid-cols-2 sm:gap-x-10 md:grid-cols-3 lg:grid-cols-4">
                                {Array.isArray(countries) && countries?.map((country) => (
                                    <CountryInfo
                                        key={country.area}
                                        countryDetails={country}
                                    />
                                ))}
                            </div>

                            {/* buttons */}
                            <div className="w-full flex gap-5 justify-center items-center mt-5">
                                <button disabled={prev} className={`${prev ? 'nav-btn-disabled' : 'nav-btn'}`} onClick={() => setPage(page - 1)}>prev</button>
                                <p className="">Page: {page}</p>
                                <button disabled={next} className={`${next ? 'nav-btn-disabled' : 'nav-btn'}`} onClick={() => setPage(page + 1)}>next</button>
                            </div>
                        </div>

                        {!Array.isArray(countries) && <p className="text-center text-2xl">Error. Please refresh or try again later</p>}
                    </div>
                )}
            </main>

        </div>
    )
}
export default HomePage