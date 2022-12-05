import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from './Header'
import Loading from './Loading'

const Country = ({ match }) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [countryInfo, setCountryInfo] = useState('')

    // function to fetch the data
    const getCountries = async () => {
        try {
            const country = await axios.get(`/api/countries?name=${id}`).then((response) => {
                setCountryInfo(response.data[0])
            })
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getCountries()
    }, [])
    return (
        <div>
            <Header />
            <div className='flex justify-center dark:bg-secondary min-h-screen'>
                <div className='max-w-5xl'>
                    {/* Loading */}
                    {!countryInfo && <Loading />}

                    {/* Country Info */}
                    {countryInfo && <div className=' mt-10 md:min-w-[800px] mx-5 mb-10 md:mx-0'>
                        <button className='mb-10 px-3 py-2 rounded border shadow text-black bg dark:bg-primary dark:text-white' onClick={() => navigate(-1)}>Back</button>
                        <div className='dark:text-white flex flex-col gap-y-5 md:flex-row gap-x-14'>
                            <div className=''>
                                <img className="rounded h-[200px] w-full" src={countryInfo.flags.svg} alt="country flag" srcSet="" />
                            </div>
                            <div className='border px-5 py-5 rounded-md'>
                                <h2 className='text-lg font-bold mb-5'>{countryInfo.name.common}</h2>
                                <div className='flex gap-x-12'>
                                    <div>
                                        <p className='mb-2 font-semibold'>Region: <span className='font-normal'>{countryInfo.region}</span></p>
                                        <p className='mb-2 font-semibold'>Capital: <span className='font-normal'>{countryInfo.capital[0]}</span></p>
                                        <p className='font-semibold'>Population: <span className='font-normal'>{countryInfo.population}</span></p>
                                    </div>
                                    <div>
                                        {
                                            Object.values(countryInfo.currencies).map((value) => <p className='mb-2 font-bold'>Currency: <span className='font-normal'>{value.name}</span></p>)
                                        }
                                        <p className='mb-2 font-bold'>Top level domain: <span className='font-normal'>{countryInfo.tld[0]}</span></p>
                                        {
                                            Object.values(countryInfo.languages).map((value) => <p className='font-bold'>Languages: <span className='font-normal'>{value}</span></p>)
                                        }
                                        {console.log(countryInfo)}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>}

                </div>

            </div>
        </div>
    )
}
export default Country