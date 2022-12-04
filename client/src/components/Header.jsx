import { Link } from "react-router-dom"
import Toggle from "./Toggle"

const Header = () => {
    return (
        <header className="px-5 md:px-0 flex justify-center pt-3 shadow-md pb-3 dark:bg-primary dark:text-white">
            <div className="max-w-5xl flex justify-between w-full">
                <Link to="/"><h2 className="text-xl font-semibold">Where in the world?</h2></Link>

                <div className="flex gap-2 items-center">
                    <Toggle />
                    <p>Switch Mode</p>
                </div>
            </div>
        </header>
    )
}
export default Header