const Filter = ({ handleSubmit, searchBox, handleSearchBox, value, handleChange, oldRef }) => {

    return (
        <div className="flex justify-between my-10">
            <form onSubmit={handleSubmit}>
                <input type="text" className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded py-2 px-4 text-sm dark:bg-primary dark:text-white outline-none" value={searchBox} onChange={handleSearchBox} placeholder="Search for a country" />
            </form>
            <label className="flex flex-col gap-1">
                <span className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] px-4 py-2 rounded dark:text-white dark:bg-primary text-base">Filter by region</span>
                <select className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-white px-2 py-2 rounded capitalize dark:bg-primary dark:text-white text-base" value={value} onChange={handleChange}>

                    <option>{oldRef ? oldRef : 'All'}</option>
                    <option value="africa">Africa</option>
                    <option value="asia">Asia</option>
                    <option value="america">America</option>
                </select>
            </label>
        </div>
    )
}
export default Filter