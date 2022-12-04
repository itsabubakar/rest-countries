import { Link } from "react-router-dom"

const CountryInfo = ({ countryDetails }) => {
    const { name, capital, flags, population, region } = countryDetails
    return (
        <div className="bg-white border shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded dark:bg-primary">
            <Link to={`country/${name.common}`}>
                <div>
                    <div><img className="rounded h-40 w-full" src={flags.png} alt="country flag" /></div>
                    <div className="pt-2 pb-4 px-4 mt-4">
                        <h2 className="text-lg font-bold mb-2">{name.common}</h2>
                        <p className="font-semibold">Population: <span className="font-normal text-gray-700 dark:text-blue-400">{population}</span> </p>
                        <p className="font-semibold">Region: <span className="font-normal dark:text-white text-gray-700">{region}</span> </p>
                        <p className="font-semibold">Capital: <span className="font-normal dark:text-white text-gray-700">{capital[0]}</span> </p>
                    </div>
                </div></Link>

        </div>
    )
}
export default CountryInfo