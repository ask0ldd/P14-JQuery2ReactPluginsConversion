/* eslint-disable @typescript-eslint/no-explicit-any */
import '../../style/table/SearchModule.css'
import { DatasTableContext } from "./DatasTable"
import { useContext } from "react"

/*interface IProps{
    setSearchString: any
}*/

function SearchModule() {

    const { setSearchString } = useContext(DatasTableContext)

    /* oninput should bring the user back to page 1 */

    return (
        <div id="searchContainer">
        <label htmlFor='search'>Search:</label>
        <input contentEditable id='search' type="text" onInput={(e)=> setSearchString && setSearchString(e.currentTarget.value)}/>
        </div>
    )
    
}

export default SearchModule