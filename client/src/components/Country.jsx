import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from './Header'

const Country = ({ match }) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [countryInfo, setCountryInfo] = useState('')

    // function to fetch the data
    const getCountries = async () => {
        try {
            const country = await axios.get(`http://localhost:5000/api/countries?name=${id}`).then((response) => {
                setCountryInfo(response.data[0])
                console.log(countryInfo?.name.common);
                // setLoading(false)
            })
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        // setLoading(true)
        getCountries()
    }, [])
    return (
        <div>
            <Header />
            <div className='flex justify-center dark:bg-secondary bg-white min-h-screen'>
                <div className='max-w-5xl'>
                    <button className='px-2 py-1 rounded text-white dark:bg-secondary' onClick={() => navigate(-1)}>Back</button>
                    <div>
                        {!countryInfo && <div>Loading</div>}
                        {countryInfo && <div>
                            <p>{countryInfo.name.common}</p></div>}
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Country